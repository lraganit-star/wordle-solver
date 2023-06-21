const fs = require('fs');
const readline = require('readline')

const data = fs.readFileSync('words.json',
    { encoding: 'utf8', flag: 'r' });
parsedData = JSON.parse(data)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

main(parsedData)

function main(wordList) {
    var mainWordList = wordList;

    function processWord(count) {
        console.log(mainWordList.length)
        var colorArr = []
        if (count < 6) {
            var randomword = randomWordGenerator(mainWordList);
            createColorArr(randomword, colorArr, (result) => {
                mainWordList = reduceWordList(randomword, mainWordList, result);

                processWord(count + 1);
            })
        }
        
        else if (colorArr.every(color => color == "green")) {
            return ("Congrats on getting the correct word!")
        }

        else if (count == 6) {
            return ("You have reached the retry limit :( ")
        }

        else {
            rl.close();
        }
    }
    processWord(0)
}



function randomWordGenerator(wordList) {
    const wordListLength = wordList.length
    const word = wordList[Math.floor(Math.random() * wordListLength)]
    console.log(word)
    return word
}


function createColorArr(word, colorArr, callback) {
    const colorArrMaker = colorArr
    // console.log('colorArr', colorArrMaker.length, colorArrMaker)
    const letters = word.split("")
    const question = (colorArrMaker.length < 5) ? `Can you please tell me the color of the letter "${letters[colorArrMaker.length]}"? ` : `Thank you so much for your help! ${colorArrMaker}`
    rl.question(question, (answer) => {
        if (colorArrMaker.length == 5) {

            callback(colorArrMaker);
        }

        else {
        colorArrMaker.push(answer.toLowerCase())
        createColorArr(word, colorArr, callback)
        }
}
)
}

function reduceWordList (randomWord, wordList, colorArr) {
    var filteredList = wordList
    const colorList = colorArr
    const letters = randomWord.split("")

    for (i in colorList) {
        if (colorList[i] =="green") {
            const filteredListGreen = filteredList.filter(word => word.split("")[i] == letters[i])
            filteredList = filteredListGreen
            // console.log("green", filteredList)

    }
        if (colorList[i]=="yellow") {
            const filteredListYellow = filteredList.filter(word => { 
                return word.split("")[i] != letters[i] && word.includes(letters[i])
            })
            filteredList = filteredListYellow
            // console.log('yellow', filteredList)
        }
        if (colorList[i] == "gray" ) {
            const filteredListGray = filteredList.filter(word => word.split("")[i] != letters[i])
            filteredList = filteredListGray
            // console.log('gray', filteredList)
        }   
    }
    return filteredList
}

