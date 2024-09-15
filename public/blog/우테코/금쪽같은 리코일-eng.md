---
title: Debugging Challenges with Recoil
date: 2023-05-21
tags:
  - recoil
  - react
image: images/Troubleshooting-Recoil.gif
summary: I present my analysis and solution to an issue faced while utilizing an async selector in Recoil.
published: true
---
Greetings from Ukko. I've been actively using Recoil in this shopping cart mission, and I found its state change in response to atom reactions, global accessibility, and reduced complexity in asynchronous operations very attractive. Of course, that was before we started the collaborative mission.

To be precise, the problems were evident in the previous missions as well. However, these hidden issues surfaced when a server change requirement was added, and this article will focus on identifying these issues.

## Understanding the Situation

When the shopping cart item state is not modified, selecting a new server will update the state with a new shopping cart. However, if the state is modified at least once, the shopping cart state will remain unchanged even after changing the server.

### 1️⃣ Case of Server Change Only ⭕

![State of the shopping carts when server is changed - green cart indicates current selection](images/Troubleshooting-Recoil-1.gif)

As you can see, when the server is changed, the new shopping cart is rendered.

### 2️⃣ Case of Server Change After a Cart State Modification ❌

![State of the shopping carts when server is changed after a cart state modification - green cart indicates current selection](images/Troubleshooting-Recoil-2.gif)

Let's add an item to the shopping cart. In the image, 10 Seollung Cheese Pizzas have been added to the cart from the Uga server. Consequently, the cart state has changed. After that, when the server is switched to Mako, the Uga cart is still displayed as the cart state, indicating that the shopping cart state is not being updated.

## 🥺 Examining the Recoil Code

---

Here is the problematic code:

```tsx
export const cartQuery = selector({
  key: 'cartState/default',
  get: async ({ get }) => {
    const serverUrl = get(serverUrlState);

    const fetchCart = generateFetchCart({ resource: `${serverUrl}/${CART_PATH}`, credential });

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

Here, `cartState` and `serverUrlState` are defined as atoms, and `cartQuery` is a selector. `cartState` has `cartQuery` as its default value. `cartQuery` derives its value from the `serverUrlState` atom.
  
I've created a diagram to illustrate the code:

[Diagram of Recoil code with arrows showing data flow - cartState derives its value from cartQuery, which in turn derives its value from serverUrlState](images/flow.webp)

As you can see, `cartQuery` subscribes to `serverUrlState`. The default value of `cart` is declared as `cartQuery`. Whenever the quantity is changed, a selector that depends on `cartState` as a getter modifies the `cartState` state with a new cart array using `set`.

The reason for writing the code in this way is roughly as follows: Whenever `serverUrlState` changes, `cartQuery` will be reevaluated. `cartQuery` then fetches shopping cart data asynchronously from the server. This is then used by the `cartState` atom. Therefore, as I expected, whenever `serverUrlState` changed, I assumed that `cartQuery` and `cartState` would also be updated with new values.

## Precisely Identifying the Problems

The issue I encountered was intricate: it seemed to work fine at first but then suddenly stopped working correctly. After examining the problem, I realized it wasn't just one issue but rather a combination of two separate issues. One was that `cartState` no longer referenced `cartQuery`. The second was that selectors cache their values.

### 1️⃣ Reference Lost

Let me explain with a specific scenario:

> Enter the Mako server, change the quantity, and then switch to the Uga server.

As mentioned earlier, this is where the problem occurs. When switching to the Uga server, `cartState` is not updated to the Mako cart.

If `cartState` needs to be updated dynamically, we need to explicitly change the state to a new array using `useRecoilState`. Like this:

```tsx
// Logic for changing the cart item quantity. setCart is used to change the state of cartState.

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

**In short, if the state has been modified at least once, `cartState` no longer references the `cartQuery` selector.** This is because the new cart array with the updated quantity has been set as the state using `setCart`.
[Diagram showing cartState no longer referencing cartQuery](images/state-change-lost-reference.webp)

We've confirmed that `cartState` no longer references `cartQuery`. However, this does not mean `cartQuery` has disappeared. `cartQuery` still subscribes to `serverUrlState`, and if `serverUrlState` changes from Uga to Mako, `cartQuery` will fetch the cart data according to the new URL. **But since the reference is lost, `cartState` can no longer access it.**

### 2️⃣ Cached Value

> Go from the Mako server to the Hub server. Then go back to the Mako server.

At the beginning of the article, I mentioned that if there are no state changes (such as changing the quantity of items in the cart), it works fine when only the server is changed. In fact, that's not entirely true.

My intention was as follows: When the server is changed, I wanted to fetch the cart corresponding to the changed URL, render it in the browser based on that data. However, from the second visit to the Mako server onwards, it no longer fetches the data. **`cartQuery` does not re-evaluate because it has already cached the result of the API call to the Mako server.**

Why does a Recoil selector cache values? The answer can be found in the official documentation:

> _Selectors can be used as one way to incorporate asynchronous data into the Recoil data-flow graph. Please keep in mind that selectors represent "idempotent" functions: For a given set of inputs they should always produce the same results (at least for the lifetime of the application). This is important as selector evaluations may be cached, restarted, or executed multiple times. Because of this, selectors are generally a good way to model read-only DB queries_

Selectors can be used as one way to incorporate asynchronous data into the Recoil data-flow graph. Please keep in mind that selectors represent "idempotent" functions: For a given set of inputs they should always produce the same results (at least for the lifetime of the application). This is important as selector evaluations may be cached, restarted, or executed multiple times. Because of this, selectors are generally a good way to model read-only DB queries.

Here, **idempotent** means **an operation that produces the same result even if it is executed multiple times**. In summary, selectors have a premise that users have implemented the `get` using idempotent functions. Therefore, selectors are evaluated with the same result for the same atom value through caching.

This is also true in my case. The `cartQuery` selector also uses caching. When the Mako server is first selected, `cartQuery` fetches and evaluates to new cart data. However, on subsequent selections, it does not evaluate because the cached value already exists.

### Summary

[Diagram showing both reference and caching issues](images/summary.webp)
1️⃣ Reference issue: If the user modifies the cart state (such as quantity), `cartState` no longer references `cartQuery`. Therefore, even if the server is changed, `cartQuery` responds, but `cartState` cannot access the corresponding value.

2️⃣ Caching issue: Selectors use cached values for the same input. Therefore, from the second server selection onwards, `cartQuery` does not execute the fetch.

## 🤓 Solution

Fundamentally, the `cartQuery` I intended does not meet the idempotent function. It does not satisfy the condition of "same output for the same input while the app is alive." My intention was to fetch and get data from the outside every time the server changed.

### 1️⃣ Reset

**[useResetRecoilState](https://recoiljs.org/docs/api-reference/core/useResetRecoilState/)**

> _Returns a function that will reset the value of the given state to its default value._

Returns a function that resets the given state to its default value.

Reset can be used to solve the reference issue. When a server is selected, `cartState` is reset. The `cartState` default, `cartQuery`, is reevaluated. This means the reference can be