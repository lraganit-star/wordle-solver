const fs = require('fs');

const data = fs.readFileSync('words.json',
    { encoding: 'utf8', flag: 'r' });
parsedData = JSON.parse(data)

function randomWord(wordList) {
    const wordListLength = wordList.length
    const word = wordList[Math.floor(Math.random() * wordListLength)]
    return word
}

console.log(randomWord(parsedData))