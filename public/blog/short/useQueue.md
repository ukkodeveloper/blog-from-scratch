---
title: useQueue
date: 2024-09-03
tags:
  - tanstackQuery
  - react
image: images/useQueue-20241003131109212.webp
summary: useQueue 훅을 통해 순차적으로 promise를 처리하기
published: true
---
최근, 한 화면에서 이미지를 업로드할 때 순차적으로 upscale api를 호출해야하는 경우가 있었다. 즉, 동시에 api호출을 하면 안되었던 상황이었다. 이 때 우려되었던 점들이 있다. aync queue가 리렌더링에 영향을 받지 않아야 한다. 또한 이미지 상태를 수정, 삭제를 해야하기 때문에 언제든 비동기 처리를 중단할 수 있어야 한다. 이 문제들은 단순히 코드를 '돌아가게' 만드는 것으로는 해결할 수 없었다. 

## useQueue

이런 배경에서 우리는 `useQueue`라는 커스텀 훅을 설계했다. 이 훅의 핵심 아이디어는 간단하다: React의 상태 관리 시스템에서 비동기 작업 관리를 분리하는 것이다.

이를 위해 우리는 React 18에서 도입된 `useSyncExternalStore`를 활용했다. 이 훅은 React의 외부에 있는 상태를 안전하게 구독할 수 있게 해준다. 이를 통해 우리는 큐의 상태를 React의 리렌더링 주기와 완전히 분리할 수 있었다.


```typescript
export interface Queue<TTask, TResult> {
  states: Array<QueueState<TTask, TResult>>;
  add(task: TTask): void;
  remove(id: string): void;
}

export type QueueState<TTask, TResult> =
  | { id: string; status: 'IDLE' | 'IN_PROGRESS'; task: TTask; controller: AbortController }
  | { id: string; status: 'SUCCESS'; task: TTask; result: TResult; controller: AbortController }
  | { id: string; status: 'ERROR'; task: TTask; error: unknown; controller: AbortController };
```

이 인터페이스는 작업의 상태를 명확하게 구분하고, 작업의 추가와 삭제, 그리고 각 작업의 현재 상태를 관리할 수 있게 해준다.

## QueueManager

`useQueue`의 핵심은 `QueueManager`라는 클래스다. 이 클래스는 다음과 같은 역할을 한다:

1. 큐의 상태를 독립적으로 관리한다.
2. 상태 변화를 구독자에게 알린다.
3. 현재 상태의 스냅샷을 제공한다.

`QueueManager`의 기본 구조는 다음과 같다:

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

  add(task: TTask) {
 
  }

  remove(id: string) {
 
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}
```

이 구조 덕분에 우리는 React의 상태 관리 시스템과 독립적으로 큐를 운영할 수 있게 되었다.

## 끝으로

이번 프로젝트에서 우리가 얻은 가장 큰 교훈은 '분리의 미학'이다. UI 로직과 비즈니스 로직을 분리함으로써 우리는 더 안정적이고 유지보수가 쉬운 시스템을 만들 수 있었다.

이는 단순히 기술적인 문제가 아니다. 이는 복잡한 문제를 어떻게 접근하고 해결할 것인가에 대한 철학적 질문이기도 하다. 우리는 당장 돌아가는 코드를 만드는 것에서 한 걸음 더 나아가, 시간이 지나도 유지보수에 적절한 해결책을 만들고자 했다.