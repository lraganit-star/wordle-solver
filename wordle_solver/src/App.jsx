import { useState, useEffect } from "react";
import "./App.css";

function Page() {
  const [letterColors, setLetterColors] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    setWord("grace");
  });

  const getLetterColors = (color) => {
    const newColor = color;
    const currentLetterColors = [...letterColors, newColor];
    setLetterColors(currentLetterColors);
  };

  return (
    <>
      <div id="page">
        <Board focusWord={word} letterColors={letterColors}></Board>
        <Palette id="palette" onLetterColors={getLetterColors}></Palette>
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
        {/* <Word id="secondword"></Word>
        <Word id="thirdword"></Word>
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
          id="firstletter"
          focusLetter={focusWordArr[0]}
          focusColor={letterColors[0]}
        ></Letter>
        <Letter
          id="secondletter"
          focusLetter={focusWordArr[1]}
          focusColor={letterColors[1]}
        ></Letter>
        <Letter
          id="thirdletter"
          focusLetter={focusWordArr[2]}
          focusColor={letterColors[2]}
        ></Letter>
        <Letter
          id="fourthletter"
          focusLetter={focusWordArr[3]}
          focusColor={letterColors[3]}
        ></Letter>
        <Letter
          id="fifthletter"
          focusLetter={focusWordArr[4]}
          focusColor={letterColors[4]}
        ></Letter>
      </div>
    </>
  );
}

function Letter({ focusLetter, focusColor }) {
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

  // console.log(letterColor);

  return (
    <>
      <div id="letter" style={{ backgroundColor: letterColor }}>
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
      <button id="submit"></button>
    </>
  );
}

export default Page;
