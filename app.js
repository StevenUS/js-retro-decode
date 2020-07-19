const readline = require("readline");
const fs = require("fs");

const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const CYPHER = "xgczygkhzjklfcwlgbfghvwxyz";
const ENGLISH_WORDS = {};

async function processLineByLine() {
    console.time("wordUpload");

    const fileStream = fs.createReadStream("./words_alpha.txt");

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        ENGLISH_WORDS[line] = true;
    }

    console.timeEnd("wordUpload");

    main();
}

function main() {
    console.time("runTime");

    // const text = "zf ghyby x wxy gw hxvy x fzckly fcbzlg ghxg cwcgzkhbyf ywhb lwcxl gxckycz? (fybvyb.xfl, ycv vxbf, lwcxl.lbwlybgzyf, wbycch.lbwlybgzyf ygc.)";

    const text =
        "zg ghy fcwly wg x gxfk chxckyf, wy fhwhlz byfcwly xcz fxky fhby ghy byghzbyfycgf xby hlzxgyz clyxbly zc ghy gzckyg fw yvybywcy zf wc ghy fxfy lxky wzgh ghy kwxlf xcz hww gw xchzyvy ghyf.";
    // SOLUTION: "If the scope of a task changes, we should rescope and make sure the requirements are updated clearly in the ticket so everyone is on the same page with the goals and how to achieve them."

    const words = text.split(" ");

    const allPossibles = [];
    for (let word of words) {
        allPossibles.push(getPossibleWords(word));
    }

    const possibleWords = [];
    for (let possibles of allPossibles) {
        possibleWords.push(getPermutations(possibles));
    }

    for (let word of possibleWords) {
        console.log(word);
    }

    console.timeEnd("runTime");
}

function getLetters(letter) {
    var letters = [];
    for (var i = 0; i < CYPHER.length; i++) {
        if (CYPHER[i] === letter) letters.push(ALPHA[i]);
    }
    return letters;
}

// returns all of the possible words
function getPossibleWords(cypheredWord) {
    const possibles = [];
    for (let curIdx = 0; curIdx < cypheredWord.length; curIdx++) {
        let letter = cypheredWord[curIdx];
        const letters = getLetters(letter);
        for (let decypheredLetter of letters) {
            if (possibles.length > curIdx) {
                possibles[curIdx].push(decypheredLetter);
            } else {
                possibles.push([decypheredLetter]);
            }
        }
    }
    return possibles;
}

function getPermutations(possibles) {
    let words = [];
    for (let i = 0; i < possibles.length; i++) {
        if (i === 0) {
            words = possibles[i];
        } else {
            const newWords = [];
            for (let char of possibles[i]) {
                for (let word of words) {
                    let newWord = word + char;
                    // once the words are concatenated, check if they are
                    // in the dictionary, and add them to the final list
                    if (newWord.length === possibles.length) {
                        if (ENGLISH_WORDS[newWord]) {
                            newWords.push(newWord);
                        }
                    } else {
                        newWords.push(newWord);
                    }
                }
            }
            words = newWords;
        }
    }
    return words;
}

processLineByLine();
