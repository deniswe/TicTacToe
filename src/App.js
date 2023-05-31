import { useEffect, useState } from 'react';  
import './App.css';
import Square from "./square.js"

// Setup for Game and Gameboard
export default function Game() {
  const [fieldsize, setfieldsize] = useState(3)
  const [values, setvalues] = useState(["","","","","","","","",""])
  const [player1turn, setplayer1turn] = useState(true)
  const [playerhaswon, setplayerhaswon] = useState("Ongoing Game")
  const [playing, setplaying] = useState(true)
  const [resetvalue, setresetvalue] = useState(true)

  //Stops the game and sets the message
  const checkwinold = () => {
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

  const checkwin = () => {
    // horizontal check
    for (var i = 0; i < fieldsize; i++){
      for (var j = 0; j < fieldsize - 2; j++){
        if (values[i*fieldsize + j] === values[i*fieldsize + j + 1] && values[i*fieldsize + j] === values[i*fieldsize + j + 2] && values[i*fieldsize + j] !== ""){
            setplaying(false)
            if (values[i*fieldsize + j] === "X"){
              setplayerhaswon("X Wins!")
            }
            else{
              setplayerhaswon("O Wins!")
            }
            break
          
        }
      }
    }
    // vertical check
    if (playerhaswon === "Ongoing Game"){
    for (var i = 0; i < fieldsize; i++){
      for (var j = 0; j < fieldsize - 2; j++){
        if (values[j*fieldsize + i] === values[(j+1)*fieldsize + i] && values[j*fieldsize + i] === values[(j+2)*fieldsize + i] && values[j*fieldsize + i] !== ""){
            setplaying(false)
            if (values[j*fieldsize + i] === "X"){
              setplayerhaswon("X Wins!")
            }
            else{
              setplayerhaswon("O Wins!")
            }
            break
          
        }
      }
    }
    }
    // diagonal from left downwards
    if (playerhaswon === "Ongoing Game"){
      for (var i = 0; i < fieldsize-2; i++){
        for (var j = 0; j < fieldsize - 2; j++){
          if (values[j*fieldsize + i] === values[(j+1)*fieldsize + i + 1] && values[j*fieldsize + i] === values[(j+2)*fieldsize + i + 2] && values[j*fieldsize + i] !== ""){
              setplaying(false)
              if (values[j*fieldsize + i] === "X"){
                console.log("2 here")
                setplayerhaswon("X Wins!")
              }
              else{
                console.log("2 here")
                setplayerhaswon("O Wins!")
              }
              break
            
          }
        }
      }
    }

    // diagonal from right downwards
    if (playerhaswon === "Ongoing Game"){
      for (var i = 0; i < fieldsize-2; i++){
        for (var j = 0; j < fieldsize - 2; j++){
          if (values[j*fieldsize + i + 2] === values[(j+1)*fieldsize + i + 1] && values[j*fieldsize + i + 2] === values[(j+2)*fieldsize + i] && values[j*fieldsize + i + 2] !== ""){
              setplaying(false)
              if (values[j*fieldsize + i] === "X"){
                console.log("1 here")
                setplayerhaswon("X Wins!")
              }
              else{
                console.log("1 here")
                setplayerhaswon("O Wins!")
              }
              break
          }
        }
      }
    }

    //draw
    var checking = 0
    for (var i = 0; i < fieldsize*fieldsize; i++){
      if(values[i] === ""){
        checking = 1
      }
    }
    if (checking === 0){
      setplaying(false)
      setplayerhaswon("It's a tie!")
    }
  }

  //runs checkwin everytime "values" is updated
  useEffect(() => {
    checkwin()
  }, [values])

  useEffect(() => {
    setresetvalue(false)
    document.documentElement.style.setProperty("--size-board", fieldsize * 100 + "px")
    document.documentElement.style.setProperty("--square-size", 100 + "px")
    document.documentElement.style.setProperty("--square-amount", fieldsize)
  }, [resetvalue, fieldsize])

  const changesize = (gamesize) => {
    document.documentElement.style.setProperty("--size-board", gamesize.currentTarget.value + "px");
    document.documentElement.style.setProperty("--square-size", gamesize.currentTarget.value/3 + "px");
  }

  const makesmaller = () => {
    if (fieldsize > 3){
    setfieldsize(fieldsize-1)
    setvalues(Array(fieldsize*fieldsize).fill(""))
    setplayer1turn(true)
    setplayerhaswon("Ongoing Game")
    setplaying(true)
    setresetvalue(true)
    }
  }

  const makebigger = () => {
    setfieldsize(fieldsize+1)
    setvalues(Array(fieldsize*fieldsize).fill(""))
    setplayer1turn(true)
    setplayerhaswon("Ongoing Game")
    setplaying(true)
    setresetvalue(true)
  }

  // Can delete the currentboard if the resetvalue is set to true, used to refresh the board and get new squares
  const makegame = () => {
    if (resetvalue){
      console.log("Should delete Gameboard")
      return null
    }
    return values.map((square, index) => <Square key = {index} id = {index} square = {square} player1turn = {player1turn} setvalues = {setvalues} setplayer1turn = {setplayer1turn} values = {[values]} playing = {playing} /> )
  }

  const reset = () =>{
    setvalues(Array(fieldsize * fieldsize).fill(""))
    setplayer1turn(true)
    setplayerhaswon("Ongoing Game")
    setplaying(true)
    setresetvalue(true)
  }

  //Output
  return (
    <>
    <div className='gameboard'>
      {makegame()}
    </div>
    <div><button onClick={() => reset()}>Reset</button> </div>
    <p> {playerhaswon} </p>
    <p> <button onClick={makesmaller}> Decrease fields</button> <button onClick={makebigger}> Increase fields</button> </p>
    <p> <input type = "range" min = "100" max = "5000" defaultValue={"300"} onChange={changesize}/> </p>
    </>
  );
}


//Funktioniert
