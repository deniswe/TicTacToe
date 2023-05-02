import { useEffect, useState } from 'react';  
import './App.css';
import Square from "./square.js"

// Setup for Game and Gameboard
export default function Game() {
  const [values, setvalues] = useState(["","","","","","","","",""])
  const [player1turn, setplayer1turn] = useState(true)
  const [playerhaswon, setplayerhaswon] = useState("Ongoing Game")
  const [playing, setplaying] = useState(true)

  //Stops the game and sets the message
  const checkwin = () => {
    const winnning = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    if (values[0] !== "" && values[1] !== "" && values[2] !== "" && values[3] !== "" && values[4] !== "" && values[5] !== "" && values[6] !== "" && values[7] !== "" && values[8] !== ""){
      setplayerhaswon("It's a tie!")
    }
    winnning.forEach((n) => {
      const winstring = values[n[0]] + "" + values[n[1]] + values[n[2]]
      if (winstring === "XXX" || winstring === "OOO"){
        setplaying(false)
        if (values[n[0]] === "X"){
          setplayerhaswon("X Wins!")
        }
        else{
          setplayerhaswon("O Wins!")
        }
      }
    })
  }

  //runs checkwin everytime "values" is updated
  useEffect(() => {
    checkwin()
  }, values)

  //resets all constants
  const reset = () =>{
    setvalues(["","","","","","","","",""])
    setplayer1turn(true)
    setplayerhaswon("Ongoing Game")
    setplaying(true)
    window.location.reload(false);
  }

  const changesize = (gamesize) => {
    document.documentElement.style.setProperty("--size-board", gamesize.currentTarget.value + "px");
    document.documentElement.style.setProperty("--square-size", gamesize.currentTarget.value/3 + "px");
  }

  //Output
  return (
    <>
    <div className='gameboard'>
      {values.map((square, index) => <Square key = {index} id = {index} square = {square} player1turn = {player1turn} setvalues = {setvalues} setplayer1turn = {setplayer1turn} values = {[values]} playing = {playing} /> )}
    </div>
    <button onClick={reset}>Restart</button>
    <p> {playerhaswon} </p>
    <p> <input type = "range" min = "100" max = "1000" defaultValue={"300"} onChange={changesize}/> </p>
    </>
  );
}