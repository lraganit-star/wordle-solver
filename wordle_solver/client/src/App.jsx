import React, { useState, useEffect } from "react";
import "./App.css";

function Page() {
  const [letterColors, setLetterColors] = useState([]);
  const [words, setWords] = useState("");
  const [undoLetter, setUndoLetter] = useState("");
  const [buttonCount, setButtonCount] = useState(0);

  useEffect(() => {
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWords(data.bestWord);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  const getLetterColors = (color) => {
    if (letterColors == 5) {
      return;
    }
    const currentLetterColors = [...letterColors, color];
    setLetterColors(currentLetterColors);
  };

  const handleUndoLetter = (letter) => {
    setUndoLetter(letter);
  };

  const handleUndoColor = (color) => {
    handleUndo(undoLetter, color);
  };

  function handleUndo(undoLetter, undoColor) {
    if (!undoColor) {
      return;
    }

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
    setUndoLetter("");
  }

  const handleDeleteKey = (e) => {
    if ((e.ctrlKey && e.key === "z") || e.key === "Backspace") {
      const deleteLast = [...letterColors];
      deleteLast.pop();
      setLetterColors(deleteLast);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleDeleteKey);
    return () => {
      window.removeEventListener("keydown", handleDeleteKey);
    };
  }, [letterColors, setLetterColors]);

  const handleSubmit = () => {
    if (buttonCount == 0) {
      setLetterColors([]);

      fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colorArray: [] }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));

      setButtonCount(buttonCount + 1);
    }
    if (letterColors.length != 5) {
      return;
    }
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ colorArray: letterColors }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    setLetterColors([]);
  };

  return (
    <>
      <div id="page">
        <Board
          words={words}
          letterColors={letterColors}
          onUndoLetter={handleUndoLetter}
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

function Board({ words, letterColors, onUndoLetter }) {
  return (
    <>
      <div id="board">
        <Word
          id="firstword"
          focusWord={words}
          letterColors={letterColors}
          undoLetter={onUndoLetter}
        ></Word>
        {/* <Word
          id="secondword"
          focusWord={words[1]}
          letterColors={letterColors}
          undoLetter={onUndoLetter}
        ></Word> */}
        {/* <Word id="thirdword"></Word>
        <Word id="fourthword"></Word>
        <Word id="fifthword"></Word>
        <Word id="sixthword"></Word> */}
      </div>
    </>
  );
}

function Word({ focusWord, letterColors, undoLetter }) {
  const focusWordArr = focusWord.toUpperCase().split("");

  return (
    <>
      <div id="word">
        <Letter
          id="firstLetter"
          focusLetter={focusWordArr[0]}
          focusColor={letterColors[0]}
          undoLetter={undoLetter}
        ></Letter>
        <Letter
          id="secondLetter"
          focusLetter={focusWordArr[1]}
          focusColor={letterColors[1]}
          undoLetter={undoLetter}
        ></Letter>
        <Letter
          id="thirdLetter"
          focusLetter={focusWordArr[2]}
          focusColor={letterColors[2]}
          undoLetter={undoLetter}
        ></Letter>
        <Letter
          id="fourthLetter"
          focusLetter={focusWordArr[3]}
          focusColor={letterColors[3]}
          undoLetter={undoLetter}
        ></Letter>
        <Letter
          id="fifthLetter"
          focusLetter={focusWordArr[4]}
          focusColor={letterColors[4]}
          undoLetter={undoLetter}
        ></Letter>
      </div>
    </>
  );
}

function Letter({ id, focusLetter, focusColor, undoLetter }) {
  let letBorderColor = "#878a8c";

  const letterColor = (() => {
    switch (focusColor) {
      case "green": {
        return { backgroundColor: "#6aaa64", borderColor: letBorderColor };
      }
      case "yellow": {
        return { backgroundColor: "#c9b458", borderColor: letBorderColor };
      }
      case "grey": {
        return { backgroundColor: "#787c7e", borderColor: letBorderColor };
      }
    }
  })();

  const handleClick = (e) => {
    e.preventDefault();
    undoLetter(id);
    letBorderColor = "blue";
    console.log("click");
  };

  return (
    <>
      <div
        className={"letter"}
        id={id}
        style={letterColor}
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
