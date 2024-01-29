---
title: typescript readonly, protected, private
date: 2023-03-13
tags: ['typescript', 'class']
image: /images/typescript%20readonly,%20protected,%20private-20240128232819282.webp
summary: 타입스크립트 클래스에서 사용되는 키워드를 정리해봤습니다.
published: true
---
## property field

```
class DetailModal extends Component {
  #id: number;
	// ERROR: Property '#id' has no initializer and is not definitely assigned in the constructor.
  constructor(target: HTMLElement) {
    super(target);

    this.subscribe.call(this);
  }

  subscribe() {
    eventBus.subscribe('@close-detail-modal', (restaurant) => {
	    const { id } = restaurant;
	    this.#id = id;
	    this.render(restaurantStore.getItemById(id)).setEvent();
    });
  }
```

**strictPropertyInitialization**

Check for class properties that are declared but not set in the constructor.

(선언되었지만 생성자에서 설정되지 않은 클래스 속성을 확인합니다.)

해당 옵션을 선택하였다면, 필드에서 초기화하거나 constructor내부에서 초기화를 해주어야 합니다. (참고로 프로퍼티를 초기화해주는 메서드를 constructor에서 호출시킨다 하더라도 컴파일 에러가 발생합니다.)

만약 후에 프로퍼티를 선언해주고 싶다면, “!”를 붙이는 방법을 사용하면 됩니다.

```
class DetailModal extends Component {
  #id!: number;
	
  constructor(target: HTMLElement) {
    super(target);

    this.subscribe.call(this);
  }

  subscribe() {
    eventBus.subscribe('@close-detail-modal', (restaurant) => {
	    const { id } = restaurant;
	    this.#id = id;
	    this.render(restaurantStore.getItemById(id)).setEvent();
    });
  }
```

필드에 `#id!: number;` 을 붙임으로써 에러를 피할 수 있습니다.

참고로 readonly 키워드를 사용하면 constructor, field에서만 값을 초기화할 수 있습니다. 즉, 추후에 프로퍼티를 할당할 수 있는 방법이 없습니다.

## readonly, private, public, protected,

클래스의 멤버에 readonly, private, protected 등 prefix를 붙일 수 있다.

### readonly

constructor 밖에서 해당 필드에 선언할 수 없습니다.

```
class Lotto {
  #numbers;

  getNumbers() {
    return new Set([...this.#numbers]);
  }
}

const lotto = new Lotto();
lotto.getNumbers();
```

해당 코드는 로또 미션에서 사용한 JS 코드입니다. getNumbers()를 통해 numbers에 접근은 가능하지만, private으로 두어 numbers를 수정하지 못 하도록 했습니다. 이 코드는 TS에서 readonly를 사용하면 다음과 같이 간단하게 표현할 수 있습니다.

```
class Lotto {
  readonly numbers: number[];
}

const lotto = new Lotto();
lotto.numbers;
```

### protected

protected 멤버는 오직 서브 클래스(**본인 포함**)에서만 사용할 수 있습니다.

```
class Parent {
  protected sayHi(): string {
    return 'parent: HI!'
  }
}

class Child extends Parent {
  greet(): string {
    return this.sayHi() + ' :child';
  }
}

const childInstance = new Child();
childInstance.greet(); //parent: HI! :child

const parentInstance = new Parent();
parentInstance.sayHi(); //ERROR: Property 'sayHi' is protected and only accessible within class 'Parent' and its subclasses.ts(2445)
```

Child 클래스는 Parent 클래스를 상속받습니다. Child클래스 greet()을 선언할 때 Parent가 갖고 있는 protected 멤버에 접근 할 수 있습니다.

그러나, protected로 된 멤버는 인스턴스에서 접근할 수 없습니다.

### private

private는 protected와 같이 인스턴스에서 접근할 수 없다는 점에서 비슷합니다. 그러나 protect는 서브 클래스에서 접근이 가능했지만 private은 서브 클래스에서 조차 접근이 불가능합니다.

```
class Parent {
  private sayHi(): string {
    return 'parent: HI!'
  }
}

class Child extends Parent {
  greet(): string {
    return this.sayHi() + ' :child'; 
// ERROR: Property 'sayHi' is private and only accessible within class 'Parent'.
  }
}
```

그렇다면 javascript private(#)와 typescript의 private 키워드의 차이는 무엇일까요?

1. JS private(#)은 컴파일 이후에도 private이 유지되지만, TS private 키워드는 컴파일 이후에 강제하지 않습니다.
    
2. typescript 키워드를 사용하면, [ ] 대괄호 표기법으로 접근이 가능합니다!
    

```
class Example {
  private privateProperty = 1;
  protected protectedProperty = 2;
  #jsPrivateProperty = 3;
}
 
const example = new Example();
 
example['privateProperty'] //접근 가능, 1
example['protectedProperty'] //접근 가능, 2

example['jsPrivateProperty'] // undefined
```