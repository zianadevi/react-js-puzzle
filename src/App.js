import React, { useEffect, useState } from "react";
import './App.css'

const Tile = ({ type, id }) => {
  if (type === 0) {
    return <td id={id} className="block">&nbsp;</td>;
  }
  if (type === 1) {
    return <td id={id} className="path">&nbsp;</td>;
  }
  if (type === 2) {
    return <td id={id} className="bonus">&nbsp;</td>;
  }
  if (type === 3) {
    return <td id={id} className="finish">&nbsp;</td>;
  }

  return <td id={id} className="character">
    &nbsp;
  </td>;
};

const App = ({ grid }) => {
  const [appState, setAppState] = useState(grid);
  const [score, setScore] = useState(1000)
  const [row, setRow] = useState(0)
  const [col, setCol] = useState(0)
  const [finalScore, setFinalScore] = useState()

  const getIndexOfK = (arr, k) => {
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index];
      }
    }
  }

  useEffect(()=> {
    let idxOfChar = getIndexOfK(appState, 4)
    setRow(idxOfChar[0])
    setCol(idxOfChar[1])
  }, [])

  const handleClickButton = (e) => {
    let tempAppState = appState
    if (e.target.id === "right"){
      if (col !== 7 && appState[row][col + 1] !== 0) {
        if (appState[row][col + 1] === 1){
            setScore(score - 10)
        }
        else if (appState[row][col + 1] === 2){
          setScore(score+30)
        }
        else if (appState[row][col + 1] === 3){
          setAppState([])
          setFinalScore(score)
          return
        }
        setCol(col + 1)
        tempAppState[row][col] = 1
        tempAppState[row][col + 1] = 4
        setAppState(tempAppState)
      }
    }
    else if (e.target.id === "left"){
      if (col !== 0 && appState[row][col - 1] !== 0) {
        if (appState[row][col -1] === 1){
          setScore(score-10)
        }
        else if (appState[row][col - 1] === 2){
          setScore(score+30)
        }
        else if (appState[row][col - 1] === 3){
          setAppState([])
          setFinalScore(score)
          return
        }
        setCol(col - 1)
        tempAppState[row][col] = 1
        tempAppState[row][col - 1] = 4
        setAppState(tempAppState)
      }
    }
    else if (e.target.id === "down"){
      if (row !== 7 && appState[row +1][col] !== 0){
        if (appState[row + 1][col] === 1){
          setScore(score - 10)
        }
        else if (appState[row+1][col] === 2){
          setScore(score+30)
        }
        else if (appState[row+1][col] === 3){
          setAppState([])
          setFinalScore(score)
          return
        }
        setRow(row + 1)
        tempAppState[row][col] = 1
        tempAppState[row + 1][col] = 4
        setAppState(tempAppState)
      }

    }
    else if (e.target.id === "up"){
      if (row !== 0 && appState[row -1][col] !== 0){
        if(appState[row -1][col] === 1){
          setScore(score - 10)
        }
        else if (appState[row -1][col] === 2){
          setScore(score+30)
        }
        else if (appState[row-1][col] === 3){
          setAppState([])
          setFinalScore(score)
          return
        }
        setRow(row - 1)
        tempAppState[row][col] = 1
        tempAppState[row -1][col] = 4
        setAppState(tempAppState)
      }
    }
  }
  return (
    <div className="container-fluid">
      <h2 id="score">{finalScore}</h2>
      <table>
        <tbody>
          {appState.map((rowVal, row) => <tr key={`r-${row}`}>
            {rowVal.map((colVal, col) => <Tile id={`item-${row}-${col}`} type={colVal} key={`el-${row}${col}`} />)}
          </tr>)}
        </tbody>
      </table>
      <div className="grid">
        <div />
        <button id="up" onClick={handleClickButton}>Up</button>
        <div />
      </div>
      <div className="grid">
        <button id="left" onClick={handleClickButton}>Left</button>
        <button id="down" onClick={handleClickButton}>Down</button>
        <button id="right" onClick={handleClickButton}>Right</button>
      </div>
    </div>
  );
};

export default App;