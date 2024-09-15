---
title: Woowa Tech Course Level 3 Retrospective
date: 2023-08-27
tags: ['Woowa Tech Course']
image: /images/우아한테크코스%20레벨3%20회고-20240128232031777.webp
summary: Like the first, the second sprint went by in a flash. If the first sprint focused on planning, the second sprint seemed to spend more time on overall setup. Let's go over some of the big ones.
published: true
---

## Second Sprint

Like the first, the second sprint went by in a flash. If the first sprint focused on planning, the second sprint seemed to spend more time on overall setup. Let's go over some of the big ones.

### Branch Strategy

Initially, we set up our branch strategy by considering the git-flow policy. We excluded only the release branch from git-flow. The reason for this was that there was no QA dev server yet, and we judged that we did not have the capacity to spend a lot of time on QA.

However, as we listened to the git branch strategy meeting lecture and solved the assignments, we were able to see that there was a problem with that strategy. (There are pros and cons to any branch strategy.) shook's current branch strategy creates features in the feat branch and then stacks them one by one onto the develop branch. However, if there is a previous feature and we need to make a quick feature and release it before reflecting that feature, there will be a problem. This is because the feature that was made quickly has to be merged into the develop branch and, in order to release it, the features that should not be reflected (features made previously) also have to be uploaded to the main branch.

So we came up with a method to extract features from main. And in the event that the feature has to be reflected immediately, we came up with an approach of merging directly to main without going through the develop branch. However, I personally did not like that strategy because it was too complicated. First, you have to consider whether to do it on development or main every time you merge a feature. You also have to keep syncing the main branch and the develop branch.

Thinking about this, we started to wonder why we were fixated on the develop branch. We doubted whether the develop branch was only playing the role of accumulating implemented features before merging into main. Accordingly, we considered github-flow, and although there were some expected issues, we concluded that github-flow was suitable for our scale.

The downside to github-flow is that features are instantly attached to main without an intermediate stage. And in the process, if a dev server is introduced, you have to rebase the feature from main, attach it to the dev server, and verify that it works properly. (Simple QA) However, this service feels less complex for us than other branch strategies.

### Persona Redefinition

We needed to redefine the persona. The trigger for this was June's UX lecture. After the lecture, we got the idea that the service we were trying to create was a vitamin. So we focused on the problem we could solve and revised the persona and plan. Previously, it was a service that registered a song's killing part and let people see how much they liked the killing part that I registered. People would vote on other people's registered killing parts. (Like like.) This was clearly a vitamin, and we started thinking about what could be better than existing streaming.

It seemed that our service needed the ability to "quickly explore music only by killing parts" in order to become a painkiller. With that in mind, our service had to become better than YouTube Music and Melon. Because there is no need to search for music on our service if you are only looking at killing parts. This is because it was questionable whether searching for songs day by day and listening to killing parts was quick exploring. To solve this, it seemed like we would have to be able to recommend songs to our tastes after checking the killing part of a particular song, or we could choose like and dislike quickly, like shorts.

The problem was only starting here. As we put down the core feature the team had achieved consensus on and started looking for new core features, we gradually felt we were becoming out of sync. As we continued discussing, we were considering issues we did not need to think about at the moment and making judgments based only on assumptions like "This feature will make users ~." And I also ended the meeting without properly organizing my thoughts.

Nevertheless, two days later we discussed the persona again. Even though there must have been a sense of urgency to start developing sooner rather than later. (I did.) That meeting wasn't easy either. We overturned the previous meeting and thought deeply about the service we wanted to provide. Everyone approached the meeting with seriousness, so we started over with "Why do people register for a killing part." And we were able to set the ability to "share" their carefully chosen killing part, based on their "desire to be recognized," as their core value. Despite the continuous meetings, it was a moment when we made a significant conclusion and I felt like our team was really great.

### Frontend

Setting up the environment and defining the styles also took a lot of time for frontend development. First, the environment setup is a factor that will have a global impact for four months of the project. So we felt it was necessary for all team members to understand the situation. However, we often witnessed the progress slowing down because of that reason. We often looked up documents during meetings because we did not understand certain properties in webpack or tsconfig. Also, since we had different opinions, we kept looking for additional materials to promote our opinions. Because of that, the time kept getting delayed.

The same was true when we defined the Figma cyan. There is no set answer for design. It was hard to decide which one was better. Also, just because the design of a particular component is good doesn't mean it will fit in with the overall harmony. So that also took a long time.

After going through a long, long meeting where we decided what we needed to coordinate overall, we were still unable to implement any features. We started feature implementation ahead of Demo Day, and the code review process also took a long time. Sometimes, I wondered if I even had to mention things that I had included in the code review.

It felt like we needed to prioritize, when having meetings, making decisions, implementing features, and doing code review. Especially for meetings, it is necessary to clearly state the purpose. One person may want to make decisions quickly, while another may want to study together in the process. As a result, one person may feel like meetings are a waste of time, and another may feel that the other team members are too passive. (This actually happened.)

The same is true for feature implementation. The part that took the most time during this sprint was validation and testing. However, it was actually counterproductive to be too meticulous about validation and writing test code in a sprint where we needed to implement quickly and receive feedback quickly. Because the plan could change at any time. Of course, validation and test code are important, but they were definitely not high-priority tasks.

Also, I got my wires crossed while implementing features. One reason was a desire to perform input validation even for complex processes, and another was that I had not coded for a long time. So I was not even properly metacognizing what the problem was. When things get too complicated, it might be a good idea to take your hands off the keyboard for a while and sort things out one by one.

## Presentation

I was in charge of presenting at this Demo Day. The part I was most worried about was that I did not much to mention in terms of technical aspects. This is because we did not apply CI/CD, and cross-browsing and testing strategy were not properly established. We also did not introduce libraries like React Query. (The reason was that we did not feel the need for it yet.)

Still, the thing I was confident about was that I had tried to actively accept the feedback I had received from the previous Demo Day. We received advice that the persona and user story were too closely aligned with the plan at the previous Demo Day. We seriously rethought the persona from the very beginning and were able to define the core value of our service. And in the demo presentation, we tried to show the user flow, not simply the feature as the core value. (Thanks to that, we received valuable feedback. **The feedback was that users might be confused if they did not know the rules of our service beforehand.**)

## Feedback

### Focus on Core Value During Sprint Period

At this Demo Day, when we registered a killing part, we made it so that the link could be copied to the clipboard and "shared." We also showed that the most popular killing part was voted on at the same time as registration. However, there was feedback on the latter. If the core value was **registering and sharing killing parts**, it would be better not to show other implemented features. This is because it is an obstacle to understanding the core value we explained and it is not contextually correct. It is important to focus on one goal rather than rashly predicting what will happen in the future or what features to create.

The reason for this is: if you fix the implementation list in a waterfall manner and implement them one by one, it is not easy to modify. This is because if you modify the implementation in the middle to reflect feedback, you have to change the expected features you had already created, which is not easy.

In the same way, by quickly creating and quickly receiving feedback for one goal, we can check