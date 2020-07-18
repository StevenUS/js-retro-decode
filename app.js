console.time('runTime')
const checkWord = require("check-word");
const checkWords = checkWord("en");

var alpha =  "abcdefghijklmnopqrstuvwxyz";
var zalpha = "xgczygkhzjklfcwlgbfghvwxyz";

var text =
    "zf ghyby x wxy gw hxvy x fzckly fcbzlg ghxg cwcgzkhbyf ywhb lwcxl gxckycz? (fybvyb.xfl, ycv vxbf, lwcxl.lbwlybgzyf, wbycch.lbwlybgzyf ygc.)";
// text = "zg ghy fcwly wg x gxfk chxckyf, wy fhwhlz byfcwly xcz fxky fhby ghy byghzbyfycgf xby hlzxgyz clyxbly zc ghy gzckyg fw yvybywcy zf wc ghy fxfy lxky wzgh ghy kwxlf xcz hww gw xchzyvy ghyf."

var words = text.split(" ");

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

function main() {
    var allPossibles = [];
    for (var word of words) {
        allPossibles.push(decypherWord(word));

    }
    // console.log(allPossibles)
    var possibleWords = [];
    for (let possibles of allPossibles) {
        possibleWords.push(printPerms(Object.values(possibles)));
    }
    // console.log(possibleWords)
    // console.timeEnd('runTime')
    // return
    // trimNonEnglishWords(possibleWords);
}

function printPerms(possibles) {
    var words = [];
    for (let i = 0; i < possibles.length; i++) {
        if (i == 0) {
            words = possibles[i];
        } else {
            var newWords = [];
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
    var actualWords = {};
    var curIdx = 0;
    for (let words of possibleWords) {
        for (let word of words) {
            if (checkWords.check(word) || word.length === 1) {
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
main();
console.timeEnd('runTime')
