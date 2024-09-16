---
title: 'Adding Login to Your Project with OAuth'
date: '2023-10-14'
tags: ['oauth', 'login', 'token']
image: '/images/oauth1.png'
summary: 'I've made note of my frontend concerns while working with Oauth along the backend.'
published: true
---

## Why was Oauth Introduced?

### Why Oauth?

During the service development phase, an issue arose where a login was needed. This was because the user's playlists had to be saved and duplicate registrations had to be blocked. There are multiple login policy methods. You can create your own authentication process, or you can use a method that authenticates via platforms like Google and Kakao. Based on our technical level, we decided that we could not ensure complete security on our own. Users often use the same ID and password. **Therefore, if user information is hacked from our service, there is a high chance that it can be hacked on other sites as well.** Based on our current team expertise, we decided that it would be better to delegate to a large platform through Oauth rather than trying to ensure thorough security on our own.

### Oauth

Oauth is a protocol that delegates a user's access rights to a third party.

![Oauth1](/images/oauth1.webp)

The flow of Oauth is as follows. In the image above, Client refers to the backend, and the Authorization Server is Google's or Kakao's authentication server. The Client (backend) sends an authentication request and, if valid, receives an Access Token and a Refresh Token. Then, when a request is made to the Resource Server requiring authentication, it can confirm that the Access Token is valid, and an expiration response may be returned. If an expiration response is submitted, the Refresh Token can be sent to Authorization to receive a new, updated Access Token.

### Login Process

The Oauth flow above is the flow between the server (authentication client) and the authentication server. Now, let's confirm the flow between the Client and Server of our service.

![Oauth2](/images/oauth2.webp)

1. The Client redirects to the Oauth authentication page provided by Kakao or Google.
2. Once the user logs in to the corresponding page, the URL containing the authentication code will be sent to the specified redirect page.
3. The Client receives the authentication code and sends a request to the server.
4. The server sends the authentication code to Kakao or Google.
5. Kakao or Google verifies the authentication code and, if valid, sends the access token.
6. The server checks the access token and then generates its own access token. **The point to note here is that the former access token is a token containing authentication information for Kakao or Google, while the latter is a token containing authentication information for the server. The server then sends the access token to the Client in a response.**

## Refresh Token

### Why a Refresh Token is necessary

The reason a refresh token is needed is somewhat complex. First, you need to think about the problems that occur when authentication processing is done only with an access token. If you set the expiration period of the access token to be short, it will be beneficial for security, but you will need to request frequent logins from the user. In the process, the user experience cannot but be lowered. On the other hand, if you set the expiration period of the access token to be long, there will be a major security issue.

A refresh token is a device that can improve these problems. You can issue a new access token without requiring an unnecessary login process while keeping the expiration period of the access token short for security reasons. **That's because a token reissue request is sent every time the access token expires.**

### Security Handling

**So what happens if a refresh token is hijacked?** According to the Oauth protocol, an access token is issued only with a refresh token. If this method is directly introduced to the project, there is a security issue. The server does not store access tokens for each member. Therefore, if a refresh token is hijacked, an access token can be issued indefinitely.

Therefore, our decision was to send the access token and refresh token together when updating the access token. The server maps the most recently issued access token for each refresh token. The server verifies that the mapping is correct when the Client sends the access token and refresh token together.

You may wonder. It may not seem much different from authenticating with just a refresh token. That's because if an access token was hijacked by a hacker, there is a high chance that the refresh token was hijacked as well. (In the shook service, access tokens are stored in local storage, and refresh tokens are stored in cookies given the httpOnly and secure attributes.)

However, there is a benefit to authenticating with both an access token and a refresh token. Firstly, numerous hackers cannot use it at the same time. That is because the refresh token is mapped only to the most recently issued access token. Secondly, when an inappropriate token is requested that is not the mapped access token, the corresponding refresh token can be invalidated. This prevents the token reissue itself that was requested with the corresponding refresh token. Therefore, even if a hacker has hijacked a refresh token, the token can only be used until the original user's reissue request expires.

Additionally, even if you process authentication information with the token method attentively, it is not safer than managing it with a session. The current project server does not store the user's personal information separately and does not handle sensitive information. I think it can be seen as having considered security to the maximum extent in the process where the security can be unstable.

## Frontend Concerns

### Access Token Storage Location

The overall Oauth flow and framework have already been set to some extent. Then it is time to decide how Oauth should be handled from the Client's perspective. (This was already teased before,) where should the access token be stored on the Client?

There are a total of four options to consider: in-memory, cookie, sessionStorage, localStorage.

- In-memory: This method is very secure from hijacking. However, if a user who is already logged in refreshes, the access token disappears. The refresh request has to be sent every time. If there are many query requests per page, the additional request could be burdensome. Also, since the team's decision is that access tokens cannot be updated with only the refresh token, it is not an appropriate method.
- SessionStorage: This is a downward compatible version of in-memory. It has the same problem as in-memory (as mentioned above) and is also vulnerable to hijacking.
- Cookie: If the httponly property is used, the cookie cannot be accessed with JavaScript. Since the access token contains nickname information that is necessary for rendering as a jwt, it was deemed inappropriate.
- LocalStorage: This can be accessed with JavaScript at any time. However, it has the disadvantage of being vulnerable to XSS attacks because it can be accessed with JavaScript.

Excluding in-memory and sessionStorage, I did not feel a significant difference in terms of security between cookies and local storage. Since cookies are added to every request, **I chose local storage**.

### Refresh Token Storage Location

The refresh token must be managed with more security so that it is not hijacked. Therefore, **it is managed as a cookie with added httponly and secure properties**. However, cookies have the issue of being added to every request. Therefore, the cookie was set to be saved only in a domain subpath. **In other words, it was set so that the cookie would be stored only when a request was made to the corresponding endpoint.**

### Access Token Expiration Confirmation

Usually, the server parses the access token to check if it has expired. However, since it is implemented as a jwt, the frontend can check the token and validate the expiration. The access token itself is stored in the browser's local storage, so it is often the case that login information is managed by the client. In that respect, it was decided to validate the access token expiration on the frontend as well as the server. The advantage of validating before sending a request is that the server does not have to receive the message that the access token has expired, thereby reducing the number of requests.

However, there is a cost of parsing the jwt for each request. I don't think the cost of parsing a string is significant. Even so, it was decided to cache the access token and the parsed value in memory rather than parsing it every time.

## Frontend Oauth Application

### Cases per User

Since login was introduced, the number of user cases has increased dramatically. This is because there are several states based on the access token and refresh token that need to be considered.

| access token                                                                              | refresh token                   | result                                 |
| ----------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------- |
| valid                                                                                     | -                               | current request/authentication success |
| expiration period not X but, if member information is incorrect (due to withdrawal, etc.) | valid                           | current request/401                    |
| expiration period                                                                         | valid                           | update request/authentication success  |
| expiration period                                                                         | expiration period and not valid | update request/401                     |

If this is drawn as a diagram, it is as follows.
![Oauth3](/images/oauth3.webp)
