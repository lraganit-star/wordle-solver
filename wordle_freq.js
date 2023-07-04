const fs = require('fs');
const csv = require('csvtojson');
const _ = require('lodash');

const csvFilePath = 'unigram_freq.csv'; // Specify path of your csv file here.

const data = fs.readFileSync('words.json',
    { encoding: 'utf8', flag: 'r' });
parsedData = JSON.parse(data)

async function getFiveLetterWords() {
    const jsonObj = await csv().fromFile(csvFilePath);
    const fiveLetterWords = _.filter(jsonObj, (obj) => obj.word.length === 5);
    return fiveLetterWords;
}

async function unionwordlefreq(wordleList) {
    const freq = await getFiveLetterWords();

    const union = wordleList.map(word => {
        const found = freq.find(f => f.word === word);
        return (found) ? found : {word: word, count: 0};
    })

    return union
}

module.exports = { unionwordlefreq }