---
title: CSS Stacking Context와 CreatePortal
date: 2024-08-24
tags:
  - css
image: /images/CSS%20Stacking%20Context와%20CreatePortal-20241003131047338.webp
summary: stacking context 설명과 내가 만난 문제점
published: true
---

웹 개발에서 요소의 겹침 순서를 다루는 일은 생각보다 복잡하다. 단순히 z-index 값을 높게 주면 해결될 것 같지만, 실상은 그렇지 않다. 이는 CSS의 Stacking Context라는 개념 때문이다.

Stacking Context는 요소들이 화면에서 쌓이는 방식을 결정하는 3차원 개념 모델이다. 이는 마치 책상 위에 종이를 쌓는 것과 비슷하다. 하지만 여기서 각 종이 더미는 독립적인 Stacking Context를 형성할 수 있고, 이는 전체 구조를 복잡하게 만든다.

## Stacking Context

Stacking Context는 특정 조건에서 생성된다.

- **문서의 루트 요소 (`<html>`)**
    - 모든 웹 페이지의 기본 Stacking Context이다. 다른 모든 요소들은 이 Context 내에서 쌓인다.
- **position 값이 absolute나 relative이며 z-index가 auto가 아닌 요소**
    - 이 조건은 요소를 일반적인 문서 흐름에서 분리시키고, 새로운 Stacking Context를 형성한다.
    - 예: `position: absolute; z-index: 1;`가 적용된 div는 새로운 Stacking Context를 생성한다.
- **position 값이 fixed나 sticky인 요소**
    - fixed 포지셔닝은 요소를 뷰포트에 고정시키며, 항상 새로운 Stacking Context를 생성한다.
    - sticky 포지셔닝은 스크롤 위치에 따라 동작이 달라지지만, 역시 새로운 Context를 형성한다.
    - 예: 페이지 상단에 고정된 헤더나, 스크롤에 따라 움직이는 사이드바 등이 이에 해당한다.
- **flexbox나 grid의 자식 요소 중 z-index가 auto가 아닌 요소**
    - 이는 flexbox나 grid 레이아웃 내에서 특정 요소의 쌓임 순서를 제어할 때 유용하다.
    - 예: `display: flex;`인 컨테이너 내의 자식 요소에 `z-index: 1;`을 적용하면 새로운 Context가 생성된다.
- **opacity 값이 1 미만인 요소**
    - 투명도가 적용된 요소는 자동으로 새로운 Stacking Context를 형성한다.
    - 이는 반투명 요소와 그 자식 요소들을 하나의 단위로 렌더링하기 위함이다.
    - 예: `opacity: 0.9;`가 적용된 div는 새로운 Context를 생성한다.
- **transform, filter, perspective, clip-path, mask, mix-blend-mode, isolation 등의 속성이 none이 아닌 요소**
    - 이러한 CSS3 속성들은 요소의 렌더링 방식을 크게 변경하므로, 새로운 Stacking Context를 필요로 한다.
    - 예: `transform: rotate(45deg);`나 `filter: blur(5px);`가 적용된 요소는 새로운 Context를 형성한다.

이러한 조건들은 각각 독립적인 Context를 만든다. 

## createPortal

React의 createPortal은 이러한 복잡성을 더한다. createPortal은 컴포넌트를 DOM 트리의 다른 부분에 렌더링할 수 있게 해주는 강력한 도구다. 쉽게 말해, 컴포넌트를 DOM 트리의 다른 '가지'에 옮겨 심는 것과 같다. 하지만 이는 새로운 Stacking Context를 생성할 수 있고, 이는 z-index 관리를 더욱 어렵게 만든다.

예를 들어, 모달을 createPortal로 렌더링할 때 다음과 같은 코드를 흔히 볼 수 있다:

```jsx
ReactDOM.createPortal(
  <div className="modal" style={{ zIndex: 9999 }}>
    모달 내용
  </div>,
  document.body
);
```

이 코드는 언뜻 보기에 문제가 없어 보인다. 하지만 만약 body 요소가 이미 다른 Stacking Context 안에 있다면, 이 모달은 예상과 다르게 동작할 수 있다.

이 문제를 해결하기 위해서는 다음과 같은 접근이 필요하다:

```jsx
// App.js
import React from 'react';
import Modal from './Modal';

const App = () => {
  return (
    <div className="app">
      {/* 다른 컴포넌트들 */}
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

이 방식에서는 모달을 렌더링할 전용 컨테이너를 App 컴포넌트 내에 만들고, 그 컨테이너로 모달을 포털링한다. 이렇게 하면 모달이 항상 최상위 레벨에서 렌더링되어 Stacking Context 문제를 피할 수 있다.
