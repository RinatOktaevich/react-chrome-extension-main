import {TabAction} from "./utils/getter";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === TabAction.Login) {
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
