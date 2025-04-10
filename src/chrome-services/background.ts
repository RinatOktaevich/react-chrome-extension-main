

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'HIGHLIGHT_BUTTONS') {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       // let tabId = tabs[0].id;
//       console.log("Tabs: ", tabs);
//       // chrome.scripting.executeScript({
//       //   target: { tabId : tabs[0].id! } ,
//       //   func: () => {
//       //     chrome.runtime.sendMessage({ type: 'HIGHLIGHT_BUTTONS_FROM_BG' });
//       //   }
//       // });
//     });
//   }
// });


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "HIGHLIGHT_BUTTONS") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      if(tabs && tabs.length) {
        const activeTab = tabs[0];
        if (activeTab && activeTab.id) {
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            files:["content.js"]
          });
        } else {
          console.warn("No active tab found.");
        }
      }
    });
  }
});

export {};


/*   func: () => {
              const buttons = document.querySelectorAll("button");
              buttons.forEach((btn) => {
                btn.style.border = "2px solid red";
              });
            },*/