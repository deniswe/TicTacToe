import { useState } from 'react';
import './App.css';
import './App.js';

//Element of a single square
const Square = ({id, square, player1turn, values, setvalues, setplayer1turn, playing}) =>{
    const [fieldvalue, setfieldvalue] = useState(null)

    // Sets the value to XorO, creates new array and updates the values const in App.js
    const changevalues = (xoro) => {
        const valuesarray = values[0]
        const newvalues = valuesarray.map((value, index) => {
            if (index === id) {
                return xoro;
            } else {
                return value;
            }
      })
      setvalues(newvalues)
      }
    
    // Switches fieldvalue, playersturn and the value-array when the Square/Button is clicked
    const changesquare = () => {
        if(values[0][id] === "" && playing){
            if (player1turn){
                setfieldvalue("X")
                setplayer1turn(!player1turn)
                changevalues("X")
            }
            else{
                setfieldvalue("O")
                setplayer1turn(!player1turn)
                changevalues("O")
            }
        }
    }
    return (
        <button className="square" id = {id} onClick={changesquare}> {fieldvalue}  </button>
    );
  }

export default Square
