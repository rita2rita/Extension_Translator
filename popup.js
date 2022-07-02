// Поп-ап будет выдавать найденные на странице слова
// показывать перевод слов
// показвать частоту слов на странице
// и убирать слова которые человек уже знает

console.log("i'm from popup.js");

function sortDictionaryByValues(dictionary) {
    // // console.log('dictionary', dictionary);
    let dictionaryArray = Array.from(dictionary);

    // // console.log('dict to array', dictionaryArray);
    let sortedPairsList = dictionaryArray.sort(function (a, b) {
        return b[1] - a[1];
    });
    // // console.log('sorted array', sortedPairsList);
    return sortedPairsList
}


function findLatinLetterOrHyphen(symbol) {
    var numberOfLetter_A = 'A'.charCodeAt(0);
    var numberOfLetter_Z = 'Z'.charCodeAt(0);
    var numberOfLetter_a = 'a'.charCodeAt(0);
    var numberOfLetter_z = 'z'.charCodeAt(0);

    // console.log(numberOfLetter_A, numberOfLetter_Z, numberOfLetter_a, numberOfLetter_z);

    if (numberOfLetter_A <= symbol.charCodeAt(0) && symbol.charCodeAt(0) <= numberOfLetter_Z ||
        numberOfLetter_a <= symbol.charCodeAt(0) && symbol.charCodeAt(0) <= numberOfLetter_z ||
        symbol.charCodeAt(0) == '-'.charCodeAt(0)) {
        return true;
    }
}


function splitText(inputTextFromPageStr) {
    var words = [];
    var wordIndexes = [];
    for (var symbolIndex = 0; symbolIndex < inputTextFromPageStr.length; symbolIndex++) {
        var symbol = inputTextFromPageStr[symbolIndex];

        // console.log('symbol', symbol, symbol.charCodeAt(0));

        if (symbolIndex == (inputTextFromPageStr.length - 1)) {
            wordIndexes.push(symbolIndex);

            // console.log('word indexes', wordIndexes);
            // console.log('last symbol', symbol);

            var firstWordsIndex = wordIndexes[0];
            var lastWordsIndex = wordIndexes[wordIndexes.length - 1];

            // console.log("first word's index", firstWordsIndex);
            // console.log("last word's index", lastWordsIndex);

            var word = inputTextFromPageStr.slice(firstWordsIndex, lastWordsIndex + 1);
            word = word.toLowerCase();

            // console.log('word', word);

            words.push(word);
            wordIndexes.length = 0;
        } else if (findLatinLetterOrHyphen(symbol)) {
            wordIndexes.push(symbolIndex);

            // console.log('word_indexes', wordIndexes);

        } else if (wordIndexes.length == 0) {
            continue;
        } else {
            var firstWordsIndex = wordIndexes[0];
            var lastWordsIndex = wordIndexes[wordIndexes.length - 1];

            // console.log('first words index', firstWordsIndex);
            // console.log('last words index', lastWordsIndex);

            var word = inputTextFromPageStr.slice(firstWordsIndex, lastWordsIndex + 1);
            word = word.toLowerCase();

            // console.log('word', word);

            words.push(word);
            wordIndexes.length = 0;
        }
    }
    console.log('words', words);
    return words;
}


function analyseWord(words) {
    const analysisResultMap = new Map();

    for (const word of words) {
        if (word.length > 2) {
            if (analysisResultMap.has(word)) {
                analysisResultMap.set(word, analysisResultMap.get(word) + 1);
            } else {
                analysisResultMap.set(word, 1);
            }
        }
    }
    // console.log(analysisResultMap);
    return analysisResultMap
}


function doTextFrequencyAnalysis(inner_text) {

    var words = splitText(inner_text);
    var analysisResult = analyseWord(words);
    return sortDictionaryByValues(analysisResult)
}

function doProgram(text) {
    console.log('ду програм в деле');
    // var text = document.body.innerText;
    var result = doTextFrequencyAnalysis(text);
    for (var [key, val] of result) {
        
        //     console.log(key, ":", val, '\n');
        jQuery('.words').append('<li>' + val + ' - ' + key + '</li>');
    }
    return result
}


// // получаем доступ к кнопке
// var button = document.getElementById("button");
// // когда кнопка нажата — находим активную вкладку и запускаем нужную функцию


// function onButtonClick() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, { greeting: "Hi, from sendMessage from popup js script" }, function (response) {
//             return response
//         }).then(response => {
//             console.log("Ответ получен из сонтент скрипта");
//             doProgram(response)
//         });
//         // jQuery('.words').append('clicked');
//     });
// };
// button.addEventListener('click', onButtonClick); 



const button = document.getElementById('button');
button.onclick = async function (e) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    chrome.tabs.sendMessage(tab[0].id, { greeting: "Hi, from sendMessage from popup js script" }, function (response) {
        var x = doProgram(response.text);
        console.log(response.text);
        console.log(x);
    });
}



// function sendMessage(e) {
//     const sending = browser.runtime.sendMessage({content: "message from the content script"});
//     sending.then(handleResponse, handleError);
//   }
//   window.addEventListener("click", sendMessage);



// tabs.forEach(tab => {
//     chrome.tabs.sendMessage(tab.id, { event: "get-thumbnail", parentID: tab.id }, (response) => {
//         if (response !== undefined) {
//             // const info = {title: response.title}
//             // JSON.stringify(info) + `<img alt="${info.title}" src="${response.imageURI}">`
//             log.innerHTML += JSON.stringify(response) + `<br>`
//         }
//     })
// })



// button.addEventListener("click", async () => {
//     // получаем доступ к активной вкладке
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//     // выполняем скрипт
//     chrome.scripting.executeScript({
//         // скрипт будет выполняться во вкладке, которую нашли на предыдущем этапе
//       target: { tabId: tab.id },
//       // вызываем функцию, в которой лежит  функция
//       function: ...,
//     });
//   });