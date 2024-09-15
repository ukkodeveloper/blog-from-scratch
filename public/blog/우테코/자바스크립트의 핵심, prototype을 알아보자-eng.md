---
title: JavaScript's Essential Feature, Understanding Prototypes
date: 2023-02-27
tags:
  - javascript
  - prototype
image: /images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204128083.webp
summary: We learned about prototypes, a fundamental aspect of JavaScript. We will focus on the confusing parts.
published: true
---

## Prototypes

### Are `[[prototype]]`, `__proto__`, and `prototype` all different?

- `prototype`: An object with property values that functions and classes have when they are being declared.
  ![](images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204128083.webp)
- `[[Prototype]]`: A prototype reference. This is a reference to the properties of its own implementation. It cannot be accessed.
- `__proto__`: A reference used to execute Object.getPrototype... ← getters and setters because the above is inaccessible. It uses the getters and setters that the object object's prototype has through prototype chaining. In other words, it is the prototype object that the instance references with `[[Prototype]]`.

### Instances, Inheritance

The most confusing part of studying prototypes is the difference between when an instance is generated and when inheritance occurs. Let's explain the difference.

- Instance

  - Objects declared with constructor functions or classes can have instances created with the new keyword.
  - An empty object is generated, and this is bound. The members of the empty object are newly allocated as the constructor function (constructor of the class) is executed.
  - If an instance calls the prototype (method of the class) of the constructor function, it calls the corresponding method by referencing the prototype object via the `[[Prototype]]` prototype reference. This is known as prototype chaining.

- Inheritance
  - The child class references the parent class as `[[Prototype]]`.
  - The prototype of the child class also references the prototype of the parent class as `[[Prototype]]`.
  - The parent class's prototype can be accessed via super in the child class declaration.

![](images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204203797.webp)

### Change prototype Reference

Constructor functions reference constructors through the prototype property, and prototype objects reference those objects through the constructor property.

What happens if the prototype of the constructor function points to another object?

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

console.log(ukko.name); //ukko * As a property of the ukko instance object
console.log(ukko.isBrave); //  ** Returns the isBrave value of the common object, the prototype of ukko.
console.log(ukko.isGood); //  ** Returns the isGood value of the common object, the prototype of ukko.
```

Let's break down the above code in order...

1. We declared the Crew function, and of course, Crew can access the prototype object through the prototype reference.
2. We changed the Crew.prototype reference, making the prototype object we created at the time of declaration inaccessible.
3. An instance of the Crew constructor function is generated.
4. In the process, the Crew function is executed, a new object is generated, and `this.name = ‘ukko’` is saved.
5. When ukko.name is executed here, it returns the name value in the ukko instance.
6. When ukko.isGood is executed here, the common.isGood value is returned through prototype chaining.

![](images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204223470.webp)

### instanceOf

instanceOf checks through prototype chaining.

```jsx
instanceA instanceof ObjA;
```

This code is a process where instanceA finds the prototype that ObjA is referencing through prototype chaining.
![](images/자바스크립트의%20핵심,%20prototype을%20알아보자-20240128204235217.webp)
