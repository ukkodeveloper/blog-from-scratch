---
title: The purpose of useEffect is to synchronize with external systems
date: 2023-05-08
tags: ['useEffect', 'react', 'external systems']
image: /images/useEffect의%20목적은%20외부시스템과%20동기화하기%20위해서다-20240128232621063.webp
summary: It explains that the purpose of useEffect is not lifecycle management but synchronization with external data.
published: true
---

According to the official React document, it is emphasized that a component should be pure. It means that the same output must be derived from the same input, and there should be no side effect. However, when programming, there are times when side effect is necessary. In frontend, communications or event handlers are typical side effects. The attempt to reduce side effects in programming is because side effects can lead to unintended execution results. Therefore, it is important to manage side effects properly, and the tool provided to do so is `Effects`.

The official React document refers to `Effects` as "Escape Hatches." Why are `Effects` called escape hatches? This is because it is not possible to solve some issues that are beyond React itself, such as network communications including actual DOM, with React alone. Therefore, to operate or synchronize external systems with React, you have to use a function that acts as an escape hatch. And typical examples of that function are `refs` and `Effects`.

There are points to note when using `Effects`. You need to reconsider using Effects if the purpose is not to synchronize with external systems. Furthermore, you need to check whether the behavior is really dependent on a specific value and needs to be synchronized, or if it is simply something that should be handled by an event handler with user interaction. Therefore, I will explain the points to consider when using `useEffect`.

Before explaining Effect, I will explain the basic terminology first. The `useEffect` provided by the React hook has only three concepts to know. The parameter for useEffect is a callback, and the code that runs inside it is called `setup`, the callback that comes as the return value is called `cleanup`, and the array that is the second argument for useEffect is called `dependency array`.

- set up: Executes the setup function when the corresponding component is rendered for the first time, and when re-rendering occurs.

- clean up: Executes when the corresponding component is re-rendered or removed.
    
- dependency array: Only runs clean up → set up if the values included in the dependency array change. If no dependency array is set, effects run every time a re-rendering occurs.
    

```
useEffect(() => {
	//1 set up...
	return () => {
		//2 clean up.
	}
}. []) //3 dependency array
```

 **And please keep in mind that useEffect runs after the component has been rendered! It does not evaluate during render!**

## useEffect is different from the component lifecycle.

Those of you who have studied class-based React might think of `useEffect` as a replacement for the component lifecycle function. `useEffect` does replace that role, but thinking of `useEffect`'s lifecycle in terms of the component lifecycle makes the thinking process complicated. This is because it requires thinking in multiple stages such as mount, unmount, and re-render.

The official document recommends focusing on **start and stop cycles** only for the lifecycle of `useEffect`. In other words, you should predict the behavior of useEffect by focusing on setup (start) and cleanup (stop) because of the dependent data.

```
useEffect(() => {
  // Your Effect connected to the room specified with **roomId**...
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
  return () => {
    **// ...until it disconnected**
    connection.disconnect();
  };
}, [roomId]);
```

## useEffect in development mode

I'm sure you've all used console.log to check if the logic inside useEffect works properly. You will see that only the `setup` should be executed, but it's not. During development, `setup`, `cleanup`, and `setup` are called in sequence.

This is because of React's `Strict mode`. This setting repeats the mount/unmount process one more time to check if the component is pure. It also acts as a check to confirm whether useEffect properly communicates with the API and whether the required cleanup logic is missing.

```
useEffect(() => {
  fetch('/api/buy', { method: 'POST' });
}, []);
```

Therefore, if you implement the API communication to purchase a product as follows using useEffect, an unnecessary purchase occurs twice in development mode. In this case, you need to check whether useEffect is really necessary instead of turning off `strict mode`.

## Reactive data and dependency array

From now on, I will explain the two important concepts for using the useEffect hook without bugs. One is `reactive (dependency array)`, and the other is `comparison with handler`.

First, useEffect depends on reactive data. It is a value that can change every time a component is rendered. It is reactive data because not only props and states but also data calculated within the component can change. Therefore, if you use reactive data when using useEffect, you must register it in the dependency array.

There are two points to note in the process. First, "Does the external system really need to be synchronized whenever the reactive data changes?" This question arises when the code is written using useEffect to synchronize with the external system, and in the process, unnecessary dependency occurs. If not, it would be better to check again whether useEffect is really necessary.

Second, "Is there no object or function in the dependency array?" Objects and functions are reference types. Even if they seem to have the same value, there will be many cases where new objects and functions are declared every time the component is re-rendered. In other words, since they are different objects and different functions, useEffect will respond unnecessarily.

```
function ChatRoom({ roomId }) {
  // ...
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options])
```

For example, this `useEffect` hook sets options as a dependency array. Since a new object is being declared, `Effects` occurs every time re-rendering occurs, even if `roomId` has not changed.

## Distinguishing it from the handler

Last, it is necessary to distinguish the handler, which is one of the two ways to handle side effects in React, from `Effects`, as shown in the figure shown earlier. In other words, I recommend that you check whether there are things that should be handled with an event handler in the `Effects` you are using now.

Let's take the shopping cart program as an example. There is a stepper component that changes the quantity of the shopping cart item. The component should notify the server of the changed quantity whenever the quantity changes. In this case, the server can be synchronized by making `Effects` dependent on the reactive data known as quantity.

On the other hand, let's say we purchase shopping cart items by clicking the order button. The order button component can communicate with the server via an event handler when the button is clicked. In this case, it is not necessary to use `Effects`. It is as follows:

```
function handleClick() {
  fetch('/api/buy', { method: 'POST' });
}
```

```
useEffect(() => {
  fetch('/api/buy', { method: 'POST' });
}, []);
```

The following is an example from the official document. This `useEffect` is a bad example. What is the reason?

First, two POSTs occur in development mode, which is a logic that affects the actual program. It causes different results from simply connecting to the server or GETting.

Basically, judging from `api/buy`, purchasing is not due to rendering. For example, it is something that is independent of rendering, such as changing the quantity or entering a value in the input field. Since it is an event that occurs due to a specific interaction such as clicking the purchase button, the fetch logic should be moved and used as an event handler. There is no need to use effect.

Isn't it a difference of `action` vs `synchoronize`? When you need to synchronize with an external system according to the value being rendered, I recommend using effect. On the other hand, if it is an action that occurs according to a specific event like a purchase button or a shopping cart addition confirmation button, you do not need to use effect.

## Other

1. If there is a high-cost calculation in the component, you may want to calculate only when a specific state or prop changes. In this case, use useMemo instead of effect.

2. If you use reactive data in `useEffect` without including it in the dependency array, a lint error will occur. Reactive data here means values that can be changed continuously like props or states, or anything that uses those values.