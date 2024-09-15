---
title: Retrospective on Elegant Tech Course Level 4
date: 2023-10-24
tags:
  - ElegantTechCourse
image: /images/desiner.jpeg
summary: The S-HOOK, which was created after a long period of planning, discussion, and development, has finally been created as a service down form. Until now, it was only possible to register the killing part of the song, but now there is also a main page, and a page where you can listen to songs by selecting only the killing part.
published: true
---
The S-HOOK, which was created after a long period of planning, discussion, and development, has finally been created as a service down form. Until now, it was only possible to register the killing part of the song, but now there is also a main page, and a page where you can listen to songs by selecting only the killing part.

In addition to the content about the product, I will try to organize my overall impressions.

## Interests

This sprint was filled with new things. I had trouble keeping up with the constant flow of new information, and I found myself relying more heavily on my previous knowledge to get through it. For example, I encountered an issue where accessing a different page URL in the browser in an SPA would sometimes result in the built file not being found. I initially assumed I was misusing react-router, but it turned out to be an issue with not applying webpack's public path.

I realized that there are steps I need to take to be more flexible when approaching problems. First, it is important to understand libraries in terms of their concerns rather than their roles. I think I had only been aware of the simple role of react-router in enabling client-side rendering without server requests when changing URLs. However, I feel that it is necessary to practice considering the concerns that react-router is addressing to fulfill that role.

The same is true for webpack. Webpack's role is to build files. It affects various areas to perform that role, one of which is the path. If I had been aware of this, I might have been able to realize that webpack could be the cause of the problem I was experiencing.

## State Management Libraries

This week, we held a tech talk to compare state management libraries. I presented Zustand. The role of Zustand is of course to manage the global state. If that's the case, there must be a number of APIs that fulfill that role.

However, the 'why' seemed to be more important than the 'how' (usage) of the library. This is because, in general, one library is chosen and used for global state management. To understand the 'why', one needs to focus on concerns rather than roles.

This library focuses on whether to manage the global state based on actions while avoiding Redux's complex boilerplate. It provides concise syntax, but it lacks convenient features for asynchronous processing such as suspense.

## Layers

Separating concerns usually results in layers. I often came across this concept when studying networks.

Dividing OSI into 7 layers and separating the frontend from the backend are both cases of separating concerns.

It seems that separating layers also serves the purpose of simplifying what we need to care about. In the OSI 7-layer model, IP focuses on the source and destination addresses, while TCP focuses on reliable transmission.

Similarly, TypeScript and JavaScript have separate concerns. TypeScript has a compilation step to check and transform types in order to minimize its impact on the runtime environment.

However, being layered does not mean that different layers have no influence on each other. In the case of TypeScript, using enums can result in very strange JavaScript objects. There were also times when I had to change the code design to maintain types. In this sense, I think that separating layers means doing what you need to do with minimal impact on other layers.

## Moving with Necessity

Last sprint, I reflected on why we need to introduce technologies when they are needed, and plan when they are needed. At the time, I was a bit confused and thought about what the correct answer was among the many options. As always, there was no one correct answer, and what I felt during the two weeks was that "priority" was the key.

We cannot create a service that is perfect and superior in every way. Resources are limited, and we must create the most meaningful results within those constraints. (I think this is true not only for products but also for life in general.) Naturally, this leads us to consider opportunity cost and prioritize our work.

So how do we prioritize? We need to persuade others who will be prioritizing the work that they can empathize with the need we feel. This is where the 'why' comes in.

The same is true for the introduction of technology. We might want to introduce react-query because it looks good right now. And even if there is a learning curve, we can definitely use it conveniently. However, it is also true that we do not feel the need for react-query enough. The reason for this is that we currently receive only a small amount of data from the server, and we are not considering appropriate responses in various communication situations.