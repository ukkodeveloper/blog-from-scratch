---
title: 타입스크립트 interface 는 무엇일까
date: 2023-03-27
tags: ['typescript', 'interface']
image: /images/타입스크립트%20interface%20는%20무엇일까-20240128233001113.webp
summary: 타입스크립트의 interface에 대해 간략히 설명해 놓은 글입니다.
published: true
---

## 타입스크립트란?

개인적으로 자바스크립트를 사용하면서 가장 까다로웠던 것이 런타임에서 에러가 발생한다는 점입니다. 특히 `Cannot read properties of undefined` 에러를 정말 많이 겪었습니다. 이런 에러는 타입스크립트에서 어느정도 해소가 가능합니다.

타입스크립트는 컴파일 단계에서 해당 타입에서 메서드가 callable 한 지 사전에 확인합니다. 또한 정적으로 타입을 체크하기 때문에 타입에 맞지 않는 사용을 할 시에 컴파일 에러를 발생시킵니다.

타입스크립트는 분명 완벽하고 완전하게 에러를 사전에 차단할 수 있는 건 아닙니다. 그럼에도 자바스크립트에서 문제가 되었던 “너무 자유로움”을 억제할 수 있다는 점에서 큰 장점입니다. 또한 런타임에 발견될 버그를 컴파일 단계에서 발견할 수 있다는 것은 작업 안정성에도 큰 도움이 됩니다.

## Interface

interface는 보통 객체의 타입을 지정할 때 많이 사용합니다. 공식 문서에 따르면 내부 구조가 같다면 호환 가능하도록 설계되어 있습니다. 이 경우 굳이 implements 키워드를 사용하지 않고도 타입을 지정할 수 있습니다.

```
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.textContent = greeter(user);
```

### 기초 문법

1️⃣ optional

```
interface Crew {
	course: 'FE' | 'BE' | 'AN';
	nickname: string;

	age?: number;
}
```

구조상 있어도 되고 없어도 된다면 `?` 을 붙여 해당 프로퍼티를 optional로 만들 수 있습니다. optional은 해당 프로퍼티의 타입을 `명시된 타입`과 `undefined` 의 유니온 타입으로 만듭니다.

2️⃣ readonly

```
interface Crew {
	readonly course: 'FE' | 'BE' | 'AN;
	nickname: string;

	age?: number
}
```

readonly는 말 그대로 읽을 수 만 있다는 의미입니다. 접근은 가능하지만 프로퍼티 값을 수정할 수 없을 때 사용하면 됩니다.

3️⃣ extends, merge

extends 와 merge의 가장 큰 차이점은 원본이 유지되는가 입니다. extends는 원본 interface에 덧붙여서 새로운 interface를 만듭니다. 반면에 merge는 해당 타입에 추가 프로퍼티를 덧붙이는 방식으로 원본이 변경됩니다. merge 같은 경우는 패키지나 라이브러리를 불러올 때 타입에 프로퍼티를 추가하기 위해 사용되곤 합니다. 하지만 이는 특수한 경우이고, 일반적인 상황에서는 merge 사용을 지양해야 합니다.

### Type Alias vs Interface

type alias과 interface를 비교하기 전에 한 가지 확실히 해둘 것이 있습니다. type alias만 원시 타입과 유니온 타입이 가능합니다. 즉, type alias와 interface를 비교하는 것은 오로지 “객체”(함수 포함)에 제한해서 생각해야 합니다.

과거에는 객체의 타입을 지정할 때 interface를 선호했습니다. 왜냐하면 타입스크립트 4.2버전 이전에는 객체 타입에 대한 에러 메세지가 두 경우 달랐기 때문입니다. type alias 보다 interface를 사용했을 때 에러 메세지가 더 자세하였기 때문에 interface를 많이 사용했습니다.

하지만 최근 버전에서는 type alias도 어떤 프로퍼티가 지켜지지 않았는지 에러 메세지가 확실해졌습니다. 또한 함수의 타입을 지정할 때는 interface 보다 type alias가 더 직관적입니다. 왜냐하면 interface 선언에는 중괄호가 반드시 필요하지만 type alias `=`표기로 한 줄로 표기가 가능하기 때문입니다. 또한 IDE에서 타입의 내부구조를 파악할 때 type alias가 더 친절합니다. interface의 내부 구조를 IDE에서 확인하려면, VScode의 경우 cmd 키를 눌러야만 하고, Web storm의 경우 해당 구현부로 이동해야만 가능합니다. 따라서 type alias에 대한 선호가 많이 증가했습니다.

### Structural Type System

하지만 type alias vs interface 논쟁은 추후 IDE가 개선된 다음 또 다른 이야기를 드려야할 수도 있을 것입니다. 즉, 우리는 이 논쟁에 깊게 참여하는 것보다 타입스크립트가 타입을 바라보는 관점을 파악하는 것이 더 필요할 것입니다.

타입스크립트는 구조적 타입 시스템을 갖고 있습니다. 즉 구조만 같다면 어떤 객체여도 같은 타입으로 보겠다는 뜻입니다.

```
interface Crew {
  course: string;
  nickname: string;
}

const sendEmailTo = (crew: Crew): void => { //send... }

const ukko = {course: 'FE', nickname: 'ukko', age: 20};
const jejuDullegil = {course: '10km', nickname: 'windy-islnad'}

sendEmailTo(ukko); //(1)
sendEmailTo(jejuDullegil) //(2)
```

다음과 같이 우테코 크루 타입을 인자로 받는 `sendEmailTo` 메서드를 선언했습니다. 그리고 ukko와 jejuDullegil 변수를 해당 인자로 넘겨준다면 에러가 발생할까요?

정답은 (1) 과 (2) 모두 에러를 발생시키지 않습니다. (2)를 잘 보셔야 합니다. `제주 둘레길`이 분명 크루를 나타내는 것이 아님을 눈치 채셨을 겁니다. 그럼에도 크루들에게 메일 보내는 메서드의 인자로서 제주 둘레길이 넘겨질 수 있는 것은 타입스크립트가 구조적 타입 시스템을 따르기 때문입니다. 즉, course와 nickname 프로퍼티가 있고, 해당 원시 타입을 잘 지켰다면 같은 타입으로 취급한다는 것입니다.

### freshness

하지만 구조적 타입 시스템을 따르지 않는 예외사항이 있습니다. 객체 리터럴로 바로 작성될 때입니다. 객체 리터럴로 작성될 경우 휴먼 에러이 발생할 확률이 높습니다. 또한 해당 타입에 대한 오해를 불러일으키기 쉽상입니다. 따라서 객체 리터럴의 경우는 정확한 타입 구조를 지키지 않는 한 에러를 발생시킵니다. 즉, 더 엄격하게 검사합니다.

```
const sendEmailTo = (crew: Crew): void => {
  //send...
}

const ukko = {
  course: 'FE',
  nickname: 'ukko',
  age: 20
}

sendEmailTo(ukko) // (1)

sendEmailTo({
  course: 'FE',
  nickname: 'ukko',
  age: 20
}); //(2)
```

(1)에서는 에러를 발생시키지 않지만, (2)는 에러를 발생시킵니다. age라는 추가 프로퍼티가 존재하기 때문입니다. 만약 객체 리터럴이 지닌 초과 프로퍼티를 허용하고 싶다면 `suppressExcessPropertyErrors` 설정을 찾아보시길 바랍니다.

### 추상 객체로서 interface

interface를 객체의 타입으로 사용할 수도 있지만 `implements` 키워드를 사용하여 클래스의 타입처럼 사용할 수 있습니다. 즉, iterface는 요구사항을 제시하고 이를 지키는 클래스를 선언하고 싶을 때 사용할 수 있습니다.

하지만 interface를 사용하면 불편한 점이 있습니다. 특정 interface를 구현하는 모든 구현체에서 요구사항에 맞는 프로퍼티를 모두 작성해주어야합니다. 즉, 클래스에서처럼 오버라이딩이 가능하지 않습니다. 따라서 추상화 과정에서 굳이 반복하여 선언할 필요가 없는 메서드가 있다면, `추상 클래스`를 이용해보세요.

추상 클래스는 `abstract` 키워드를 사용합니다. 그리고 해당 클래스를 상속 받는 클래스에서 직접 구현하기 원하는 프로퍼티의 경우 식별자 앞에 `abstract` 키워드를 추가로 붙입니다. 만약 굳이 구현할 필요 없이 부모의 것을 그대로 사용하고 싶다면 기존 클래스 상속 받듯이 사용하면 됩니다.
