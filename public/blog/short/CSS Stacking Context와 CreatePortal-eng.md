---
title: CSS Stacking Context and CreatePortal
date: 2024-08-24
tags:
  - css
image: /images/CSS%20Stacking%20Context와%20CreatePortal-20241003131047338.webp
summary: A discussion of stacking context and an issue I encountered
published: true
---

Dealing with the stacking order of elements in web development is more complex than it seems. Just throwing a high z-index on an element doesn't always do the trick. This complexity stems from a concept in CSS called the Stacking Context.

A Stacking Context is a three-dimensional conceptual model that determines how elements are layered on the screen. Think of it like a stack of papers on your desk. However, in this case, each stack of paper can form its own independent Stacking Context, adding to the complexity of the overall structure.

## Stacking Contexts

Stacking Contexts are created under specific conditions:

- **The root element of the document (`<html>`)**
    - This is the base Stacking Context for every web page. All other elements are stacked within this context.
- **An element with a position value of absolute or relative and a non-`auto` z-index**
    - This condition takes an element out of the normal document flow and creates a new Stacking Context.
    - Example: A `div` with `position: absolute; z-index: 1;` creates a new Stacking Context.
- **An element with a position value of fixed or sticky**
    - Fixed positioning pins an element to the viewport and always creates a new Stacking Context.
    - Sticky positioning changes its behavior based on scroll position but also creates a new context.
    - Examples include headers that stick to the top of the page or sidebars that follow you as you scroll.
- **A child of a flexbox or grid container with a non-`auto` z-index**
    - This can be useful to control the stacking order of specific elements within a flexbox or grid layout.
    - Example: Giving a child element within a container with `display: flex;` a `z-index: 1;` will create a new context.
- **An element with an opacity value less than 1**
    - An element with transparency automatically creates a new Stacking Context.
    - This is to render semi-transparent elements and their children as a single unit.
    - Example: A `div` with `opacity: 0.9;` creates a new context.
- **An element with non-`none` values for properties like `transform`, `filter`, `perspective`, `clip-path`, `mask`, `mix-blend-mode`, and `isolation`**
    - These CSS3 properties significantly change how an element is rendered and therefore require a new Stacking Context.
    - Example: An element with `transform: rotate(45deg);` or `filter: blur(5px);` creates a new context.

Each of these conditions creates an independent context.

## createPortal

React's `createPortal` adds another layer to this complexity. `createPortal` allows you to render a component into a different part of the DOM tree. In simple terms, it's like taking a component and grafting it onto a different "branch" of the DOM tree. However, this can create a new Stacking Context and make it even harder to manage z-index.

For example, it's common to see code like this when rendering a modal with `createPortal`:

```jsx
ReactDOM.createPortal(
  <div className="modal" style={{ zIndex: 9999 }}>
    Modal content
  </div>,
  document.body
);
```

This code may seem fine at first glance. However, if the `body` element is already inside another Stacking Context, the modal may behave unexpectedly.

To fix this issue, use an approach like this:

```jsx
// App.js
import React from 'react';
import Modal from './Modal';

const App = () => {
  return (
    <div className="app">
      {/* Other components */}
      <div id="modal-root"></div>
    </div>
  );
};

// Modal.js
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');

  return ReactDOM.createPortal(
    <div className="modal" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {children}
    </div>,
    modalRoot
  );
};
```

In this approach, we create a dedicated container within the App component to render the modal and then portal the modal into that container. This way, the modal is always rendered at the top level, avoiding the Stacking Context issue.