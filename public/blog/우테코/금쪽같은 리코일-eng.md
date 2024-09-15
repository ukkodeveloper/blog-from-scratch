---
title: Recoil is a gem, presenting my troubleshooting experience
date: 2023-05-21
tags:
  - recoil
  - react
image: /images/금쪽1.gif
summary: This article discusses insights and solutions for issues encountered while utilizing Recoil's async selector.
published: true
---

Hello, it's Wooko. I've been actively using Recoil in this shopping cart mission. I found it incredibly appealing due to its atom reactivity, global accessibility, and the reduced complexity of asynchronous processing. Of course, that was before we started the collaboration mission.

To be precise, these issues were already present in the previous mission. However, when we added the requirement to change servers, they became more apparent. This article focuses on identifying the issues.

## Understanding the Situation

When the shopping cart item state does not change, we receive a new shopping cart as state when the server changes. However, if we change the state even once, the shopping cart state does not change even when the server is changed.

### 1️⃣ Situation where only the server is changed ⭕

![](images/금쪽1.gif)

Mako's shopping cart currently has two items, while Woog's is empty. As you can see, when the server changes, the new shopping cart is rendered.

### 2️⃣ Situation where the shopping cart state is changed and then the server is changed ❌

![](images/금쪽2.gif)

Let's add an item to the shopping cart. From Woog's server, we added 10 servings of Seorlong Cheese Pizza to the cart. The shopping cart state has changed. After this, when switching to the Mako server, Woog's shopping cart is still the state. In other words, the shopping cart state is not transitioning.

## 🥺 Exploring the Recoil Code

---

Let's take a look at the problematic code.

```tsx
export const cartQuery = selector({
  key: 'cartState/default',
  get: async ({ get }) => {
    const serverUrl = get(serverUrlState);

    const fetchCart = generateFetchCart({
      resource: `${serverUrl}/${CART_PATH}`,
      credential,
    });

    const response = await fetchCart.GET();
    const cartItems: CartItemType[] = await response.json();

    return cartItems.map((cartItem) => {
      cartItem.checked = true;
      return cartItem;
    });
  },
});

const cartState = atom<CartItemType[]>({
  key: 'cartState',
  default: cartQuery,
});
```

`cartState` and `serverUrlState` are atoms, and `cartQuery` is a selector. The default value of `cartState` is `cartQuery`. `cartQuery` is derived from the `serverUrlState` atom.
![](images/무제%20파일-20240118151432261.webp)

I've drawn a diagram of the code above. `cartQuery` subscribes to `serverUrlState`. The default value of `cart` is declared as `cartQuery`. Whenever the quantity changes, selectors dependent on `cartState` as a get will set `cartState` to a new array of cart items.

The reason for writing the code this way is roughly as follows. `cartQuery` will be reevaluated whenever `serverUrlState` changes. `cartQuery` asynchronously fetches the cart data from the server, which is then used by the `cartState` atom. Therefore, I expected that `cartState` and eventually `cartQuery` would derive new values whenever `serverUrlState` changed.

## Pinpointing the Problem

The issues I encountered were puzzling, as things appeared to be working and then suddenly they weren't. Upon investigation, I realized that the problem was not caused by a single issue, but rather a combination of two. One was that the reference of `cartState` was no longer `cartQuery`, and the other was that selectors cache values.

### 1️⃣ The reference was broken.

Let me explain with a specific scenario.

> I go to the Mako server, change the quantity, and then go to the Woog server.

As mentioned earlier, this is where the problem occurs. When switching to the Woog server, `cartState` does not change to the Mako cart.

If `cartState` needs to be changed dynamically, we must change the state to a new array with `useRecoilState`, like so:

```tsx
// Logic to change the quantity of a particular item in the cart. setCart is a function that changes the state of cartState.

setCart(
  cart.map((cartItem) => {
    if (cartItem.id === cartId) {
      return {
        ...cartItem,
        quantity,
      };
    }
    return cartItem;
  })
);
```

**This means that if you change the state even once, `cartState` no longer references the `cartQuery` selector.** This is because we set the state to a new cart array with `setCart`.
![](images/무제%20파일-20240118151444781.webp)

We have confirmed that `cartState` no longer references `cartQuery`. However, this does not mean that `cartQuery` is gone. Therefore, `cartQuery` still subscribes to `serverUrlState`, and when `serverUrlState` changes from Woog to Mako, `cartQuery` will fetch the cart data according to the new URL. **However, since the reference is broken, `cartState` can no longer access it.**

### 2️⃣ There is a cached value.

> I go from the Mako server to the Hub server, and then back to the Mako server.

I wrote earlier that when only the server changes without any state changes, such as cart quantity, it works fine. However, this is not true.

What I intended was that whenever the server changed, the cart corresponding to the changed URL would be fetched and the data would be rendered in the browser based on that. However, from the second visit to the Mako server, it no longer fetches. **`cartQuery` caches the result of the API call to the Mako server and does not re-evaluate.**

Why do Recoil selectors cache values? The answer lies in the official documentation:

> _Selectors can be used as one way to incorporate asynchronous data into the Recoil data-flow graph. Please keep in mind that selectors represent "idempotent" functions: For a given set of inputs they should always produce the same results (at least for the lifetime of the application). This is important as selector evaluations may be cached, restarted, or executed multiple times. Because of this, selectors are generally a good way to model read-only DB queries_

Selectors can be used as one way to incorporate asynchronous data into the Recoil data-flow graph. Please keep in mind that selectors represent "idempotent" functions: For a given set of inputs they should always produce the same results (at least for the lifetime of the application). This is important as selector evaluations may be cached, restarted, or executed multiple times. Because of this, selectors are generally a good way to model **read-only** DB queries.

**Idempotence** in this context means **a property that ensures that an operation will produce the same result even if it is performed multiple times.** In summary, selectors assume that the user has implemented `get` as an idempotent function. Therefore, selectors are evaluated with the same result for the same atom value due to caching.

My situation is no different. The `cartQuery` selector also caches. When the Mako server is initially selected, `cartQuery` is evaluated by fetching new cart data. However, on subsequent selections, it does not evaluate because the cached value already exists.

### Summary

![](images/무제%20파일-20240118151502197.webp)
1️⃣ Reference issue: If the cart state is changed by the user (e.g., changing the quantity), `cartState` no longer references `cartQuery`. Therefore, `cartQuery` responds when the server is changed, but `cartState` cannot access the corresponding value.

2️⃣ Caching issue: Selectors use cached values for the same input. Therefore, from the second server selection onwards, `cartQuery` does not execute the fetch.

## 🤓 Solution

Fundamentally, the `cartQuery` I intended does not meet the criteria for an idempotent function. It does not satisfy the condition of "same input, same output for the lifetime of the app." My intention was to always fetch and get data externally whenever the server changed.

### 1️⃣ reset

**[useResetRecoilState](https://recoiljs.org/docs/api-reference/core/useResetRecoilState/)**

> _Returns a function that will reset the value of the given state to its default value._

Returns a function that resets the given state to its default value.

Reset can be used to solve the reference issue. Whenever a server is selected, `cartState` is reset. `cartQuery` is re-evaluated, which is the default for `cartState`. This means that the reference can be reestablished.
