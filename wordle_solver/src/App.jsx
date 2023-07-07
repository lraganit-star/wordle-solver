import { useState } from "react";
import "./App.css";

function Board() {
  return (
    <>
      <div id="board">
        <Word id="firstword"></Word>
        <Word id="secondword"></Word>
        <Word id="thirdword"></Word>
        <Word id="fourthword"></Word>
        <Word id="fifthword"></Word>
        <Word id="sixthword"></Word>
      </div>
    </>
  );
}

function Word() {
  return (
    <>
      <div id="word">
        <Letter id="firstletter" />
        <Letter id="secondletter" />
        <Letter id="thirdletter" />
        <Letter id="fourthletter" />
        <Letter id="fifthletter" />
      </div>
    </>
  );
}

function Letter() {
  return (
    <>
      <div id="letter"></div>
    </>
  );
}

export default Board;
