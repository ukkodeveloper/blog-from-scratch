---
title: 이제부터 스크롤하세요
date: 2023-11-02
tags:
  - ux
  - 리액트
image: /images/Jan-28-2024%2014-22-41.gif
summary: 섬세한 조절이 필요한 UI에 스크롤이 도입했습니다. 그 과정에서 필요했던 지식들을 공유합니다.
published: true
---

## Scrolling is the new dragging

The S-HOOK (슉) service we are developing allows users to register and share their own killing parts for each song. It is designed to target mobile users, therefore, UX for registering killing parts is very important.

However, there has been a lot of feedback saying that registering killing parts is inconvenient. When I used it myself, I did not mind the difference of 1 or 2 seconds in the killing part, but that was not the case with users. It turned out that the slider for setting the time did not work as delicately as I thought.

![](images/20240125153538688.webp)

Since the absolute size of the mobile width is limited, we pondered how to solve this. After lengthy discussions with team members, we decided to adopt the 'scrolling' UI used for posting stories on Instagram to select killing part sections. And the result is as follows. ![](images/Jan-28-2024%2014-22-41.gif)

## UI Explanation

Before talking about the details of implementation, I think it would be helpful to explain the UI in general.
![](images/20240127182940001.webp)

The necessary information for registering a killing part is 'start time' and 'duration'. The start time is available from 0 seconds to (song length - duration). The duration can be set from 5 seconds to 15 seconds.

The duration of the killing part section can be changed by UI 1. UI 2 is used to temporarily save the killing part before registering it, and has a name of 'pin'. UI 3 is a changed UI that uses scrolling instead of a slider. The start time can be adjusted by scrolling left and right. And the small box inside it represents the killing part section. Let's call it the killing part section box.

## Development

### Calculating Scroll Width

Before calculating, you need to consider whether or not you will be changing the scroll width. If you are going to change it, you can change the width based on the viewport width or the length of the song. I dynamically changed the scroll length based on the length of the song as I thought the scroll width was long enough.

And now, we need to select the area for scrolling. If you do not add padding to the left and right of the scroll, the wave UI will exist beyond the killing part section box. It's like the first picture.
![](images/20240128123920190.webp)

Therefore, we need to add padding to the beginning and end of the song so that the scroll does not exceed it. It's like the second and third pictures. To do this, we need to calculate the padding value by setting the padding value to half of the length of the entire width minus the width of the killing part section on the left and right.

The important thing here is that the killing part section box is dynamic. Since you can specify the section from 5 to 15 seconds, the length changes dynamically. Then you can see that you need to reset the padding value whenever the section changes.

That's not all. The overall width can change as it supports responsive web. You can reset the padding value whenever the width changes by utilizing resize observer.

### Quick Styling

In fact, the above part is the key, and the styling I will talk about now is more like a quick tip.

#### Centering

It is a method to position the killing part section box centered on the entire width.
![](images/20240128124919289.webp)

If you give a left of 50%, it will move to a position **50% of the parent width** from the leftmost of the parent element. Here, you need to translateX by -50%. This property positions it **50% of its own width** to the left. It will be positioned in the center of the parent element.

#### Implementing Gradual Progress

![](images/20240128125058118.webp)
If the killing part section is 10 seconds, it is a UI that gradually rises from left to right in the section box for 10 seconds. This can be implemented using background property. Double the background and then fill the left with pink and the right with transparent using the linear-gradient property. After that, it is positioned to move from left to right as much as the killing part time.

If it is in repeat mode, the animation will continue to repeat when the animation is set to infinite.

### Understanding Data Flow

It feels strange to suddenly talk about data flow while explaining the scroll UI. Initially, I thought that I only needed to worry about the UI. However, managing the React state and side effects was more difficult than I thought.

At first, I thought that changing the duration would only change the duration state, and moving the start point by scrolling or pinning would only change the start time state.

However, there were interactions in which the React state had to be changed and the scroll had to be changed immediately due to user interaction. For instance, if you click the temporarily saved killing part section, the start time should move, while the scroll should also be changed at the same time.

If you implement it one-dimensionally without such a design, it will be difficult to find the flow and they will affect each other. In addition, if debouncing is not set with the appropriate dependency, even the person who created the code will not know why this happens.

The following is a simplified diagram of the complex data flow.
![](images/20240128133937595.webp)

Debouncing was added for the case where YouTube might be manipulated too much when scrolling. Since the duration and start time states affect the UI, the UI is reflected immediately and the YouTube player should be delayed.

In addition, it is essential to manage the scroll position. The scroll is a gateway for all user interactions. In other words, the killing part section or start time must eventually be changed by the scroll position. This is because the scroll position and killing part information must all be synchronized.

## In Conclusion

It was a very difficult task. In fact, not all of this planning was planned from the beginning. It was created by creating, receiving feedback, and modifying the feature over 5 times. As a result, I realized that what initially seemed correct was wrong after making corrections. For instance, the scroll position was acting as a gateway to external systems due to synchronization.

There were also parts where I could not help but implement them by using my known anti-patterns. According to the official documentation, other state changes should not be triggered in response to a React state change. But if I do not do so, the data flow becomes very messy. I used the anti-pattern with the intention of applying it as a last resort.

Despite the regrets, I am proud of the fact that my team worked together to solve the problems and improve it through planning. In fact, we have received a lot of feedback saying that the registration process has become more fun from user feedback. My development capabilities have also grown a lot. I experienced side effects and how the UI and data are tightly coupled. The more complex it is, the I felt all the more the need to implement it by creating a big picture, rather than implementing it in a straightforward manner.
