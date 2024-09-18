---
title: 'Adding a Login Feature to Your Project with OAuth'
date: '2023-10-14'
tags: ['oauth', 'login', 'tokens']
image: '/images/oauth1.webp'
summary: 'In this article, we discuss the challenges we faced as frontend developers while integrating OAuth with our backend to enable user login.'
published: true
---

## Why OAuth?

### Why OAuth?

While developing our service, we realized the need for a login system to save user playlists and prevent duplicate registrations. When it comes to login policies, there are multiple approaches. We could create our own authentication process or authenticate users through platforms like Google or Kakao. However, given our technical capabilities, we were concerned about maintaining robust security measures on our own. Users often reuse the same login credentials, so **if user data were to be compromised through our service, it could potentially be compromised on other sites as well.** We decided that it would be more prudent to delegate this responsibility to established platforms through OAuth.

### OAuth

OAuth is a protocol that allows users to grant third-party applications access to their data.

![Oauth1](/images/oauth1.webp)

The OAuth flow is as follows: In the diagram above, the Client refers to the backend, and the Authorization Server represents an authentication provider like Google or Kakao. The Client (backend) sends an authentication request to the Authorization Server. If valid, the Client receives an Access Token and a Refresh Token. When authentication is required, the Client can make a request to the Resource Server to verify if the Access Token is valid or has expired. If an expiration response is received, the Client can send the Refresh Token to the Authorization Server to obtain a new, renewed Access Token.

### Login Process

The OAuth flow described above is for communication between the server (authentication client) and the authorization server. Here, we examine the client-server flow within our service:

![Oauth2](/images/oauth2.webp)

1. The client redirects users to the OAuth authentication page provided by Kakao or Google.
2. If the user logs in on that page, the server is sent a URL containing the authentication code to the specified redirect page.
3. The client receives the authentication code and sends a request to the server.
4. The server sends the authentication code to Kakao or Google.
5. Kakao or Google verifies the authentication code. If valid, they send an access token.
6. After verifying the access token, the server generates its own access token. **It is important to note that the former access token contains authentication information for Kakao or Google, while the latter contains authentication information for the server. The server then responds to the client with the access token.**

## Refresh Tokens

### Why Refresh Tokens Are Needed

The need for refresh tokens is somewhat complex. First, consider the problems that arise when handling authentication with only an access token. Setting a short expiration time for the access token enhances security but requires frequent login prompts for the user. This can lead to a diminished user experience. Conversely, setting a long expiration time for the access token poses significant security risks.

Refresh tokens provide a solution to this problem. They allow us to maintain a short expiration time for the access token for security reasons while still avoiding inconvenience for the user. **Whenever the access token expires, a request can be sent to reissue the token without the need for a separate login process.**

### Security Considerations

**But what if a refresh token is compromised?** According to the OAuth protocol, an access token can be issued with just a refresh token. If we were to implement this approach directly in our project, it would raise security concerns. Our server does not store access tokens for each user. Therefore, if a refresh token is compromised, an access token could be issued indefinitely.

To address this issue, we decided to send the access token and the refresh token together when renewing the access token. The server maps the access token to each refresh token. When the client sends the access token and the refresh token together, the server checks if the mapping is correct.

One might wonder if this approach differs significantly from authenticating with just a refresh token. After all, if an attacker has compromised the refresh token, they likely have also compromised the access token. (The shook service stores the access token in local storage and the refresh token in a cookie with the `httpOnly` and `secure` attributes.)

However, authenticating with both the access token and the refresh token does provide one advantage. Firstly, it prevents multiple attackers from exploiting the token simultaneously. This is because the refresh token is mapped only to the most recently issued access token. Secondly, if a request is made with an inappropriate token that is not mapped to the access token, the corresponding refresh token can be invalidated. This prevents the attacker from requesting reissuance with the same refresh token. Thus, even if an attacker compromises a refresh token, they can only use the access token until the original user requests a reissue.

Additionally, it is important to note that while we are mindful of security when handling authentication information in this manner, it is not necessarily more secure than managing it with a session. Currently, our project server does not store separate user information or handle sensitive data. Therefore, we can consider this a security-conscious approach given the limited scope of our application.

## Frontend Considerations

### Storage Location for the Access Token

The overall OAuth flow and framework are now in place. The next step is to determine how the client will handle OAuth. (As hinted earlier,) where should the access token be stored on the client-side?

We considered four options: in-memory, cookies, sessionStorage, and localStorage.

- In-memory: This method offers great protection against compromise. However, if a logged-in user refreshes the page, the access token is lost. A refresh request must be sent each time. If there are numerous query requests per page, this additional request can be a burden. Furthermore, due to a team decision, we cannot renew the access token with only a refresh token, making this method unsuitable.
- SessionStorage: This is a subset of in-memory. It exhibits the same problems as in-memory, with the added disadvantage of being vulnerable to compromise.
- Cookies: When the `httponly` attribute is used, JavaScript cannot access cookies. Since the access token is rendered in JWT format and contains nickname information required for rendering, we deemed this approach inappropriate.
- LocalStorage: This method allows access from JavaScript at any time. However, it is vulnerable to XSS attacks since it can be accessed by JavaScript.

Security-wise, we did not perceive a significant difference between cookies and local storage, excluding in-memory and sessionStorage. Since cookies are included in every request, **we opted for localStorage**.

### Storage Location for the Refresh Token

The refresh token requires even more stringent security measures to prevent compromise. Therefore, **it is managed with a cookie that has the `httponly` and `secure` attributes.** However, cookies have the issue of being included in every request. To mitigate this, we configured the cookie to be stored only in a subpath of the domain. **In other words, the cookie is set to be included only when a request is made to that specific endpoint.**

### Access Token Expiration Check

Typically, the server parses the access token to determine if it has expired. However, since our token is implemented in JWT format, we can check its validity and verify its expiration on the frontend. The access token itself is stored in the browser's local storage, effectively giving the client the responsibility of managing login information. For this reason, we decided to validate access token expiration not only on the server but also on the frontend. Verifying the token before sending a request has the advantage of reducing the number of requests by avoiding the need to receive an expiration response from the server.

However, there is a performance cost associated with parsing JWT for each request. While parsing a string is not computationally expensive, we decided to cache the parsed value and the access token in memory to improve performance.

## Frontend OAuth Implementation

### User Scenarios

After implementing the login feature, we encountered a significant increase in user scenarios. This is because there are multiple states to consider based on the presence or absence of the access token and the refresh token.

| access token | refresh token | Result                              |
| ------------ | ------------- | ----------------------------------- |
| valid        | -             | Successful request / authentication |
| Invalid      | valid         | Successful request / authentication |
| Expired      | valid         | Refresh request / authentication    |
| Expired      | Expired       | Refresh request / 401               |

This can be illustrated visually as follows:
![Oauth3](/images/oauth3.webp)

### 401 Error Handling

We also put a lot of thought into how to handle authentication errors. One option was to redirect users directly to the login page, while another was to prompt users to log in through a modal. In the shook service, the "Like" feature requires login. However, we observed that other services do not always enforce this requirement. In other words, users may click the "Like" button without realizing that login is necessary. Redirecting them to the login page without warning could be confusing. To address this, we chose to display a modal that prompts users to log in.
