/**
 * The App component is used:
 * + To display the current state of the game
 * + To dispatch actions to the reducer
 *
 * All game logic is handled separately in the reducer.
 */

import { useReducer, useEffect } from 'react'
import { initialState, reducer } from './reducer'

import { toggleWatcher } from './Watcher'



const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)


  // Convert an element to a position in the grid
  const getRowAndColumn = element => {
    const rowDiv = element.parentNode
    const row = [...rowDiv.parentNode.children].indexOf(rowDiv)
    const column = [...rowDiv.children].indexOf(element)

    return { row, column }
  }


  // EVENT LISTENERS // EVENT LISTENERS // EVENT LISTENERS //


  const playMove = (event) => {
    const cell = getRowAndColumn(event.target)

    dispatch({
      type: "PLAY",
      payload: cell
    })
  }


  const enter = (event) => {
    const cell = getRowAndColumn(event.target)

    dispatch({
      type: "ENTER",
      payload: cell
    })
  }


  const leave = (event) => {
    const cell = getRowAndColumn(event.target)

    dispatch({
      type: "LEAVE",
      payload: cell
    })
  }


  const reset = () => {
    dispatch({ type: "RESET" })
  }


  // Start or stop the Watcher. toggleWatcher will be called
  // automatically when this component is first rendered, and
  // subsequently only if state.outcome gets set to "winner: A"
  // or "".
  useEffect(() => {
    toggleWatcher(state.outcome || state.play)
  }, [state.outcome])



  // RENDERING // RENDERING // RENDERING // RENDERING //

  // Create a row of 3 cells
  // Each cell has its own onMouseEnter and onMouseLeave listener
  const row = ( rowData, index, hoverColumn, player ) => {
    const key = "row-" + index

    const cells = rowData.map(( cell, index ) => {
      const key = "col-" + index
      let char = cell || ""
      let className = ""

      if (hoverColumn === index && !char) {
        char = player
        className = "hover"
      }

      return (
        <span
          key={key}
          className={className}
          onMouseEnter={enter}
          onMouseLeave={leave}
        >
          {char}
        </span>
      )
    })

    return (
      <div
        key={key}
      >
        {cells}
      </div>
    )
  }


  // Create 3 rows of cells.
  // A click on any cell in any row triggers playMove
  const board = ({ play, hover, player }) => {
    const rows = play.map((rowData, index) => {
      const hoverColumn = ( hover.row === index )
                         ? hover.column
                         : undefined

      return row( rowData, index, hoverColumn, player )
    })

    return (
      <div
        id="board"
        onClick={playMove}
      >
        {rows}
      </div>
    )
  }


  // Display the board, the outcome (if appropriate) and a reset
  // button
  return (
    <>
      {board(state)}
      <span>{state.outcome}</span>
      <button
        onClick={reset}
      >
        Reset
      </button>
    </>
  );
}


export default App;
