const fs = require('fs');
const readline = require('readline')

const data = fs.readFileSync('words.json',
    { encoding: 'utf8', flag: 'r' });
parsedData = JSON.parse(data)

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// function randomWordGenerator(wordList) {
//     const wordListLength = wordList.length
//     const word = wordList[Math.floor(Math.random() * wordListLength)]
//     console.log(word)
//     return word
// }

const colorArr =[]

function createColorArr(word) {
    const letters = word.split("")
    const question = (colorArr.length < 5) ? `Can you please tell me the color of the letter "${letters[colorArr.length]}"? ` : "Thank you so much for your help! "
    rl.question(question, (answer) => {
        if (colorArr.length == 5) {
            rl.close();
            return colorArr;
        }

        else {
        colorArr.push(answer.toLowerCase())
        createColorArr(word)
        }

})}


const shortWordList = ["green", "gravy", "grace", "words", "extra", "tapes", "great"]

function reduceWordList (wordList) {
    var changedWordList = wordList
    const colorList = ["green", "green", "green", "green", "green"]
    const letters = "great".split("")
    console.log(letters)

    for (i in colorList) {
        console.log(letters[i])
        if (colorList[i] =="green") {
            const filteredListGreen = changedWordList.filter(word => word.split("")[i] == letters[i])
            changedWordList = filteredListGreen
            console.log("green", changedWordList)

    }
        if (colorList[i]=="yellow") {
            const filteredListYellow = changedWordList.filter(word => { 
                return word.split("")[i] != letters[i] && word.includes(letters[i])
            })
            changedWordList = filteredListYellow
            console.log('yellow', changedWordList)
        }
    else {
        console.log("I'm grey")
    }
}
}

console.log(reduceWordList(shortWordList))