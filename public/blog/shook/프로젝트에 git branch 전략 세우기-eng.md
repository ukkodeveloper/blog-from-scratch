---
title: Establish a Git Branch Strategy for Your Project
date: 2023-07-20
tags: ['git']
image: /images/oauth1.png
summary: We brainstormed a Git branch strategy for the S-hook project. Here are the discussions we had.
published: true
---

## Why You Need a Git Branch Strategy

Version control is essential when working on a project in a team. This is because the work that one person is doing is different from the work that another person is doing, and we cannot predict how the two separate entities will affect the other. For this reason, we version control by dividing it into branches, preventing conflicts and ensuring stable software development.

There are several Git branch strategies. The most popular strategies are Git-flow and GitHub-flow. Just because these are popular does not mean they are the correct fit. It can vary greatly depending on the size and nature of the project. For example, in the case of mobile apps, all distributed versions must be taken into consideration. In the case of web, however, version management should focus on the latest version because only the latest version is always distributed.

Since it is early in the project and there is no development server yet, we cannot anticipate all the work ahead. However, we took some time to explore various strategies, discuss which strategy is right for us, and conduct simple demos to see the advantages and critical aspects of our chosen strategy.

## Git Branch Strategy

### Git-flow

In Git-flow, it is largely divided into develop and master branches. The master branch is the branch that is being distributed, and the develop branch is the branch where all completed functions are stored. In other words, the develop branch is temporarily stored before going to the master branch. It will be easier to understand if you look at the diagram.
![](images/git branch 전략-20240118150657130.webp)

Now, let's see what derivative branches arise from these two main branches, develop and master. The hotfixes branch is derived from the master branch. As the name suggests, this is a bug-fixing branch that needs to be fixed quickly, so it must be branched from master, not develop. And if a hot fix has been applied, it should be reflected in both develop and master.

The branch derived from the develop branch is the feature branch. This is a branch for feature development. Once the feature is complete, the branch is merged to the develop branch. And the release is a branch that you go through before you deploy to the master. It is a branch for QA before launch.

### Choosing Git-flow

Initially, we adopted Git-flow for our S-HOOK project. The reason was a bit flimsy, but since everyone was a novice at the time, it was a very valid reason. Firstly, a prologue project that about 20 crew members within Uteco are working on also uses Git-flow, and two of them are well aware of the strategy and are involved in our project. Secondly, it seems like the most robust. As explained later, Git-flow seems too simple. On the other hand, Git-flow seems very well-organized and gives the feeling that the software is being managed systematically.

### Git-flow Issues

However, we realized the problem when we tested the branch strategy through a simple demo. First, if a feature branch is already attached to the develop branch, functions cannot be deployed selectively. For example, suppose functions A, B, and C are merged into the develop branch sequentially. You may also want to deploy only B and C functions to the master branch without A function in the event of an emergency. However, in the current structure, it is extremely complicated to solve this. Secondly, we do not need a release branch because we do not have professional QA or a systematic system for periodic distribution.

## Modifying Git-flow

So the idea was to take Git-flow and modify it to our liking. It was not difficult to delete the release branch that came up as the second problem. We thought it was a very reasonable choice for our team. The problem was the first problem.

There was a really heated debate, and it was decided to create all feature branches from the master branch. It was kind of a decision that took into consideration functions that, while not bugs, should be included in the master. The name is a feature branch, but let's say it could always be a hot feature branch.

### Issues

Of course, there are issues. (Any choice will have issues.) The issue is that every time a feature branch is merged, it is not clear whether we should attach it to develop, master, or both develop and master at the same time. It would be better if the features of the functions being developed could be distinguished. However, this is a matter that can be determined flexibly according to the plan or various situations, which can lead to more confusion.

## GitHub-flow

![](images/git branch 전략-20240118150750543.webp)
From the image, you can see that it is quite simple compared to Git-flow. If you have a feature to implement, you can derive a branch and develop it. Then, connect a development server to that branch and proceed with sufficient QA. Then, if the feature is needed in time for distribution, it can be merged to the master and distributed.

This addresses several issues with Git-flow. First, it solves the complexity that arose from the various options and complexity that presented during merging in the modified Git-flow. It also addresses the issue of selectively deploying functions from the develop branch, which was the reason Git-flow had to be modified. This is because if a function does not seem to be needed right away, it is not merged to the master even if its development has been completed. The branch can be left as it is.

### Disadvantages

Most of the disadvantages of GitHub-flow become a problem when the project grows larger. The fact that features can be attached to master after QA becomes a bottleneck. This is because rebase of the latest master version is required each time QA is performed and the QA is performed feature by feature. It is also difficult to manage branches of functions that have been completed but have not yet been merged to the master. Conversely, these disadvantages also support the fact that it is truly optimized for small-scale projects.

## Conclusion

We have identified the advantages and disadvantages of customizing various Git branch strategies to our liking. In the process, we encountered unexpected issues and always tried to find the best strategy for us. At first, Git-flow was adopted simply because it was popular and seemed systematic. However, in the process of resolving various disadvantages, we were able to find the strategy that we really needed. And now we can clearly explain the reasons for it.

### Sources

- [https://techblog.woowahan.com/2553/](https://techblog.woowahan.com/2553/)
- [https://blog.hwahae.co.kr/all/tech/9507](https://blog.hwahae.co.kr/all/tech/9507)
- [https://cjw-awdsd.tistory.com/49](https://cjw-awdsd.tistory.com/49)
