import React, { useState, useEffect } from "react";
import "./App.css";

function Page() {
  const [letterIdAndColor, setLetterIdAndColor] = useState([]);
  const [letterColors, setLetterColors] = useState([]);
  const [letterId, setLetterId] = useState(null);
  const [word, setWord] = useState("");

  const [undoLetter, setUndoLetter] = useState("");

  useEffect(() => {
    setWord("grace");
  });

  function handleLetterInfo(id, focusColor) {
    if (focusColor) {
      const letterInfo = {
        id: id,
        color: focusColor,
      };
      setLetterIdAndColor((prevLetters) => {
        const updatedLetterInfo = [...prevLetters, letterInfo];
        return updatedLetterInfo;
      });
    }
  }
  console.log(letterIdAndColor);

  const getLetterColors = (color) => {
    const currentLetterColors = [...letterColors, color];
    setLetterColors(currentLetterColors);
  };

  const handleUndoLetter = (letter) => {
    setUndoLetter(letter);
  };

  const handleUndo = (undoLetter, letterIdAndColor) => {
    // if (!undoLetter.length) {
    //   return;
    // }
    console.log("handleUndo");
    switch (undoLetter) {
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
        <Board
          focusWord={word}
          letterColors={letterColors}
          setLetterId={setLetterId}
          setLetterIdAndColor={setLetterIdAndColor}
          onLetterInfo={handleLetterInfo}
          onUndoLetter={handleUndoLetter}
        ></Board>
        <Palette
          id="palette"
          onLetterColors={getLetterColors}
          letterId={letterId}
        ></Palette>
        <button id="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}

function Board({ focusWord, letterColors, onLetterInfo, onUndoLetter }) {
  return (
    <>
      <div id="board">
        <Word
          id="firstword"
          focusWord={focusWord}
          letterColors={letterColors}
          letterInfo={onLetterInfo}
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

function Word({ focusWord, letterColors, letterInfo, undoLetter }) {
  const focusWordArr = focusWord.toUpperCase().split("");

  return (
    <>
      <div id="word">
        <Letter
          id="firstLetter"
          focusLetter={focusWordArr[0]}
          focusColor={letterColors[0]}
          letterInfo={letterInfo}
          undoLetter={undoLetter}
        ></Letter>
        <Letter
          id="secondLetter"
          focusLetter={focusWordArr[1]}
          focusColor={letterColors[1]}
          letterInfo={letterInfo}
          undoLetter={undoLetter}
        ></Letter>
        <Letter
          id="thirdLetter"
          focusLetter={focusWordArr[2]}
          focusColor={letterColors[2]}
          letterInfo={letterInfo}
          undoLetter={undoLetter}
        ></Letter>
        <Letter
          id="fourthLetter"
          focusLetter={focusWordArr[3]}
          focusColor={letterColors[3]}
          letterInfo={letterInfo}
          undoLetter={undoLetter}
        ></Letter>
        <Letter
          id="fifthLetter"
          focusLetter={focusWordArr[4]}
          focusColor={letterColors[4]}
          letterInfo={letterInfo}
          undoLetter={undoLetter}
        ></Letter>
      </div>
    </>
  );
}

function Letter({ id, focusLetter, focusColor, letterInfo, undoLetter }) {
  // don't forget to change style of letter too
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

  useEffect(() => {
    letterInfo(id, focusColor);
  }, [id, focusColor]);

  const handleClick = (e) => {
    e.preventDefault();
    const letterplacement = e.target.id;
    undoLetter(letterplacement);
    console.log("Letter Placement", letterplacement);
  };

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

function Palette({ onLetterColors, letterId }) {
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
