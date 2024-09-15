---
title: Elegant Tech Course Pre-Course Review
date: 2022-12-20
tags: ['우아한테크코스']
image: /images/우아한테크코스%20프리코스%20회고-20240128231919444.webp
summary: I have taken many tests in my life, but I think this is the first time I have received such a warm message before starting the test.
published: true
---

## Message from the Utech Operating Group

I have taken many tests in my life, but I think this is the first time I have received such a warm message before starting the test.

> "It's okay to create working trash rather than a program that doesn't work." "Thank you for your hard work and I hope you get plenty of rest after the final coding test."

I was very nervous after the test list was announced on Wednesday. Thanks to this message, I was able to put my mind at ease and think of it as a fifth mission rather than a test. It felt like I was the master of this program and I was naturally less nervous as I thought about coding for fun.

The warm message was great, but something else kept going through my mind after the test.

_**“Think of this final coding test, which lies on the boundary between the ideal and the real, as another educational opportunity to enjoy.”**_

Before taking the test, I thought of this mission as a test for selection and it seemed like a very special environment. Implementing a mission within 5 hours is **very restrictive** when compared to the environment in which I have been doing the mission so far.

However, I thought, "Isn't it the implementation of a mission over a week that is more special?" I thought that solving the mission within 5 hours is more common. Assuming that in the field, we will constantly be in a situation where we have to quickly meet requirements within a given time frame, this final test is likely to be a more common environment and be closer to the actual working environment. In other words, I began to think that the environment in which I was studying was not an ideal situation.

Thinking about it this way, I felt the need to give more thought to the parts where I was unable to perform properly and where I wandered within 5 hours. Vaguely known things, that is, things that I haven't thought about carefully, cannot be applied appropriately within a limited time.

## What we cannot use well, we have not thought about it enough

### Object-oriented - Encapsulation

In object orientation, all objects must follow encapsulation and encapsulation. This is because it enables isolation from changes and allows clear assignment of responsibilities to each object. However, an appropriate way to do this is not coming to mind.

```jsx
// This is the code I wrote.

class Coach {
  #name;

  getName() {
    return this.#name;
  }
}
```

It's this getName method. The properties of the object should be hidden, but the getName() method returns its own properties as they are without any abstraction. It seems like code that shows the gap between the ideal and the real well.

In fact, I also encountered this problem when solving the Lotto game (2nd mission). I created both WinningNumber and Lotto as objects. The problem here is that in order to check whether something has won, you have to know all of each other's properties. I don't think I was able to properly solve the problem of breaking the encapsulation here.

### Object reference

The model had a list of Coach objects as a property. Then, after passing it onto the Controller, it could take each of them out of the array and create the logic asking "What is (Coach name) allergic to?" in the InputView. I spent a lot of time writing code without properly recognizing this problem.

Taking elements out of the list owned by the model in the Controller means the element is being removed from the model because they are referencing the same memory address. In other words, if you enter foods that each coach is allergic to and save it to the model, the strange phenomenon of all the coaches saved in the model disappearing occurs. (It's really funny 😂)

I definitely studied value context and reference context after finishing the pre-course. I also understood that when receiving an object as an argument in functional programming instead of a value, I should always use a copy. However, I don't think I have properly considered when to send a copy instead of a reference in object orientation. I think I have implicitly considered object orientation as always having to have a reference as if it were like a formula. (Additionally, I remembered that I copied the value with the spread operator, but the property value of the object in the array is still being referenced. It doesn't seem like it was fully conveyed as a value itself.)

In my case, this was solved by passing a copy of the Coach list, but thinking about it the other way, it also makes me think that the problem could be solved by keeping a reference and using a different method instead of taking the list one by one in the Controller. I think this also needs to be considered.

###  Test code

I think many of you who took the test will agree with this part. (Or was it just me?... Nah, right?)

A: "The categories and foods are duplicated, so they don't appear, and it seems to be printed cleanly, but why isn't the test working properly?!?! It doesn't even print in Teke...ㅠ"

B: "Did you check the test code properly?"

A: "What do you mean? It doesn't say that in the requirements!"

B: "You should have checked the test code! `const sequenced = (*_*, *idx*) => *idx* + 1` The menu list also starts from 1!"

A: "I only looked at the requirements and thought that only the category is 1 ㅠㅠ"

After the exam, I alone broke down what I couldn't do in the test code as a 1-person 2-person play and kept on saying "Isn't it embarrassing???" as I deeply reflected on my carelessness for not checking the test code properly. 😂

**However, when writing this review, I found another issue with my code.** In the given test code, I specify the return value of MissionUtils.Random.shuffle through the mockShuffles function, but I think I should check why the index value returned through shuffle in my code is different to the given value.

**(2022.12.20 Resolved)**

---

#### Problem

- Requirements: Method of having each coach recommend food one at a time when selecting a category
- Test code: Method of having each coach recommend 5 foods at once after selecting 5 categories

#### Thoughts

It seems like it is something that will make me think as if solving a riddle all the way to the final coding test. (I feel like I have been given the groundwork for thinking even during the final coding test.)

1. What should I follow if the requirements and test code are different?

   This time, I think it is right to meet the requirements. This is because the test code is a tool for keeping good to the requirements.

2. **However, if the results of the logic described in the requirements and the logic required in the test code are different?**

   **If there is no difference between the results of these two, I need to calmly consider which logic is better.**

   In fact, even when I first encountered the problem, it seemed more convenient to choose all the categories first and then have each person recommend 5 menus. **This is because after finishing all the code for determining the category, it is clear to divide the roles in the code by passing on the data to recommend the next dish.** In other words, it will improve readability and be easier to maintain. However, the process of recommending food every time you select a category using the method I coded takes a long time to loop and does not seem to be very good for testing or maintenance.

   It gave me an opportunity to think about how it is the role of a developer to create better code and better logic given accurate understanding of the purpose and in the absence of side effects.

###  Input value parsing

I had my own rule in the previous pre-course mission. The value is separated with a “,” when the user inputs a value. However, I thought users might make mistakes with even something like a space, so I decided to remove the space from the code and verify it. So, this time again, I removed all spaces and then separated the values with a “,”.

Because I did not think deeply about input, I think I naturally thought it would be fine to do this following the formula like pattern I had in my head. In this problem, if the menu itself has a space, it cannot be processed properly using the existing method. This is because the "tomato and egg stir-fry" becomes "tomato egg stir-fry" when the space is removed.

I realized this belatedly and changed this to a method of changing “, ” to “,” in the process of changing strings into arrays in the SAMPLE data and then splitting it. However, I didn't think about the input situation.

Regarding input, when trying to solve this, I realized that splitting first with “,” and then looping through the array elements and trimming them is clearer and more certain.

`input.split(',').map((*elem*) => *elem*.trim())`

## How have
