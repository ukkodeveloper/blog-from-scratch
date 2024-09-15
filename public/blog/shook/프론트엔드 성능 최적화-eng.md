---
title: Frontend performance optimization
date: 2023-09-28
tags: ['performance-optimization']
image: /images/프론트엔드%20성능%20최적화-20240128171741870.webp
summary: Sharing basic knowledge about frontend performance optimization. Includes content applied directly to the s-hook project.
published: true
---

## What is frontend performance optimization?

In the past, the client was not frequently burdened with performance. However, as the amount of work performed on the web has increased and as diverse images or videos have been included, the bundle size for JavaScript for interaction has also increased. 

Because of this, we must have frequently experienced times when loading takes far too long. Even now, there have been more than a few times when I have entered a particular app or website only to wait for a long time and have no choice but to exit because I cannot stand it.

The article on [Pinterest performance optimization](https://medium.com/dev-channel/a-pinterest-progressive-web-app-performance-case-study-3bd6ed2e6154) is extremely famous. It is a case where JavaScript bundle was minimized, code splitting was performed by route, and image lazy loading was done to implement improvements. As a result of this work, usage time increased by 40% compared to the previous mobile website, advertising revenue increased by 44%, and core engagement increased by 60%.

Therefore, I will discuss the well-known frontend performance optimization methods and introduce what we have applied to our current project.

## Loading optimization
### Source code

Compared to the past, the capacity of the JavaScript code has increased significantly along with the trend toward SPAs. Bottlenecks may occur in the very process of loading JavaScript. 

In fact, based on what we have confirmed in our practical training, if only tree shaking and CSS minification are performed, the size is dramatically reduced from 2.42 MB to 228 KB.

![](images/프론트엔드%20성능%20최적화-20240128171741870.webp)

We have already been provided with many tools. If it is Webpack, there is the Terser plugin. For modern bundlers including Webpack 5 and Rollup, tree shaking is performed automatically by default for optimization.

I used Webpack version 5, and the Terser plugin operates by default in the production environment. Instead, there is a part that we need to pay attention to from our perspective. In order to prevent modules that are not used within the page from being included in the load, modules should be divided well, and only the necessary parts should be used. For contents that are not used immediately, such as modals, lazy import can be applied using the [React lazy](https://react.dev/reference/react/lazy) API.

There is also a plugin that minifies CSS files. ([css-minimizer-webpack-plugin](https://github.com/webpack-contrib/css-minimizer-webpack-plugin)) However, the loading capacity for CSS itself is significantly smaller than for JS, and if CSS-in-JS is used, performance improvement may not be noticeable at all.

### Images

Image optimization is absolutely essential. First, it is frequently used on the web, and second, the capacity is large. 

The key to image optimization is to minimize the loss and maximize the compression. The best method is to use a different format instead of JPG. The capacity for PNG is five times smaller than JPEG. WebP is a format that can reduce the capacity by 26% compared to PNG. ([WebP](https://developers.google.com/speed/webp#:~:text=WebP%20is%20a%20modern%20image,in%20size%20compared%20to%20PNGs.)) However, the availability of an unfamiliar format should always be confirmed in the browser range offered by the current service.

If the capacity is still large, resizing will be necessary. Twice the actual rendering size is reasonable. This is because a Retina display requires a size that is twice the size of a standard image.

However... are we not making responsive websites most of the time? In that case, the image size can be provided differently in accordance with the device resolution. (This is called [responsive image](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).) It uses the 'srcset' attribute of the 'img' tag.

This also means that the responsive images must be made in advance. There is a method for adding the images to assets and compiling them in accordance with the size for each resolution. If the number of images is small, this method may be reasonable. If there are even a few images, responsive images can be created during compilation by using [responsive-loader](https://www.npmjs.com/package/responsive-loader) with Webpack. And the easiest method is automatic if static data is managed through AWS S3!

### Video, fonts

Video and fonts vary greatly depending on the nature of each project, so it seems important to find a method that fits each situation. Let us mention only a few basics...

In the case of video, significant improvement can be made by simply changing the format. The compression ratio is better for MP4 than GIF, and for WebM than MP4. However, again, the range of browsers that support it must be carefully confirmed.

In the case of the font, it is a good idea to eliminate any subsets that are not used. In particular, since fonts are quite numerous in the case of services that support multiple languages, small improvements can drive one mad. Also, the capacity alone is not sufficient to represent all of the improvement figures for fonts. This is because it is a resource that should have high load priority.

There is a funny [anecdote](https://www.zachleat.com/web/mitt-romney-webfont-problem/). In the title of a news article, only 'not' used a different font. However, since loading of that font was slow, only "not" was not visible, which caused a problem. Therefore, although it was originally 'not participating in the presidential election,' it appeared as 'participating in the presidential election,' which caused a major ripple effect.

To explain a bit more, this was actually an article that primarily dealt with FOIT and FOUT. In the case of FOIT, a blank space is inserted before the font is loaded, and in the case of FOUT, even the default font is displayed. In other words, the anecdote was about FOIT, so "not" was not visible. However, FOIT is not versatile; the layout changes when it is changed from the default font to the specified font. In any case, the font is an important resource that must be loaded and applied quickly.

There is also an improved format for fonts. Compared to TTF and OTF, WOFF has a better compression ratio, and WOFF2 is better than WOFF. However, this too must be confirmed as supported before it is used.

## Rendering optimization

Fortunately, rendering optimization requires less attention than loading optimization. Therefore, I will briefly touch on the subject.

### Layout shift

A layout shift refers to an occurrence when the layout changes during or after loading. In other words, since the screen is abruptly cut and changed within a short period of time, it is naturally not good for the UX, and since the layout must be recomputed, it is not good for the performance either.

This issue can be resolved more easily than one might think. If the performance is measured using the Chrome Lighthouse tool, it tells you where the layout shift occurs and explains the solution well.

For example, if the width and height of the image have not been specified, they must be specified directly.

Layout shift may also occur during the user interaction process. For example, let's say that CSS styling has been used to make the styling gradually move from left to right. Since reflow occurs because the 'position' attribute changes the layout every moment, transform can be used instead, which optimizes the process so that recomputation can occur only in the composition step.

### React

When we mention React optimization, we probably first think of memo. However, as our fellow Dan advises, it seems that the top priority should be to first confirm whether the React structure has been properly designed prior to using memo. ([This article](https://overreacted.io/before-you-memo/))

## Optimizing our project

For optimization of the S-Hook project that is currently under maintenance, there was a more important part than those previously mentioned. S-Hook uses the YouTube Player API. It enables songs to be explored through up and down swipes, but in the case of initial loading, the script is loaded in parallel in accordance with the number of songs.

Actually, since that script is cached once it is loaded, it does not need to be loaded additionally, but the problem originated with the fact that it it rendered one time for each song.

Therefore, we changed it so that the YouTube player could be loaded dynamically using intersectionObserver.

#### Before improvement
![](images/프론트엔드%20성능%20최적화-20240128151201694.webp)

Prior to improvement, numerous scripts are loaded. This causes the Total Blocking Time