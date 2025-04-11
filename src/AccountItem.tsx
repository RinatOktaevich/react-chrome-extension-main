import React from "react";


export interface Account {
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

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'HIGHLIGHT_BUTTONS_FROM_BG', params:account}, (response) => {
          if (response) {
            console.log('Response from sendMessage');
            console.log(response);
          }
        });
      }
    });

  };

  return (
    <li onClick={fillForm}>
      {account.login} - {account.comment}
      <button onClick={(e) => { e.stopPropagation(); onDelete(account); }}>X</button>
    </li>
  );
};

export default AccountItem;
