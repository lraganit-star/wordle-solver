import React, { useState, useEffect } from "react";
import "./App.css";

function Page() {
  const [letterColors, setLetterColors] = useState([]);
  const [word, setWord] = useState("");

  const [undoLetter, setUndoLetter] = useState("");
  const [undoColor, setUndoColor] = useState("");

  useEffect(() => {
    setWord("grace");
  });

  const getLetterColors = (color) => {
    const currentLetterColors = [...letterColors, color];
    setLetterColors(currentLetterColors);
  };

  const handleUndoLetter = (letter) => {
    setUndoLetter(letter);
  };

  const handleUndoColor = (color) => {
    setUndoColor(color);
  };

  function handleUndo(undoLetter, undoColor) {
    if (undoColor) {
      switch (undoLetter) {
        case "firstLetter":
          setLetterColors((prevColors) => {
            const undoColors = [...prevColors];
            undoColors.splice(0, 1, undoColor);
            return undoColors;
          });
          break;
        case "secondLetter":
          setLetterColors((prevColors) => {
            const undoColors = [...prevColors];
            undoColors.splice(1, 1, undoColor);
            return undoColors;
          });
          break;
        case "thirdLetter":
          setLetterColors((prevColors) => {
            const undoColors = [...prevColors];
            undoColors.splice(2, 1, undoColor);
            return undoColors;
          });
          break;
        case "fourthLetter":
          setLetterColors((prevColors) => {
            const undoColors = [...prevColors];
            undoColors.splice(3, 1, undoColor);
            return undoColors;
          });
          break;
        case "fifthLetter":
          setLetterColors((prevColors) => {
            const undoColors = [...prevColors];
            undoColors.splice(4, 1, undoColor);
            return undoColors;
          });
          break;
      }
      setUndoColor("");
      setUndoLetter("");
    }
  }

  handleUndo(undoLetter, undoColor);

  // esentially this is going to create a new array in letterColors
  // and place the next word in the following row depending on the user input
  const handleSubmit = () => {};

  return (
    <>
      <div id="page">
        <Board
          focusWord={word}
          letterColors={letterColors}
          onUndoLetter={handleUndoLetter}
          undoColor={undoColor}
        ></Board>
        <Palette
          id="palette"
          onLetterColors={getLetterColors}
          onUndoColor={handleUndoColor}
          undoLetter={undoLetter}
        ></Palette>
        <button id="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

function Board({ focusWord, letterColors, onUndoLetter, undoColor }) {
  return (
    <>
      <div id="board">
        <Word
          id="firstword"
          focusWord={focusWord}
          letterColors={letterColors}
          undoLetter={onUndoLetter}
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

function Word({ focusWord, letterColors, undoLetter, undoColor }) {
  const focusWordArr = focusWord.toUpperCase().split("");

  return (
    <>
      <div id="word">
        <Letter
          id="firstLetter"
          focusLetter={focusWordArr[0]}
          focusColor={letterColors[0]}
          undoLetter={undoLetter}
          undoColor={undoColor}
        ></Letter>
        <Letter
          id="secondLetter"
          focusLetter={focusWordArr[1]}
          focusColor={letterColors[1]}
          undoLetter={undoLetter}
          undoColor={undoColor}
        ></Letter>
        <Letter
          id="thirdLetter"
          focusLetter={focusWordArr[2]}
          focusColor={letterColors[2]}
          undoLetter={undoLetter}
          undoColor={undoColor}
        ></Letter>
        <Letter
          id="fourthLetter"
          focusLetter={focusWordArr[3]}
          focusColor={letterColors[3]}
          undoLetter={undoLetter}
          undoColor={undoColor}
        ></Letter>
        <Letter
          id="fifthLetter"
          focusLetter={focusWordArr[4]}
          focusColor={letterColors[4]}
          undoLetter={undoLetter}
          undoColor={undoColor}
        ></Letter>
      </div>
    </>
  );
}

function Letter({ id, focusLetter, focusColor, undoLetter, undoColor }) {
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

  const handleClick = (e) => {
    e.preventDefault();
    const letterplacement = e.target.id;
    undoLetter(letterplacement);
  };

  if (undoLetter == id) {
    const letterColor = (() => {
      switch (undoColor) {
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
  }

  return (
    <>
      <div
        className={"letter"}
        id={id}
        style={{ backgroundColor: letterColor }}
        onClick={handleClick}
      >
        {focusLetter}
      </div>
    </>
  );
}

function Palette({ onLetterColors, onUndoColor, undoLetter }) {
  const handleLetterColors = (e) => {
    e.preventDefault();
    const color = e.target.id;

    if (undoLetter) {
      onUndoColor(color);
    } else {
      onLetterColors(color);
    }
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
