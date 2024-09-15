---
title: typescript readonly, protected, private
date: 2023-03-13
tags: ['typescript', 'class']
image: /images/typescript%20readonly,%20protected,%20private-20240128232819282.webp
summary: A summary of the keywords used in typescript classes.
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

### strictPropertyInitialization

Check for class properties that are declared but not set in the constructor.

If this option is selected, we should initialize the field or make the initialization inside the constructor. (Note that you get a compilation error even if you call a method which initializes the property in the constructor.)

If we want to declare the property later, we can use a hack with "!".

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

We can avoid the error by writing #id!: number; in the field.

Note that if we use the readonly keyword, we can only initialize in the constructor or in the field. Also, there is no way to assign any further to the property.

## readonly, private, public, protected,

We can prefix the members of a class with readonly, private, protected, etc.

### readonly

We cannot declare elsewhere outside of the constructor.

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

This is the JS code used in the lotto mission. We can access numbers via getNumbers(), but we made it so that we cannot modify numbers since we set it to private. We can express this simply in TS using readonly:

```
class Lotto {
  readonly numbers: number[];
}

const lotto = new Lotto();
lotto.numbers;
```

### protected

Protected members can only be used in subclasses (including the class itself).

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

The Child class inherits from the Parent class. When greet() is declared in the Child class, we can access the protected member of the Parent class.

However, we cannot access the protected member from an instance.

### private

Private is similar to protected in that we cannot access it from an instance. However, while protected can be accessed in subclasses, private cannot even be accessed in subclasses.

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

Then what is the difference between the private (#) of javascript and the private keyword of typescript?

1. JS private (#) remains private even after compilation, but TS private keyword does not enforce this after compilation.
    
2. Using typescript keyword, we can access it with [ ] bracket notation!
    

```
class Example {
  private privateProperty = 1;
  protected protectedProperty = 2;
  #jsPrivateProperty = 3;
}
 
const example = new Example();
 
example['privateProperty'] //accessible, 1
example['protectedProperty'] //accessible, 2

example['jsPrivateProperty'] // undefined
```