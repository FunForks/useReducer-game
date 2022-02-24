import { initialState, reducer } from './reducer'


test('check diagonal', () => {
  const state = {...initialState}
  const { play } = state
  play[0][0] = play[1][1] = "X"

  const action = {
    type: "PLAY",
    payload: {row: 2, column: 2}
  }

  const result = reducer( state, action )

  expect(result.outcome).toBe("Winner: X")
})


test('check blocked diagonal', () => {
  const state = {...initialState}
  const { play } = state
  play[0][0] = play[1][1] = "O"

  const action = {
    type: "PLAY",
    payload: {row: 2, column: 2}
  }

  const result = reducer( state, action )

  expect(result.outcome).toBe("")
})


test('check draw', () => {
  const state = {...initialState}
  state.play = [
    ["X", "O", "X"],
    ["X", "O", "O"],
    ["0", "X",  0]
  ]
  state.move = 8

  const action = {
    type: "PLAY",
    payload: {row: 2, column: 2}
  }

  const result = reducer( state, action )

  expect(result.outcome).toBe("Draw")
})

