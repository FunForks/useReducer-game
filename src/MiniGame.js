/**
 * The App component is used:
 * + To display the current state of the game
 * + To dispatch actions to the reducer
 *
 * All game logic is handled separately in the reducer.
 */

import { useReducer } from 'react'
import { initialState, reducer } from './reducer'



let render = {} // used to track which game re-renders



const MiniGame = ({ className, sharedState }) => {
  let [ state ] = useReducer(reducer, initialState)
  if (sharedState) {
    state = sharedState
  }

  
  // To help understand React, check when each MiniGame is rendered
  const classRender = render[className] || (render[className] = 1)
  const time = classRender === 1 ? "time" : "times"
  console.log(`${className} rendered ${classRender} ${time}`);
  render[className]++


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
        className={className + " mini"}
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
    </>
  );
}


export default MiniGame;
