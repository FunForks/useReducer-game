/**
 * Watcher.js
 * 
 * Logs the history of the game to the console.
 * Started and stopped by the App component, but otherwise, it
 * runs independently.
 * 
 * This works because the state of play is stored in an array
 * whose address can be shared. All variable that have a pointer
 * to that address can read the contents of the array.
 */


let interval
let play, lastPlay
// [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0]
// ]



const clone = object => {
  return JSON.parse(JSON.stringify(object))
}



const checkState = () => {
  const unchanged = play.every(( row, rowIndex ) => {
    const sameRows = row.every(( cell, columnIndex ) => {
      const lastCell = lastPlay[rowIndex][columnIndex]
      const sameCells = lastCell === cell
      return sameCells
    })
    return sameRows
  })

  if (!unchanged) {
    logPlay()
  }
}



const logPlay = () => {
  const playString = play.reduce(( string, row ) => {
    return `${string}\n` + row.reduce(( rowString, cell ) => {
      return `${rowString} ${cell || "•"}`
    }, "")

  }, "")

  console.log(playString)
  
  lastPlay =  clone(play)
}



export const toggleWatcher = (winnerOrPlay) => {
  clearInterval(interval)  

  if (typeof winnerOrPlay === "string") { // winner
    logPlay()
    console.log(winnerOrPlay)

  } else { // play
    play = winnerOrPlay
    lastPlay = clone(play)

    interval = setInterval(checkState, 100)
  }
}