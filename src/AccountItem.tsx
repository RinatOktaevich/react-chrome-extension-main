import React from "react";


interface Account {
  login: string;
  password: string;
  comment: string;
}

const AccountItem: React.FC<{account: Account, onDelete:Function}> = (inputParams) => {
  let {account, onDelete} = inputParams;

  // const sendMessageToActiveTab = async (message:string) => {
  //   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  //   if(tab) {
  //     const response = await chrome.tabs.sendMessage(tab.id!, message);
  //   }
  //   // TODO: Do something with the response.
  // }

  const fillForm = () => {
    /* ------------ */
    // window.postMessage({type : "FROM_PAGE", text : "Hello from the webpage!"}, "*");
    /* ---------- */
    // sendMessageToContentScript();

    // sendMessageToActiveTab('some').then(() => {
    //   console.log('responce from async func')
    // });

    chrome.runtime.sendMessage({ type: 'HIGHLIGHT_BUTTONS' });


  };



  const sendMessageToContentScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: () => {
            chrome.runtime.sendMessage({ type: "change_dom", data: "Hello from React" },
                (response) => {   alert("Page Title: " + response.title); });
          },
        });
      }
    });
  };

  const addLoginAndPassToDOM = () => {
    const loginFields: NodeListOf<Element> = document.querySelectorAll("input[name='email'], input[type='text']");
    const passwordFields: NodeListOf<Element> = document.querySelectorAll("input[type='password']");

    if (loginFields.length > 0) loginFields.item(0).innerHTML = "Some Login"
    if (passwordFields.length > 0) passwordFields.item(0).innerHTML = "Some password";
  }

  return (
    <li onClick={fillForm}>
      {account.login} - {account.comment}
      <button onClick={(e) => { e.stopPropagation(); onDelete(account); }}>X</button>
    </li>
  );
};

export default AccountItem;
