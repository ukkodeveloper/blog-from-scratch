---
title: Build project environments - Don't dissect the frog, build it
date: 2023-08-10
tags: ['Environment']
image: '/images/프로젝트를%20해부하지%20말고%20직접%20만들어라-20240125111732810.webp'
summary: I've summarized what I've learned so far on setting up a front-end environment. Instead of showing you what I did, I've made this article focus on my approach.
published: true
---

When starting a project, I had to do some basic environment setup. I had to set it up from scratch without any tools that provide a basic environment like CRA or Vite. Without these tools, there's a lot to consider and it's hard to know where to start with environment setup.

You have to build from scratch and configure linting, TypeScript, and a separate environment where jest or storybook can run. You also need to configure lint and prettier and consider using babel for backward compatibility. You also have to think about the directory structure and how to manage static assets. (Even though there's so much to do, this is considered a basic setup.)

Of course, since I've already done the setup, I can list what needs to be done. **When I first said, "I need to 'set up an environment for the project,'" I didn't even know where to start.**

**This article is about how to approach environment setups when they seem too broad or unfamiliar to know what to do.** If you search for "Getting started with React without CRA", you'll find lots of articles that say, "If you apply it in this order, you'll be able to set up your environment." (It really does work if you follow the order.) However, I haven't found many articles that show the 'thought process' behind how to set up environments. So I wrote this article focusing on the 'approach' rather than on specific setup methods.

Therefore, if you need code that you can apply right away, it would be better to check out the wiki created by our team. Or if you search for "Getting started with React without CRA", you'll find a lot of articles.

[Code applied to the real project](https://github.com/woowacourse-teams/2023-shook/wiki/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%ED%98%84%EC%9E%AC-%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95)

## Why "build it yourself"?

Before setting up the project environment, it would be good to consider the "purpose". Of course, you need to set up the environment to write code, but you might also be wondering why you don't just use CRA or Vite.

Honestly, I think starting from scratch using webpack is like reinventing the wheel. In other words, it's not project-focused. Still, we have to build some things we've taken for granted (building processes being one of them) ourselves to understand the process.

> Don't dissect the frog, build it.

This means that to learn something, you have to do it yourself to really understand it. By designing and applying the environment setup ourselves, we can experience various issues and gain a deeper understanding of it. (In other words, I think if you really want to manage a project properly, you should use a well-built CRA or Vite, or if you do SSR, a framework like Next.)

## Listing setups

The first thing I had to do was list the things I needed to set up. I think that the more vague something is, the more you need to break it down and apply it one by one until it's complete. However, in the case of this environment setup, even what to do seemed vague.

### Finding factors that make it daunting

In fact, when it comes to environment setup, things like lint and prettier setup, and installing packages that I use are all familiar to me. So, I had to figure out what was really making it seem daunting. In my case, it was 'build'. In my experience with CRA or Vite, I was able to check the project locally in dev mode with `npm run start`. Also, the files were automatically built and compiled when I ran `npm run build`.

In other words, I think it seemed daunting because I was automatically using those features without thinking about them. So I decided to write down what I had been taking for granted.

## Finding features that I've taken for granted

1. The project starts in dev mode when I run `npm run start`.
2. A build file is created when I run `npm run build`.
3. In dev mode, rendering reflects code changes without a refresh.
4. Even React states are still preserved.
5. I could use environment variables by defining them in the .env file.
6. I could use Jest right away.

There's probably more, but I wrote down what I could think of right away.

## Listing actual things to do

Finally, I went from "I don't know what to do" to "I know what to do. I don't know the specifics, but..."

So now I can list what I need to do and work on them one at a time. (I think that once you know what you need to do, you can figure out the specifics somehow.)

The things I need to do are as follows:

- Build environment setup
  - Use webpack to distinguish dev and prod modes
  - Enable HMR in dev mode
  - Serve static files
- Setup eslint and prettier
- Setup Jest and StoryBook environments

## Things to keep in mind when implementing

Once you've created a list and drawn the big picture, it's time to apply them one by one. That's easy to say, but it's actually not that easy. Sometimes it didn't work as expected, and sometimes I had to apply things that I hadn't even thought about.

Whenever that happened, based on the mistakes I made, I thought about how to take a smart approach and organized my thoughts.

### Take your time to learn

Sometimes when I look at the implementation items one by one, I tend to rush and focus on solving specific problems. When I do that, I lose the main point and I'm unable to clearly distinguish between the items I need to do and the roles that specific packages or plugins play.

For example, it was the time when I was working on ensuring javascript backward compatibility in the webpack environment. I was so confused as to whether I should use Babel or if I could just use tsconfig's target field. At that time, I focused on "So what and how do I do this?" to apply it quickly, and I lost sight of the core part.

In the process, I had to take my time to learn 'syntax conversion' and 'polyfill'. It was also necessary to compare and contrast the roles of tsc and babel. Understanding the features provided by each package was the priority.

### Don't lose sight of the big picture

Don't get lost in the details and miss the main point. As I set up the environment, there were many unfamiliar areas, so there were a lot of settings that I didn't understand. For example, I didn't understand when I applied ReactRefreshWebpackPlugin to support HMR. Using one plugin is enough to solve the problem, so I anxiously searched for and tried many different things. (Of course, I couldn't understand it properly.)

I felt that it was important to quickly experience a cycle that works properly. Areas that are difficult for me to understand or take a long time to understand at my current level sometimes need to be postponed for a little while. Only then can you create something that works without losing your way.

### Always fill in the basic knowledge

As you set up your environment, there are some basics you need to know. Basic knowledge is knowledge that is repeated often or is necessary for understanding the bigger picture. It's always better to clearly understand these things and move forward.

Examples include paths and module systems. The reason why I initially felt the need to learn about paths was that there were many examples where webpack's entry was a relative path and output was an absolute path. I know what relative and absolute paths are, but I had never thought deeply about when to use them. Paths are repeated constantly when setting up the environment, so it would be easier to get used to them if you learn them properly.

The module system is the same. There are various module-related issues as well as compatibility issues. For example, if you compile to a CJS module in tsconfig when using ts-loader, tree-shaking won't work. To deal with these, it's helpful to clearly understand the module system when setting up various items.

## Conclusion

As I said earlier, the key to these tasks is not to analyze the frog but to build it yourself. For simple analysis, you only need to understand what settings you need to apply and what concepts you need.

However, by going through the process of building it yourself, you can learn about not only the related knowledge but also how to approach it. During that process, there were some things that I was disappointed about, and being able to feel that
