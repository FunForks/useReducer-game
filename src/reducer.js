/**
 * Use useReducer when:
 * + The next state depends on the previous state
 * + The state is complex
 * + You want to keep business logic:
 *   + as a pure function
 *   + in a separate module
 * + You want to be able to test easily
 */


const emptyBoard = () => [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]


const initialState = {
  play: emptyBoard(),
  move: 0,
  player: "X",
  hover: {}, // may become { row: X, column: Y } with X, Y numbers
  outcome: ""
}


const isWinner = (player, play) => {
  let winner = false

  // Check if the winner has completed a row
  play.every(row => {
    winner = row.every( cell => cell === player)
    return !winner
  })

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
  state = {...state}
  const { row, column } = action.payload
  let { play, player, outcome, move } = state

  const cell = play[row][column]
  if (!outcome && !cell) {
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
        play: emptyBoard() // so we need to reset play manually
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
