/**
 * Use useReducer when:
 * + The next state depends on the previous state
 * + The state is complex
 * + You want to keep business logic:
 *   + as a pure function
 *   + in a separate module
 * + You want to be able to test easily
 */



// Use a function that will return a different memory location
// for the array each time. If the same array is returned each
// time, the Reset function would continue to show the current
// state of play.
const emptyBoard = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]


const initialState = {
  play: emptyBoard(),
  move: 0,
  player: "X",
  hover: {}, // may become { row: Y, column: X } with X, Y numbers
  outcome: ""
}


const isWinner = (player, play) => {
  let winner = false

  // Check if the winner has completed a row
  play.every(row => {
    winner = row.every( cell => cell === player)
    // If a winner was found, stop the iterations of the `every`
    // function. If not, continue looking for a winning row.
    return !winner
  })

  // As soon as a winner is found, subsequent tests for the
  // winner will be skipped.

  if (!winner) {
    // Check if winner has complete a column
    play.every(( row, index ) => {
      winner = play.every( row => {
        return row[index] === player
      })
      return !winner
    })
  }

  // Check the diagonals
  if (!winner) {
    winner = play.every(( row, index ) => {
      return row[index] === player
    })
  }

  if (!winner) {
    winner = play.every(( row, index ) => {
      return row[2 - index] === player
    })
  }

  return winner && player
}



const playMove = (state, action) => {
  const { row, column } = action.payload
  let { play, player, outcome, move } = state

  const cell = play[row][column]
  if (!outcome && !cell) {
    state = {...state} // ensure that state changes
    move += 1
    play[row][column] = player
    const winner = isWinner(player, play)

    if (winner) {
      state.outcome = `Winner: ${winner}`
    } else if (move === 9) {
      state.outcome = "Draw"
    }

    state.player = move % 2 ? "O" : "X"
    state.hover = 0
    state.move = move
  }

  return state
}


const reducer = (state, action) => {
  switch (action.type) {
    case "PLAY":
      return playMove(state, action)

    case "RESET":
      return {
        ...initialState,   // ... does a shallow copy
        play: emptyBoard()
      }

    case "ENTER":
      return {
        ...state,
        hover: state.outcome ? {} : action.payload
      }

    case "LEAVE":
      return {
        ...state,
        hover: {}
      }

    default:
      return {...state}
  }
}


export { initialState, reducer }
