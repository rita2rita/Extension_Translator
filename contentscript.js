console.log("i'm from contentscript");

// send the page title as a chrome message
// chrome.runtime.sendMessage({title:document.title});
// //send the cart as chrome message
// var result = "";
// var cartitems = document.getElementsByClassName("item-list");
// for (var i = 0; i < cartItems.length; i++) {
//     result += cartItems[i].textContent;
//  }
// chrome.runtime.sendMessage({cart:result});


function getAllTextFromPage() {
    let all_text = document.documentElement.innerText;
    console.log('я сейчас беру текст с активной вкладки');
    return all_text
}


var data = getAllTextFromPage();
console.log("data", data);


// chrome.runtime.onMessage.addListener(doProgram);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Message from addListener from contentscript:");
    console.log(request.greeting);
    sendResponse({ text: data });
});


// chrome.runtime.onMessage.addListener((media, sender, sendResponse) => {
//     if (media.event === 'get-thumbnail') {
//         const targetID = media.parentID // where the result putting.

//         /* NO PERMISSION TO USE THE FUNCTION (chrome.tabs) ON THE "content_scripts"
//         const capturing = chrome.tabs.captureVisibleTab(targetID, {
//           format: "jpeg", // png
//           // quality: 75, // 0~100 integer (for jpeg use only)
//         })
//         capturing.then((imageURI)=>{
//           sendResponse({title: document.title, imageURI})
//         }, (error)=>{
//           console.log(`Error: ${error}`)
//         })
//         return true
  
//          */
//         sendResponse({ title: document.title, imageURL: "" })
//     }
// })


// console.log("i'm from contentscript");

// chrome.action.onClicked.addListener(function(tab) {
//     console.log('Injecting content script(s)');
//     chrome.tabs.executeScript(tab.id,{                                 in manifest 2!!!!!
//         code: 'document.body.innerText;'
//     },receiveText);
// }); 