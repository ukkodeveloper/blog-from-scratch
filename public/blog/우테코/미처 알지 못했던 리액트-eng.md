---
title: React You Didn't Know
date: 2023-09-10
tags:
  - React
  - flux
  - life-time
published: true
image: /images/know-react4.png
summary: This post covers concepts that I misunderstood or continue to ponder about while using React. It is based on the official documentation.
---

It's been about 5 months since I started using the React library. At first, I was eager to understand the new paradigm. Now, I'm somewhat familiar with how to use it, but I still experience code behaving differently than expected. While working on a recent project, I hastily implemented features without taking the time to reflect on them. Fortunately, I had a week to study the React documentation again. This opportunity allowed me to revisit key React concepts and clarify misunderstandings.

The contents of this article are divided into "Concepts You Didn't Know," "Concepts to Continue Pondering," and "Interesting and Mysterious Experiences." "Concepts You Didn't Know" focuses primarily on concepts that I thought I understood but didn't. "Concepts to Continue Pondering" lists abstract concepts that I will continue to think about.

## Concepts You Didn't Know

### State immutability

When reading the React documentation, it says that state and props are immutable. I didn't understand this part. The phrase "should be immutable" felt more accurate because both state and props are objects, so it is possible to manipulate their properties. The dictionary definition of [immutable](https://en.wikipedia.org/wiki/Immutable_object) also states that it is impossible to change the state.

After rereading the documentation, I realized that I was being too narrow-minded. The key is that if state is an object, it should be updated with a new object every time. I concluded that it is sufficient to understand that state and props should be managed immutably.

### Key
I used to think that a key in React is a prop that must be attached to an array. And I almost memorized the reason why. I only knew that when creating a JSX component with an array, it is difficult to identify individual components whenever the order of the array elements changes.

However, this opportunity allowed me to think more deeply about the relationship between keys and state.

![know-react1](/images/know-react1.png)

Let's assume we are rendering components A, B, and C as an array like this. If D and F are added in the next render, we will lose the state management. This is because the state declared using useState manages the array based on the render order. Therefore, if we iterate over the array to render, the order of the elements may change continuously, making it impossible to map the state of the array's element components.

![know-react2](/images/know-react2.png)

However, if we assign unique id values as keys to the list elements, it will look like this. Regardless of whether the order or number of elements in the array changes, the component state managed by the array element component can be mapped directly to the state.

### Rendering
The rendering process in the official documentation consists of the trigger, rendering, and commit phases. The trigger is a situation where the UI needs to be redrawn due to a state change. Rendering is the process of reading the written code and creating React's Virtual DOM. Commit is the process of comparing the previous Virtual DOM with the current one, identifying the changed parts using React's diffing algorithm, and applying them to the Real DOM.

I learned that state change is the only factor that triggers re-rendering. Previously, when thinking about the conditions under which a specific component would re-render, I vaguely thought that it re-rendered when props or state changed. However, this is not the case. Even if the props do not change, the child component will re-render if the state of the parent component changes. Also, if the props are a ref value, the re-render will not occur even if the props change. In other words, re-rendering occurs only when the state changes, and all child components below that component are re-rendered.

### Synthetic Event
This is an event object that wraps the Native Event in React. Therefore, the properties we use when attaching events in React code, such as onClick, are actually Synthetic Events. This may be natural because the output of React's rendering process is the Virtual DOM, not the Real DOM. Before attaching the Virtual DOM to the Real DOM, additional operations can be performed for optimization, such as delegating and assigning events.
![](images/know-react3.png)

As shown in the figure, the event handlers in the child components are delegated to the common ancestor component, which registers the events. This has the advantage of preventing too many events from being registered in the global object.

### Controlled and uncontrolled
I first learned about uncontrolled components when creating a form component using input. At that time, I simply thought that an uncontrolled component means not having the input value as state, but as a ref. However, that case was just one of many uncontrolled cases. In other words, it is wrong to call something an uncontrolled component just because it is managed by a ref.

Uncontrolled components refer to components that are not under the control of the parent component. (Since everything is relative, it is important to clearly define the subject.) If a specific component is affected by the state of the parent component, it is a controlled component; otherwise, it is an uncontrolled component.

### Lifecycle
When writing components as classes, I heavily relied on the lifecycle methods. And after changing to functional components, I thought that useEffect alone controls the component lifecycle.

However, I learned that useEffect is not a hook for managing the component lifecycle. Of course, useEffect is affected by the component lifecycle because it runs during rendering. Nevertheless, useEffect has its own lifecycle. It sets up and cleans up based on the dependency array registered with it.

Refs are also closely related to the component lifecycle. Refs are referenced during the rendering process. Therefore, if there is a Ref that references the DOM, that Ref will reference the already attached Real DOM. The reason this is important is because we need to know what the Ref is referencing when a re-render occurs.

![know-react4](/images/know-react4.png)

The following diagram shows the process of changing state. The state changes and re-rendering occurs, but if the component uses a Ref, it will reference the DOM before it is changed. Therefore, it is common to use the Ref logic in useEffect. This is because the changed Ref operates in a state where the reference to the DOM has been made.

However, it is not necessary to use the ref + useEffect combination. If you use the ref callback, the ref referencing is done after the Real DOM is committed after rendering. However, the ref will be `undefined` during rendering because it does not reference anything during re-rendering. Therefore, you must always use a conditional statement to filter out `undefined`.

## Concepts to Continue Pondering

### Declarative components
React is often referred to as a library for creating declarative UI components. What does declarative mean? It's easier to understand if you think of it as What rather than How. Thanks to JSX, we only need to return the JSX element as the return value in the component.

In vanilla JavaScript, we had to manually create, access, and add DOM elements. With JSX, we can define what a component will render instead of writing a series of imperative code.

Therefore, when using React, we can experience changes being reflected as if by magic without directly manipulating the DOM. However, the term "declarative" implies that someone else is handling complex tasks "imperatively." In other words, React provides an API for us to use declaratively, and React itself handles the actual complex tasks.

![know-react5](/images/know-react5.png)

This image is part of the conference materials released by the React team. It is a good illustration of how React uses the FLUX pattern to solve the complexities arising from the MVC pattern. First, React's rendering process is unidirectional. When an initial render or user interaction triggers an Action (setState), it modifies the data (state) managed by the Dispatcher and draws the View based on that data.

React can be declarative because the Dispatcher, Store, and the process of drawing the View are handled by React. Instead, we can program by focusing on the View and Action. The View will be a component expressed in JSX, and the Action will likely be related to rendering operations and Hooks.

### Colocate
I mentioned above that React allows us to focus on the View and Action, which is also evident in the concept of colocation.

In the past, HTML, CSS, and JavaScript were separated because they had different functions. HTML is the skeleton, CSS is the styling, and JavaScript is the logic, so this separation is reasonable. However, it was true then, but it is not true now. At that time, the web was used to display data, and there was not much user interaction.

On the other hand, the web is now used as an app, so there is a lot of user interaction. The UI must be changed with each interaction. In other words, the two have become very closely related. The separation of functions is no longer meaningful, and it has become necessary to separate them by component concerns. Therefore, React seems to have adopted a format that defines components by placing the UI and logic together.

### Side effects
A pure function is a function that does not change external state and returns the same result for the same arguments. According to the official