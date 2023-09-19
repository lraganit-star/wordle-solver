const fs = require("fs");
const fsPromise = require("fs").promises;
const readline = require("readline");
const _ = require("lodash");
const neatCsv = require("neat-csv");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const wordJSON = fs.readFileSync("../client/src/words.json", {
  encoding: "utf8",
  flag: "r",
});
const wordleArr = JSON.parse(wordJSON);

const csvFilePath = "unigram_freq.csv"; // Specify path of your csv file here.

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

async function myAsyncFunction() {
  try {
    var mainWordList = await frequencyArr();

    function processWord(count) {
      var colorArr = [];
      if (count < 6) {
        var bestWord = mostFrequentWord(mainWordList).word;
        console.log("Your word is: ", bestWord);
        createColorArr(bestWord, colorArr, (result) => {
          mainWordList = reduceWordList(bestWord, mainWordList, result);

          processWord(count + 1);
        });
      } else if (colorArr.every((color) => color == "green")) {
        rl.close();
        return "Congrats on getting the correct word!";
      } else if (count == 6) {
        rl.close();
        return "You have reached the retry limit :( ";
      } else {
        rl.close();
      }
    }
    processWord(0);
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = myAsyncFunction;

function mostFrequentWord(wordList) {
  let maxi = { word: "", count: 0 };
  for (let i in wordList) {
    if (wordList[i].count > maxi.count) {
      maxi = wordList[i];
    }
  }
  return maxi;
}

function createColorArr(word, colorArr, callback) {
  const colorArrMaker = colorArr;
  const letters = word.split("");
  const question =
    colorArrMaker.length < 5
      ? `Can you please tell me the color of the letter "${
          letters[colorArrMaker.length]
        }"? `
      : `Thank you so much for your help! ${colorArrMaker}`;
  rl.question(question, (answer) => {
    if (colorArrMaker.length == 5) {
      callback(colorArrMaker);
    } else {
      colorArrMaker.push(answer.toLowerCase());
      createColorArr(word, colorArr, callback);
    }
  });
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

    // probably have to edit yellow to account for double letters
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
