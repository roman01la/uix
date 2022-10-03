# What is UIx?

UIx is a ClojureScript library. It is a wrapper for React that provides an idiomatic interface into modern React.

> Because UIx is a wrapper library for React, it's highly recommended to learn more about React.js itself and make yourself comfortable with its concepts.

## What is modern React?

A set of new APIs that also includes revamped rendering machinery. For more information on that topic read [“Introducing Concurrent Mode (Experimental)”](https://17.reactjs.org/docs/concurrent-mode-intro.html).

## How's it different from existing ClojureScript libraries?

Existing libraries came out at the time when React didn't have proper scheduling and prioritization mechanisms and components had to be declared as JavaScript classes. Most of the wrappers had to invent their own scheduling on top of React and deal with JS classes while presenting them nicely as normal ClojureScript functions with Hiccup.

Today what we call modern React includes a rendering mechanism that takes care of putting stuff on the screen efficiently and also allows declaring components directly as functions. New [APIs](https://reactjs.org/docs/hooks-intro.html) to help deal with side effects and state allow better modularity and reusability.

While existing code and ClojureScript wrappers can still use newer versions of React they cannot leverage all of the new features and improved rendering without introducing breaking changes or affecting performance in order to support backwards compatibility.

## What does UIx offer?

As a ClojureScript wrapper the library offers an idiomatic interface into React while trying to be familiar to both those who have used existing wrappers and those who are coming from the JavaScript world.
