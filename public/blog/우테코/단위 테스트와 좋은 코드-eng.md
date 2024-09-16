---
title: Tests and Good Code
date: 2023-04-10
tags: ['test', 'unit-test', 'e2e']
image: /images/Pasted%20image%2020240118145052.webp
summary: Summarizes the types of testing, why you should test, and what you gain by testing.
published: true
---

## Types of Tests

![](images/Pasted%20image%2020240118145052.webp)

- Static test: includes TypeScript, eslint, etc.
- Unit test: Tests a specific function (feature). Of course, it's easy to test when the code is written as pure functions. However, not all functions are like that. Sometimes it can be affected by other dependent features. In this case, you can conduct a test along with a dependent function (Sociable), or separate it and test (Solitary) through mocking.
- Integration test: Tests a broader feature than a unit test. I haven't experienced it, so I am not sure about it, but it refers to a broader scope than a unit test and yet is smaller than an overall feature.
- E2E test: Tests from the perspective and environment of an actual user. You can test the overall usability according to the user flow.

## Why Test?

There are two reasons to test. One is that you must make sure that it works well. Of course, the developer can check it by running it one by one. However, it is difficult to remember whether it worked properly each time. And the specific feature can be corrupted by changing other features due to dependency, which is also difficult to quickly check without automated testing. The other one is refactoring. The greatest advantage of testing code is that you can get quick feedback. In other words, you can check if it behaves as you intended while modifying the code.

## Executing Tests Well

What does it mean to execute tests well? If you think about it, would it be possible to say that you test well if you can also test difficult functions (features)? For example, the ability to test asynchronous processing or functions with side effects.

There was a problem in the Uteco Precourse that tested what is output to `console.log` using Jest. Also, when generating random numbers, you had to test `Math.random`. In this case, I mocked to conduct a test, and even separated the test code into functions so it can be reused.

However, executing tests well really means that you have written "good code". When you separate from the external dependency as much as possible and write it as a pure function, testing also becomes very easy. In other words, it is possible to independently confirm the feature without having to mock or test with other features.

## Testing Better

### Distinguish Clearly with Given - When - Then

- Given: Refers to the preparation work before testing. For example, you can create an instance for the method you want to test.
- When: This corresponds to the "cause" in the test description.
- Then: Represents the result of the feature.

### Write Test Descriptions Intuitively

The most intuitive way to express it is to divide it into cause and effect. For example, describe the situation that causes the result and the result itself, such as "if the random value is 4 or above, move forward by 1 square".

### Various Cases

You should consider various cases and test them for a single feature. There are normal cases and exceptional cases. Even in normal cases, you will have "truly normal cases" and "edge cases (both ends)". By creating all of these cases, you can prevent bugs from occurring in advance.

## Strange Shackles

This is an insight that I developed while trying to write pure functions so that testing would be easy. It's a bit recursive. At first, I intended to write in pure functions for testing. However, as I wrote it in pure functions, I realized that testing is definitely necessary. Because the more independent a function is, the more likely it is to be used anywhere. For example, I initially created a function that simply returns true if the random value is 4 or higher (because it moves forward when the random value is 4 or higher).

```jsx
function isRandomOverFour() {
  const randomNumber = Random.generate();
  return randomNumber > 4;
}
```

Here, it is not pure because of the Random value, but separating it gives me the following: (Thinking about it now, I didn't have to separate it into functions.) In the case of the separated function, it can be used not only when checking the advancement condition but also in all cases where numbers are compared. Therefore, since there is room for it to be used globally, I must conduct a test to ensure stability.

```jsx
function isOverNumber(num1, num2) {
  return num1 > num2;
}

isOverNumber(Random.generate(), 4);
```

In the end, I modified the code to test it well, but the code became universally usable, which is why a truly necessary testing constraint was created. I think it is a good recursion.
