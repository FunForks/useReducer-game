
See the game in action [here](https://funforks.github.io/useReducer-game).

## Why use useReducer?

useReducer is a powerful alternative to useState. It allows you to handle more than one state variable at a time, and to customize how they are updated.

There are four major reasons for using useReducer:

1. **The next state of your app depends on the current state.** This is clearly true of a game, where each person's move determines what moves are possible for the opponent.
2. **The state of your app is complex.** In Noughts and Crosses, you have a 2D array of squares, and lines, columns and diagonals all have their importance.
3. You want to keep business logic:
   * as **a pure function**
   * **in a separate module**
   When your project is small, it might seem convenient to have all your code in one file. But as your project increases in size, it makes sense to put each chunk of functionality in a different file. This allows different people to work on different features of the project, with no merge conflicts.
4. **You want to test the logic easily.** Because the reducer is a pure function in a separate file, it is easy to write tests that can check that all state changes are handled correctly.

## A metaphor for useReducer

To understand why it's useful, imagine the way a restaurant functions.

The diners sit in one part of the restaurant, and the chefs are busy in a different place. The serving staff carry messages from the diners to the kitchen, and dishes from the kitchen to the diners. This is known as "the separation of concerns". Each set of people perform a different task.

A meal may require a large number of different dishes to be prepared, and many exchanges may need to take place between the diners and the kitchen staff, even if they never see each other. Dishes are brought out and tidied away in a logical order. The state of the table depends on everything that happened there before.

In a React app, you create components to display content on the user's screen. This is like the way food is presented on the table in front of the diners. You also need a "kitchen" to ensure that the right content is created for each user, and that the content is served in the right order. This is the role of the "reducer" function that you pass to React's `useReducer()` method.

You may have heard of the [MVC (Model-View-Controller)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern. Your React components provide a View, where the user can see the content of the page. The event listeners that you attach to different elements give the user control: they can enter text, click on buttons, choose from selectors and so on. The Model is the data that can be displayed, and the patterns of interaction between the different parts of the data. Or, with the restaurant analogy, the Model is all the dishes that the kitchen can produce, the Controllers are the serving staff and the View is the spread of food on the diners' table.

Each time the "reducer" function receives messages from your React components, it calculates a new state for your app. (It prepares the appropriate dishes, or tidies away empty plates). This all happens in an abstract way in the reducer: nothing is shown on the screen yet.

The black box that is React is in control of calling the "reducer" function. React therefore receives the value returned by the call. And React can then compare the current state with the new state. Wherever it finds a difference, it calls your component function so that it will re-render the changed parts of your app.

## Tests

Test Driven Development (TDD) is not covered in this course. However, you will find a simple test (App.test.js) which you can run by executing `npm test` in the Terminal.

The tests check that a line of diagonal X's will set the outcome of the game to "Winner: X", and that a final move by O that does not create a line of three O's will result in an outcome of "Draw".

In a real TDD project, there would be many more tests. These would all be written before the reducer code itself was written, and successfully passing all the test would indicate that the game logic was functioning exactly as expected.