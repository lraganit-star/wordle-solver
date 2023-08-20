import React, { useState, useEffect } from "react";
import "./App.css";

function Page() {
  const [currentColor, setCurrentColor] = useState("");
  const [letterIdAndColor, setLetterIdAndColor] = useState({});
  const [letterColors, setLetterColors] = useState([]);
  const [letterId, setLetterId] = useState(null);
  const [word, setWord] = useState("");
  console.log(letterId);

  useEffect(() => {
    setWord("grace");
  });

  function handleLetterInfo(id, focusColor) {
    if (!letterIdAndColor[id] || letterIdAndColor[id].color !== focusColor) {
      const letterInfo = {
        [id]: {
          letterId: id,
          color: focusColor,
        },
      };
      setLetterIdAndColor((prevLetters) => ({ ...prevLetters, ...letterInfo }));
      console.log("letterInfo", letterInfo);
    }
  }

  const getLetterColors = (color) => {
    const currentLetterColors = [...letterColors, color];
    console.log("letterId", letterId);
    console.log("current", currentLetterColors);

    setLetterColors(currentLetterColors);
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
        <Board
          focusWord={word}
          letterColors={letterColors}
          setLetterId={setLetterId}
          setLetterIdAndColor={setLetterIdAndColor}
          onLetterInfo={handleLetterInfo}
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

function Board({ focusWord, letterColors, onLetterInfo }) {
  return (
    <>
      <div id="board">
        <Word
          id="firstword"
          focusWord={focusWord}
          letterColors={letterColors}
          letterInfo={onLetterInfo}
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

function Word({ focusWord, letterColors, letterInfo }) {
  const focusWordArr = focusWord.toUpperCase().split("");

  return (
    <>
      <div id="word">
        <Letter
          id="firstLetter"
          focusLetter={focusWordArr[0]}
          focusColor={letterColors[0]}
          letterInfo={letterInfo}
        ></Letter>
        <Letter
          id="secondLetter"
          focusLetter={focusWordArr[1]}
          focusColor={letterColors[1]}
          letterInfo={letterInfo}
        ></Letter>
        <Letter
          id="thirdLetter"
          focusLetter={focusWordArr[2]}
          focusColor={letterColors[2]}
          letterInfo={letterInfo}
        ></Letter>
        <Letter
          id="fourthLetter"
          focusLetter={focusWordArr[3]}
          focusColor={letterColors[3]}
          letterInfo={letterInfo}
        ></Letter>
        <Letter
          id="fifthLetter"
          focusLetter={focusWordArr[4]}
          focusColor={letterColors[4]}
          letterInfo={letterInfo}
        ></Letter>
      </div>
    </>
  );
}

function Letter({ id, focusLetter, focusColor, letterInfo }) {
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
  }, [id, focusColor, letterInfo]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
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
