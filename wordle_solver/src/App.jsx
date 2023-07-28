import { useState, useEffect } from "react";
import "./App.css";

function Page() {
  const [currentColor, setCurrentColor] = useState("");
  const [letterColors, setLetterColors] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    setWord("grace");
  });

  // will have to edit this to where instead of just adding it to the end, the color gets inserted
  // in the right spot in the array
  const getLetterColors = (color, colorPlacement) => {
    const currentLetterColors = [...letterColors];
    const addedColor = () => {
      switch (colorPlacement) {
        case "firstLetter":
          currentLetterColors.splice(1, 0, color);
        case "secondLetter":
          currentLetterColors.splice(2, 0, color);
        case "thirdLetter":
          currentLetterColors.splice(3, 0, color);
        case "fourthLetter":
          currentLetterColors.splice(4, 0, color);
        case "fifthLetter":
          currentLetterColors.splice(5, 0, color);
      }
    };

    setLetterColors(addedColor);
    // setLetterColors(currentLetterColors);
  };

  const handleUndo = (letterPlacement) => {
    if (!history.length) {
      return;
    }
    switch (letterPlacement) {
      case "firstLetter":
        setCurrentColor(letterColors);
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
    setCurrentColor(letterColors[letterColors.length - 1]);
    setLetterColors(letterColors.slice(0, -1));
  };

  // esentially this is going to create a new array in letterColors
  // and place the next word in the following row depending on the user input
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

        {/* add multiple words after getting the different words in from main.js */}
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
  const letterColor = (() => {
    switch (focusColor) {
      case "green": {
        return "#6aaa64";
      }
      case "yellow": {
        return "#c9b458";
      }
      case "grey": {
        return "#787c7e";
      }
    }
  })();

  return (
    <>
      <div
        className={"letter"}
        id={id}
        style={{ backgroundColor: letterColor }}
      >
        {focusLetter}
      </div>
    </>
  );
}

function Palette({ onLetterColors, letterId }) {
  // need way to get the letterID here
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
