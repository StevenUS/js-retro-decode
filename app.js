// const checkWord = require("check-word");
// const checkWords = checkWord("en");
const readline = require('readline');
const fs = require('fs');

let alpha;
let zalpha;

let text;

let words;

let englishWords;

function getOccurences(letter) {
    var letters = [];
    for (var i = 0; i < zalpha.length; i++) {
        if (zalpha[i] === letter) letters.push(getLetter(i));
    }
    return letters;
}

// get's the decyphered letter
function getLetter(letter) {
    if (alpha[letter]) {
        return alpha[letter];
    } else {
        return "";
    }
}

// returns all of the possible words
function decypherWord(word) {
    const possibles = {};
    let curIdx = 0;
    for (let letter of word) {
        const ocs = getOccurences(letter);
        for (let o of ocs) {
            if (possibles[curIdx]) {
                possibles[curIdx].push(o);
            } else {
                possibles[curIdx] = [o];
            }
        }
        curIdx++;
    }
    return possibles;
}

function printPerms(possibles) {
    let words = [];
    for (let i = 0; i < possibles.length; i++) {
        if (i == 0) {
            words = possibles[i];
        } else {
            const newWords = [];
            for (let char of possibles[i]) {
                for (let word of words) {
                    newWords.push(word + char);
                }
            }
            words = newWords;
        }
    }
    return words;
}

function trimNonEnglishWords(possibleWords) {
    const actualWords = {};
    let curIdx = 0;
    for (let words of possibleWords) {
        for (let word of words) {
            if (englishWords[word] || word.length === 1) {
                if (actualWords[curIdx]) {
                    actualWords[curIdx].push(word);
                } else {
                    actualWords[curIdx] = [word];
                }
            }
        }
        curIdx++;
    }
    for (let k of Object.keys(actualWords)) {
        console.log(k, actualWords[k]);
    }
}

async function processLineByLine() {
    englishWords = {}
    const fileStream = fs.createReadStream('../go-words/english-words/words_alpha.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        englishWords[line] = true;
    }

    console.timeEnd('wordUpload')

    main();
}

function main() {

    console.time('runTime')

    alpha =  "abcdefghijklmnopqrstuvwxyz";
    zalpha = "xgczygkhzjklfcwlgbfghvwxyz";

    text =
        "zf ghyby x wxy gw hxvy x fzckly fcbzlg ghxg cwcgzkhbyf ywhb lwcxl gxckycz? (fybvyb.xfl, ycv vxbf, lwcxl.lbwlybgzyf, wbycch.lbwlybgzyf ygc.)";
    // text = "zg ghy fcwly wg x gxfk chxckyf, wy fhwhlz byfcwly xcz fxky fhby ghy byghzbyfycgf xby hlzxgyz clyxbly zc ghy gzckyg fw yvybywcy zf wc ghy fxfy lxky wzgh ghy kwxlf xcz hww gw xchzyvy ghyf."

    words = text.split(" ");

    const allPossibles = [];
    for (let word of words) {
        allPossibles.push(decypherWord(word));

    }
    // console.log(allPossibles)
    const possibleWords = [];
    for (let possibles of allPossibles) {
        possibleWords.push(printPerms(Object.values(possibles)));
    }
    // console.log(possibleWords)
    // console.timeEnd('runTime')
    // return
    trimNonEnglishWords(possibleWords);
    console.timeEnd('runTime')
}

console.time('wordUpload')
processLineByLine()
