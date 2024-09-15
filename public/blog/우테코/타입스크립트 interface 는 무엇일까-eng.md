---
title: What is an Interface in TypeScript?
date: 2023-03-27
tags: ['typescript', 'interface']
image: /images/타입스크립트%20interface%20는%20무엇일까-20240128233001113.webp
summary: A short overview of interfaces in TypeScript.
published: true
---

## What is TypeScript?

Personally, the most annoying thing about using JavaScript is runtime errors. I've encountered the `Cannot read properties of undefined` error countless times. Fortunately, these errors can be somewhat mitigated with TypeScript.

TypeScript checks whether methods are callable on that type beforehand, during the compilation phase. Since static type checking is done, it throws compile errors when an incompatible usage is detected.

TypeScript is certainly not perfect and cannot completely prevent errors upfront. However, it does offer the considerable advantage of curbing the "too much freedom" that led to issues in JavaScript in the first place. Also, it greatly enhances the stability of your work, as bugs that would only have been discovered at runtime can now be found during the compilation phase.

## Interface

Interfaces are most commonly used to specify the type of an object. According to the official documentation, they are designed to be compatible as long as they have the same internal structure. In this case, the type can be specified without the `implements` keyword.

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

### Basic Syntax

1️⃣ Optional

```
interface Crew {
	course: 'FE' | 'BE' | 'AN';
	nickname: string;

	age?: number;
}
```

Properties can be made optional, which means they can be present or absent, by appending `?`. Optionality creates a union type between the stated type and `undefined` for that property.

2️⃣ Readonly

```
interface Crew {
	readonly course: 'FE' | 'BE' | 'AN;
	nickname: string;

	age?: number
}
```

As the name suggests, readonly means it can be accessed but not modified. It is used when a property's value should not be changed.

3️⃣ Extends, Merge

The main difference between extends and merge is whether the original is maintained. Extends creates a new interface by appending to the original interface. On the other hand, merge modifies the original type by adding additional properties to it. In the latter case, merge is often used to add properties to types of imported packages or libraries. However, this is a special case and, in general, merge should be avoided.

### Type Alias vs Interface

Before comparing type aliases and interfaces, there's one thing to be clear about. Only primitive types and union types can be type aliases. Therefore, the only valid comparison between type aliases and interfaces is by restricting it to "objects" (including functions).

In the past, interfaces were preferred when specifying the type of objects because type aliases and interfaces showed different error messages for object types prior to TypeScript 4.2. Since interfaces provided more detailed error messages than type aliases, they were used more often.

However, recent versions have improved the error messages for type aliases, making it clear which properties are not followed. Additionally, when specifying the type of a function, type aliases are more intuitive than interfaces because an interface declaration requires curly braces, while a type alias can be declared in a single line using the `=` notation. Furthermore, type aliases are friendlier to IDEs when understanding the internal structure of a type. To view the internal structure of an interface in an IDE, you have to press the `cmd` key in VScode or navigate to its implementation in Webstorm. This has led to a significant increase in preference for type aliases.

### Structural Type System

However, the type alias vs interface debate may have to be revisited with future improvements to IDEs. That is, rather than delving deep into this debate, it might be more worthwhile to understand TypeScript's perspective on types.

TypeScript has a structural type system. This means that any objects are considered to be of the same type if they have the same structure.

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

We have declared a `sendEmailTo` method that takes a `Crew` type as an argument. What if we pass the `ukko` and `jejuDullegil` variables as arguments to it?

Both (1) and (2) do not cause errors. You might notice that `(2)` has the `jejuDullegil` which clearly does not represent a crew. However, it can be passed as an argument to the method that sends emails to crews because TypeScript follows the structural type system. In other words, as long as an object has the `course` and `nickname` properties and follows the primitive types correctly, it is treated as the same type.

### Freshness

However, there is an exception that does not follow the structural type system: when it is written directly as an object literal. Human error is more likely to occur when using object literals. It can also lead to misconceptions about the type. Therefore, for object literals, errors are thrown unless they follow the exact type structure. In other words, they are checked more strictly.

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

(1) does not throw an error, but (2) does. This is because of the additional `age` property. If you want to allow extra properties in object literals, look into the `suppressExcessPropertyErrors` setting.

### Interface as Abstract Objects

Interfaces can be used as types for objects, but they can also be used as types for classes using the `implements` keyword. That is, interfaces can be used when you want to define requirements and declare a class that follows them.

However, there is an inconvenience when using interfaces. All the properties that match the specific interface must be written in every implementation that implements that interface. In other words, overriding is not possible like in classes. Therefore, if there are methods that do not need to be declared repeatedly during the abstraction process, consider using an `abstract class`.

Abstract classes use the `abstract` keyword. Then, add the `abstract` keyword before the identifier for the properties that you want to implement directly in the class that inherits from that class. If you want to use the parent's method as it is without implementing it, you can use it as you would inherit a regular class.
