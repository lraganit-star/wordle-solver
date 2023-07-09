import { useState, useEffect } from "react";
import "./App.css";

function Page() {
  const [letterColors, setLetterColors] = useState([]);
  const [changeColor, setChangeColor] = useState({});
  const [word, setWord] = useState("");

  useEffect(() => {
    setWord("grace");
  });

  const getLetterColors = (color) => {
    const newColor = color;
    const currentLetterColors = [...letterColors, newColor];
    setLetterColors(currentLetterColors);
  };

  // okay so what I'm thinking about doing is using setChangeColor to where
  // it saves if there is a letterid input first
  // then the following color click will change the value of the color
  // depending on the letterid
  // it will have a max of 2 objects. Once the color has been chnaged
  // changeColor will be emptied
  const undoColor = (changeColor) => {
    const currentLetterColors = [...letterColors];

    switch (letterId) {
      case "firstLetter":
        break;
      case "secondLetter":
        break;
      case "thirdLetter":
        break;
      case "fourthLetter":
        break;
      case "fifthLetter":
        break;
    }
  };

  // esentially this is going to create a new array in letterColors
  // and place the next word in the following row depending on
  // the user input
  const handleSubmit = () => {};

  return (
    <>
      <div id="page">
        <Board focusWord={word} letterColors={letterColors}></Board>
        <Palette id="palette" onLetterColors={getLetterColors}></Palette>
        <button id="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

function Board({ focusWord, letterColors }) {
  return (
    <>
      <div id="board">
        <Word
          id="firstword"
          focusWord={focusWord}
          letterColors={letterColors}
        ></Word>

        {/* add multiple words after getting the different words in from main.js*/}

        {/* <Word
          id="secondword"
          focusWord={focusWord}
          letterColors={letterColors}
        ></Word> */}
        {/* <Word id="thirdword"></Word>
        <Word id="fourthword"></Word>
        <Word id="fifthword"></Word>
        <Word id="sixthword"></Word> */}
      </div>
    </>
  );
}

function Word({ focusWord, letterColors }) {
  const focusWordArr = focusWord.toUpperCase().split("");

  // if there is a color in the spot for the letterColors arr then change color of block

  return (
    <>
      <div id="word">
        <Letter
          id="firstLetter"
          focusLetter={focusWordArr[0]}
          focusColor={letterColors[0]}
        ></Letter>
        <Letter
          id="secondLetter"
          focusLetter={focusWordArr[1]}
          focusColor={letterColors[1]}
        ></Letter>
        <Letter
          id="thirdLetter"
          focusLetter={focusWordArr[2]}
          focusColor={letterColors[2]}
        ></Letter>
        <Letter
          id="fourthLetter"
          focusLetter={focusWordArr[3]}
          focusColor={letterColors[3]}
        ></Letter>
        <Letter
          id="fifthLetter"
          focusLetter={focusWordArr[4]}
          focusColor={letterColors[4]}
        ></Letter>
      </div>
    </>
  );
}

function Letter({ id, focusLetter, focusColor }) {
  let letterColor = focusColor;

  switch (focusColor) {
    case "green": {
      letterColor = "#6aaa64";
      break;
    }
    case "yellow": {
      letterColor = "#c9b458";
      break;
    }
    case "grey": {
      letterColor = "#787c7e";
      break;
    }
  }

  const handleUndo = (e) => {
    e.preventDefault();
    const letterPlacement = e.target.id;
    undoColor(letterPlacement);
  };

  return (
    <>
      <div
        className={"letter"}
        id={id}
        style={{ backgroundColor: letterColor }}
        onClick={handleUndo}
      >
        {focusLetter}
      </div>
    </>
  );
}

function Palette({ onLetterColors }) {
  const handleLetterColors = (e) => {
    e.preventDefault();
    const color = e.target.id;
    onLetterColors(color);
  };

  return (
    <>
      <div className="palette">
        <div className="color" onClick={handleLetterColors} id="green"></div>
        <div className="color" onClick={handleLetterColors} id="yellow"></div>
        <div className="color" onClick={handleLetterColors} id="grey"></div>
      </div>
    </>
  );
}

export default Page;
