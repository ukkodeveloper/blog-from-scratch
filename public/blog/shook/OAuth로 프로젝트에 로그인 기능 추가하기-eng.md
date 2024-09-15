---
title: 'Adding Login Feature to Your Project Using OAuth'
date: '2023-10-14'
tags: ['oauth', 'login', 'token']
image: '/images/oauth1.png'
summary: 'In the process of collaborating with OAuth and the backend, here are some concerns I had on the frontend.'
published: true
---

## Why OAuth Was Introduced
### Why OAuth

During the service development process, login became necessary. This is because the user's playlist needs to be saved and duplicate registrations need to be blocked. There are also various methods for the login policy. You can create your own authentication process, or you can authenticate through platforms like Google and Kakao. With our technical level, we judged that we would not be able to thoroughly protect our security. Generally, users tend to use the same ID and password. Therefore, **if user information were to be hacked from our service, there is a high possibility that it could be hacked from other sites as well.** Given the current technical level of the team, we judged that it would be better to delegate to a large platform through OAuth rather than trying to thoroughly protect the security on our own.

### OAuth

OAuth is a protocol that delegates the user's access authority to a third party.

![Oauth1](/images/oauth1.png)

The flow of OAuth is as follows. In the figure above, the client refers to the backend, and the authorization server is the authentication server of Google or Kakao. The client (backend) sends an authentication request, and if it is valid, it receives an access token and a refresh token. Then, when the resource server is requested, the access token can be checked to confirm whether it is valid, and there may also be an expiration response. If there is an expiration response, a new access token can be received by sending the refresh token to Authorization.

### Login Process

The OAuth flow described above is the flow between the server (authentication client) and the authentication server. Now, let's check the flow between the client of our service and the server:

![Oauth2](/images/oauth2.png)

1. The client redirects to the OAuth authentication page provided by Kakao or Google.
2. When the user logs in on the corresponding page, the redirect page where the authentication code is contained in the URL is sent.
3. The client receives the authentication code and sends a request to the server.
4. The server sends the authentication code to Kakao or Google.
5. After Kakao or Google confirm the authentication code, if it is valid, they send an access token.
6. The server checks the access token and then recreates its own access token. **At this time, it is important to note that the former access token is a token that contains authentication information for Kakao or Google, while the latter is a token that contains authentication information for the server. The server then sends the access token to the client in the response.**

## Refresh Token

### Why Refresh Token Is Needed

The reason why a refresh token is necessary is somewhat complicated. First, you need to think about the problem of authentication processing using only an access token. If the expiration period of the access token is set to be short, it is advantageous for security, but users need to be asked to log in frequently. In the process, the user experience is bound to decrease. On the other hand, if the expiration period of the access token is set to be long, there will be a major security issue.

The refresh token is a device that can improve these problems. It can reduce the expiration period of the access token for security reasons without causing inconvenience to the users. **This is because every time the access token expires, a token reissuance request is sent to reissue the access token without an unnecessary login process.**

### Security Processing

**What if the refresh token is hijacked?** According to the OAuth protocol, only a refresh token is provided to issue an access token. If this method is directly introduced into the project, there will be a security issue. The access token is not stored on the server for each member. Therefore, if the refresh token is hijacked, the access token can be issued indefinitely.

Therefore, our decision was that when the access token is refreshed, the access token and refresh token are sent together. The server maps the recently issued access token for each refresh token. If the client sends the access token and refresh token together, the server checks to see if the mapping is correct.

You may be wondering, but this does not seem to be much different from authenticating with only a refresh token. This is because if a hacker has hijacked a refresh token, it is likely that they have also hijacked the access token. (In the Shook service, the access token is stored in local storage, and the refresh token is stored in a cookie with 'httpOnly' and 'secure' properties.)

However, there is an advantage to authenticating with both an access token and a refresh token. First, it cannot be exploited by multiple hackers at the same time. This is because the refresh token is mapped only to the recently issued access token. Second, if a request is sent with an inappropriate token that is not the mapped access token, the corresponding refresh token can be invalidated. This is because the reissuance itself requested with the corresponding refresh token can be blocked. So now, even if a hacker has hijacked a refresh token, if the original user has made a reissuance request, the hacker can only use it until the access token expires.

In addition, although you may be careful about security when processing authentication information in this token method, it is not safer than managing it with a session. The current project server does not store the user's personal information separately and does not handle sensitive information. It seems that we have considered security as much as possible in the process where security is unstable.

## Frontend Considerations

### Where to Save the Access Token

The overall OAuth flow and framework are already somewhat set. Then, it is our turn to decide how to handle OAuth from the client's point of view. (As mentioned earlier, but...) Where should the access token be stored in the client?

There are four options for this: in-memory, cookie, session storage, and local storage.

- In-memory: This is a very secure method against hijacking. However, if a user who has already logged in refreshes the page, the access token disappears. You need to send a refresh request every time. If there are many query requests per page, it may be burdensome to send an additional request. In addition, it is not an appropriate method because, according to the decision made by the team, the access token cannot be refreshed with only a refresh token.
- Session storage: This is a lower-level compatibility layer of in-memory. It has the disadvantage that it is vulnerable to hijacking because it has the problems mentioned above in in-memory.
- Cookie: If you use the 'httponly' property, JavaScript cannot access the cookie. It was considered inappropriate because the access token is rendered in JWT and contains the nickname information required for rendering.
- Local storage: This can be accessed by JavaScript at any time. However, it has the disadvantage that it cannot be free from XSS attacks because it can be accessed by JavaScript.

Except for in-memory and session storage, I did not feel a big security difference when comparing cookies and local storage. Because cookies are added to every request, **local storage was chosen**.

### Where to Save the Refresh Token

The refresh token should be managed more securely so that it is not hijacked. Therefore, **it is managed with a cookie to which the 'httponly' and 'secure' properties have been added**. However, in the case of cookies, there is a problem in that they are added to every request. Therefore, cookies are set to be saved only on the domain subpath. **In other words, it is set so that cookies are included only when requesting to the corresponding endpoint.**

### Checking Whether the Access Token Has Expired

Normally, the server parses the access token to check whether it has expired. However, it is implemented as JWT, so the token can be checked on the frontend to verify whether it has expired. The access token itself is contained in the browser local storage, so in fact, there are many cases where login information is managed on the client. In this regard, it was decided to verify whether the access token has expired not only on the server, but also on the frontend. If you check before sending a request, the advantage is that you can reduce the number of requests because you do not have to receive a response from the server saying that the access token has expired.

However, there is a cost to parsing JWT for each request. I don't think it costs much to parse a string. Nonetheless, it was decided to cache the access token and the parsed value in memory rather than parsing it every time.

## Applying Frontend OAuth

### Cases for Each User

After login was introduced, the number of user cases greatly multiplied. This is because there are multiple states based on the access token and the refresh token and these need to be considered.

| Access Token | Refresh Token | Result |
| --- | --- | --- |
| Valid | - | This request / Authentication success |
| Expiration period X <br>but, if member information is wrong (due to withdrawal, etc.) | Valid | This request / 401 |
| Expiration period | Valid | Refresh request / Authentication success <br>This request / Authentication success |
| Expiration period | Expiration period and not valid | Refresh request / 401 |

If this is drawn in a figure, it is as