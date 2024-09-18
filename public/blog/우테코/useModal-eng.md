---
title: Modals, From Common Components to useModal
date: 2023-04-26
tags:
  - hook
  - react
image: /images/미처%20알지%20못했던%20리액트-20240128233029954.webp
summary: This article covers the journey of creating a modal for the first time to extracting it into a hook.
published: true
---

When I first started learning React, creating a modal wasn't easy for me. I spent an entire weekend thinking about and implementing a modal. I'll share the modal I implemented with the help of my crew and my own research.

## The First Modal I Ever Made

The first time I implemented a modal using React, I created it as a single component. It was a component that included all the unique features of the modal, including opening and closing it, as well as the internal components of the modal. The code for everything combined is as follows:

```tsx
interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyupEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keyup', handleKeyupEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keyup', handleKeyupEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <>
      <Backdrop onClick={onClose} />
      <Container>
        <div className="content-header">Header</div>
        <div className="content-body">Content</div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </Container>
    </>
  );
};
```

## Common Components

Then, I learned about common components. But first, before we look at common components, what is a component?

- What is a component?
  The smallest unit that can be configured to perform a specific function
- What is a component in React?
  A block that makes up a UI element

To summarize, common components are small UI blocks that can be used as utilities and can also perform specific functions. Accordingly, modal components can be applied as common components. You can separate a component that has functions common to all modals and use it as a common component.

The component highlighted in yellow can be replaced at any time depending on the situation.

## The Problem of Control (Location of Conditional Rendering)

After creating a common modal component in this way, I wondered whether I should have control over opening and closing the modal myself or whether it should be handled externally. Usually, when you look at libraries, they receive the `open` state and `close` handler as props and use them. This means that conditional rendering is performed within the modal component, not where the modal is used.

If you receive the `open` state as a prop, you can force the state to be open or closed in the usage. On the other hand, if you do not receive the `open` state and have to perform conditional rendering in the usage, it means that no grammatical errors will occur.

So, the completed common component is as follows:

```tsx
export const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const handleKeyupEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeyupEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keyup', handleKeyupEscape);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return isOpen ? (
    <>
      <Backdrop onClick={() => closeModal()} />
      <Container>{children}</Container>
    <>
  ) : null;
};
```

## 4 Custom Hook

Now that I've learned custom hooks, I'm going to extract the modal into a custom hook, as advised by my crew.

By combining the logic that manages the state of the modal and the modal component into a hook, you can create the following code:

```tsx
const useModal = (isShow: boolean) => {
  const [isOpen, setIsOpen] = useState(isShow);

  const openModal = useCallback(() => {
    setIsOpen(() => true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(() => false);
  }, []);

  return {
    Modal: ({ children }: PropsWithChildren) => (
      <Modal isOpen={isOpen} onClose={closeModal}>
        {children}
      </Modal>
    ),
    openModal,
    closeModal,
  };
};
```
