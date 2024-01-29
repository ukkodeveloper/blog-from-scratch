---
title: 모달, 공통 컴포넌트부터 useModal까지
date: 2023-04-26
tags: ['hook', '리액트']
image: images/미처%20알지%20못했던%20리액트-20240128233029954.webp
summary: 처음 모달을 만들었을 때부터, 이를 훅으로 분리하기 까지 여정을 담았습니다.
published: true
---
리액트를 처음 공부하는 저로서는 모달을 만드는 것조차 쉽지 않았는데요. 주말에 모달만 하루종일 고민하고 구현할 정도였습니다. 크루들의 도움도 받고 스스로 찾아보기도 하면서 적용한 모달에 대해 공유하려 합니다.

##  처음 만든 모달

처음 리액트를 사용하여 모달을 구현했을 때 단 하나의 컴포넌트로 만들었습니다. 모달의 고유한 기능인 열고 닫기를 비롯하여 모달 내부 구성 요소들까지 모두 포함되어 있는 컴포넌트였습니다. 모든 것이 합쳐진 코드는 다음과 같습니다.

```
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
        <div className="content-header">헤더</div>
        <div className="content-body">내용</div>
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </Container>
    </>
  );
};
```

##  공통 컴포넌트

그러던 중 공통 컴포넌트에 대해 알게되었습니다. 우선 공통 컴포넌트를 알아보기 전에 컴포넌트란 무엇일까요?

- 컴포넌트란?
    
    특정한 기능을 수행할 수 있도록 구성한 가장 작은 단위
    
- 리액트에서 컴포넌트란?
    
    UI 요소를 구성하는 하나의 블록
    

정리해서 생각해보면, 공통 컴포넌트는 util적으로 사용할 수 있는 UI 작은 블록이며, 특정한 기능을 수행할 수도 있습니다. 이에 따르면 모달 컴포넌트가 공통 컴포넌트로 적용할 수 있습니다. 모든 모달이 공통적으로 갖는 기능을 갖는 컴포넌트를 분리하여 공통 컴포넌트로 사용할 수 있습니다.

노란색으로 색칠된 컴포넌트는 상황에따라 언제 든지 갈아끼울 수 있게 되는 것입니다.

##  제어의 문제 (조건부 렌더링 위치)

이렇게 공용으로 모달 컴포넌트를 만들고 나니, 모달이 열리고 닫는 것에 대한 제어권을 스스로 가져야할지 아니면 밖에서 가져야할지 고민이 되었습니다. 보통 라이브러리들을 보면 `open` 상태와 `close` 핸들러를 props로 받아서 사용하는데요. 이는 곧 모달을 사용하는 곳에서 모달을 조건부 렌더링을 하는 것이 아니라 모달 컴포넌트 내부에서 조건부 렌더링한다는 말입니다.

props로 `open` 상태를 받으면, 사용처에서 열리고 닫혀 있는 상태를 강제할 수 있습니다. 그에 반해 `open` 상태를 받지 않고 사용처에서 조건부 렌더링해줘야하는 경우는 어떠한 문법적 에러가 발생하지 않는다는 것입니다.

그래서 완성된 공용 컴포넌트는 다음과 같습니다.

```
export const  Modal= ({ isOpen, closeModal, children }: ModalProps) => {
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

## 4️⃣ custom hook

custom hook을 배웠으니 크루의 조언에 따라 모달을 custom hook으로 빼어내려고 합니다.

모달의 상태를 관리하는 로직과 모달 컴포넌트를 hook으로 묶으면 다음과 같은 코드를 만들 수 있습니다.


```
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