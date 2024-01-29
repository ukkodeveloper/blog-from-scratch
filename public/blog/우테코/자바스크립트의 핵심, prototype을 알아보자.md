---
title: 자바스크립트의 핵심, prototype을 알아보자
date: 2023-02-27
tags: ['javascript', 'prototype']
image: /images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204128083.webp
summary: prototype은 자바스크립트의 본질입니다. 헷갈릴 수 있는 부분을 중점적으로 설명해두었습니다.
published: true
---

## 프로토타입


###  `[[prototype]]` `__**proto__`** `prototype` 모두 다른 것 ?

- `prototype`: 함수와 클래스를 선언할 때 속성 값으로 갖고 있는 객체.
    ![](images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204128083.webp)
    
- `[[Prototype]]` : 프로토타입 참조. 자신의 구현체의 프로퍼티에 대한 참조. 접근할 수 없다.
    
- `__proto__` : 위에 접근할 수 없기 때문에 Object.getPrototype .. ← getter 와 setter 을 실행하기 위한 참조. 프로토타입 체이닝을 통해 object 객체 프로토타입이 갖고 있는 getter와 setter을 사용한다. 즉 인스턴스에서 `[[Prototype]]`로 참조하고 있는 프로토타입 객체
    

###  인스턴스, 상속

프로토타입을 공부하면서 가장 헷갈렸던 부분은 인스턴스을 생성할 때와 상속이 이뤄질 때의 차이이다. 그 차이에 대해서 설명해보겠다.

#### 인스턴스

1. 생성자함수, class 로 선언된 객체를 new키워드와 함께 인스턴드를 만들 수 있다.
2. 빈 객체가 생성되고 this가 바인딩 된다. 생성자 함수(클래스의 constructor)가 실행하면서 빈 객체의 멤버가 새로 할당된다.
3. 만약 인스턴스가 생성자 함수의 prototype(클래스의 메서드) 를 호출하면 `[[Prototype]]` 프로토타입 참조를 통해 프로토타입 객체에 참조하여 해당 메서드를 호출한다. 이를 프로토타입 체이닝이라 한다.

#### 상속

1. 자식 클래스는 부모 클래스를 `[[Prototype]]` 로 참조하고 있다.
2. 자식 클래스의 프로토타입 역시 부모 클래스의 프로토 타입을 `[[Prototype]]` 로 참조하고 있다.
3. 자식 클래스 선언 $#부에서 super을 통해 부모 클래스의 프로포타입에 접근할 수 있다.

![](images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204203797.webp)

### prototype 참조 변경

생성자 함수는 prototype 프러퍼티를 통해 constructor을 참조하고, prototype 객체는 constructor 프로퍼티를 통해 해당 객체를 참조하고 있다.

만약 생성자 함수의 prototype이 다른 객체를 바라보게 한다면 어떻게 될까?

```jsx
const common = {
	isBrave: true,
  isSmart: true,
	isGood: true,
};

function Crew(name) {
  this.name = name;
}

Crew.prototype = common;

const ukko = new Crew('ukko');

console.log(ukko.name) //ukko * ukko 인스턴스 객체의 프로퍼티로 갖고 있다.
console.log(ukko.isBrave) //  ** ukko의 프로토타입인 common객체의 isBrave값을 반환한다.
console.log(ukko.isGood) //  ** ukko의 프로토타입인 common객체의 isGood값을 반환한다.
```

위의 코드를 순서대로 풀어서 쓰자면…

1. Crew 함수를 선언하였고 당연히 Crew는 prototype 참조를 통해 prototype object에 접근할 수 있다.
2. Crew.prototype 참조를 변경함으로써 선언시에 만들었던 prototype object에 접근할 수 없게 되었다.
3. Crew 생성자 함수의 인스턴스를 생성한다.
4. 그 과정에서 Crew함수를 실행하면서 새로운 객체가 생성되고 `this.name = ‘ukko’` 가 저장된다.
5. 여기에서 ukko.name을 실행하면 ukko인스턴스에 있는 name 값을 반환한다.
6. 여기에서 ukko.isGood을 실행하면 prototype체이닝을 통해 common.isGood 값을 반환한다.

![](images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204223470.webp)

### instanceOf

instanceOf는 프로토타입 체이닝을 통해 확인한다.

```jsx
instanceA instanceof ObjA
```

이 코드는 instanceA가 프로토타입 체이닝을 통해 ObjA가 참조하고 있는 프로토타입을 찾는 과정이다.
![](images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204235217.webp)