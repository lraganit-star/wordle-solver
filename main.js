const fs = require('fs');
const readline = require('readline')

const data = fs.readFileSync('words.json',
    { encoding: 'utf8', flag: 'r' });
parsedData = JSON.parse(data)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function randomWordGenerator(wordList) {
    const wordListLength = wordList.length
    const word = wordList[Math.floor(Math.random() * wordListLength)]
    return word
}

// function letterColors(word) {
//     for (i in word) {
//         rl.question(`Can you please tell me the color of letter "${word[i]}"`, function(answer){
//             console.log('Thank you');
//             rl.close();
//         })
        
//     }
// }

const colorArr =[]

function letterColors(word) {
    console.log(colorArr)
    const letters = word.split("")
    const question = (colorArr.length < 5) ? `Can you please tell me the color of the letter "${letters[colorArr.length]}"? ` : "Thank you so much for your help! "
    rl.question(question, (answer) => {
        if (colorArr.length == 5) {
            rl.close();
            return;
        }

        else {
        colorArr.push(answer.toLowerCase())
        letterColors(word)
        }

})}
console.log(letterColors("force"))