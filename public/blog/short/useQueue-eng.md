---
title: useQueue
date: 2024-09-03
tags:
  - tanstackQuery
  - react
image: /images/useQueue-20241003131109212.webp
summary: Handling promise sequentially with useQueue hook
published: true
---

Recently, we had a situation where we needed to call an upscale api sequentially when uploading images on a single screen. In other words, we were not allowed to call the api simultaneously.

There were a few concerns at this point. The async queue should not be affected by re-rendering. Also, since we need to modify or delete the image state, we should be able to abort the asynchronous processing at any time. This problem could not be solved by simply making the code 'looping'.

## useQueue

With this background, we designed a custom hook called `useQueue`. The core idea of this hook is simple: to separate asynchronous task management from the state management system of React.

To do this, we utilized `useSyncExternalStore` introduced in React 18. This hook allows us to safely subscribe to state that lives outside React. This allows us to fully decouple the state of the queue from the rendering cycle of React.

```typescript
export interface Queue<TTask, TResult> {
  states: Array<QueueState<TTask, TResult>>;
  add(task: TTask): void;
  remove(id: string): void;
}

export type QueueState<TTask, TResult> =
  | {
      id: string;
      status: 'IDLE' | 'IN_PROGRESS';
      task: TTask;
      controller: AbortController;
    }
  | {
      id: string;
      status: 'SUCCESS';
      task: TTask;
      result: TResult;
      controller: AbortController;
    }
  | {
      id: string;
      status: 'ERROR';
      task: TTask;
      error: unknown;
      controller: AbortController;
    };
```

This interface clearly separates the status of a task, allowing you to add and delete tasks, and manage the current status of each task.

## QueueManager

The core of `useQueue` is a class called `QueueManager`. This class takes the following roles:

1. Manages the state of the queue independently
2. Notifies subscribers of state changes
3. Provides a snapshot of the current state

The basic structure of `QueueManager` is as follows:

```typescript
class QueueManager<TTask, TResult> {
  private states: Array<QueueState<TTask, TResult>> = [];
  private listeners = new Set<() => void>();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot() {
    return this.states;
  }

  add(task: TTask) {}

  remove(id: string) {}

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}
```

Thanks to this structure, we can operate the queue independently of the React's state management system.

## Conclusion

The biggest lesson we learned in this project was the 'beauty of separation'. By separating UI logic and business logic, we were able to create a more stable and maintainable system.

This is not just a technical issue. It is also a philosophical question about how to approach and solve complex problems. We wanted to go a step beyond creating code that works right now, and create a solution that would be appropriate for maintenance even after time passes.