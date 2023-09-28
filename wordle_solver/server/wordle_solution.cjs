const fs = require("fs");
const fsPromise = require("fs").promises;
const readline = require("readline");
const _ = require("lodash");
const neatCsv = require("neat-csv");

const wordJSON = fs.readFileSync("../client/src/words.json", {
  encoding: "utf8",
  flag: "r",
});
const wordleArr = JSON.parse(wordJSON);
const csvFilePath = "unigram_freq.csv";
let mainWordList;
const initialWord = mostFrequentWord(mainWordList).word;
let bestWord = initialWord;

async function frequencyArr() {
  try {
    const data = await fsPromise.readFile(csvFilePath);
    const parsedData = await neatCsv(data);

    let dataMap = {};
    parsedData.forEach((item) => (dataMap[item.word] = parseInt(item.count)));

    const union = wordleArr.map((word) =>
      dataMap[word]
        ? { word, count: dataMap[word] }
        : { word: word, count: parseInt("0") }
    );
    return union;
  } catch (error) {
    console.error("File reading not so happy right now");
  }
}

async function initalizeWordList() {
  mainWordList = await frequencyArr();
}
initalizeWordList();

async function bestWordGenerator(colorArray) {
  console.log("color array", colorArray);

  try {
    return new Promise((resolve, reject) => {
      function processWord(count) {
        if (count < 6) {
          mainWordList = reduceWordList(bestWord, mainWordList, colorArray);
          bestWord = mostFrequentWord(mainWordList).word;
          resolve(bestWord);
          count++;
        }
      }
      processWord(0);
    });
  } catch (error) {
    console.error("Error:", error);
    reject(error);
  }
}

module.exports = {
  bestWordGenerator,
};

function mostFrequentWord(wordList) {
  let mostUsedWord = { word: "", count: 0 };
  for (let i in wordList) {
    if (wordList[i].count > mostUsedWord.count) {
      mostUsedWord = wordList[i];
    }
  }
  return mostUsedWord;
}

function reduceWordList(bestWord, wordList, colorArr) {
  var justWordsArr = [];
  for (let i in wordList) {
    justWordsArr.push(wordList[i].word);
  }

  const colorList = colorArr;
  const letters = bestWord.split("");
  var justWords = justWordsArr;

  for (i in colorList) {
    console.log(justWords.length);
    if (colorList[i] == "green") {
      const filteredListGreen = justWords.filter(
        (word) => word.split("")[i] == letters[i]
      );
      justWords = filteredListGreen;
    }

    if (colorList[i] == "yellow") {
      const filteredListYellow = justWords.filter((word) => {
        return word.split("")[i] != letters[i] && word.includes(letters[i]);
      });
      justWords = filteredListYellow;
    }

    if (colorList[i] == "gray" || colorList[i] == "grey") {
      const filteredListGray = justWords.filter(
        (word) => !word.includes(letters[i])
      );
      justWords = filteredListGray;
    }
  }

  console.log(justWords);
  var filteredList = [];
  for (i in wordList) {
    if (justWords.includes(wordList[i].word)) {
      filteredList.push(wordList[i]);
    }
  }
  console.log(filteredList);
  return filteredList;
}
