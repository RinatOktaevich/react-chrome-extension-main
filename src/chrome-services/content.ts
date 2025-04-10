

console.log("Running content script on:", window.location.href);
document.querySelectorAll('button').forEach(btn => {
    btn.style.border = 'solid 2px red';
});


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('sender: ', sender);
//     if (message.type === 'HIGHLIGHT_BUTTONS_FROM_BG') {
//         console.log('Document ', document);
//         document.querySelectorAll('button').forEach(btn => {
//             btn.style.border = 'solid 2px red';
//         });
//     }
// });


export {}

// chrome.runtime.onMessage.addListener((request) => {
//   console.log(request);
//
//   if (request.action === "fillForm") {
//     const loginFields: NodeListOf<Element> =  document.querySelectorAll("input[name='email'], input[type='text']");
//     const passwordFields: NodeListOf<Element> = document.querySelectorAll("input[type='password']");
//
//     if (loginFields.length > 0) loginFields.item(0).innerHTML = request.login;
//     if (passwordFields.length > 0) passwordFields.item(0).innerHTML = request.password;
//   }
// });
//


//
// window.addEventListener("message", (event) => {
//   // We only accept messages from ourselves
//   if (event.source !== window) {
//     return;
//   }
//
//   if (event.data.type && (event.data.type === "FROM_PAGE")) {
//     console.log("Content script received: " + event.data.text);
//     let port: chrome.runtime.Port;
//     port = chrome.runtime.connect();
//
//     try {
//       port.postMessage(event.data.text);
//     } finally {
//       port.disconnect();
//     }
//
//   }
//
//
// }, false);
//
// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }
//
//
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "change_dom") {
//     // const pageData = document.title; // Example: Get the page title
//     let currentTab = getCurrentTab().then((res) => {
//       console.log('onMessage via getCurrentTab', currentTab);
//       console.log(res, res)
//     });
//
//     let elements = document.getElementsByTagName('input');
//     console.log('elements: ' ,elements);
//     sendResponse({ title: 'Message responded' });
//   }
// });
// chrome.tabs.getCurrent().then((tab) => {
//   console.log("currentTab is: ", tab);
// })
//
