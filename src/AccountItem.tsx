import React from "react";
import {runAction, TabAction} from "./chrome-services/utils/getter";


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

  // const fillForm = () => {
  //
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     if (tabs[0]?.id) {
  //       chrome.tabs.sendMessage(tabs[0].id, {type: TabAction.Login, params:account}, (response) => {
  //         if (response) {
  //           console.log('Response from sendMessage');
  //           console.log(response);
  //         }
  //       });
  //     }
  //   });
  // };


  const onPaste = (account:Account) => {

    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   if (tabs[0]?.id) {
    //     chrome.tabs.sendMessage(tabs[0].id, {type: 'HIGHLIGHT_BUTTONS_FROM_BG', params:account}, (response) => {
    //       if (response) {
    //         console.log('Response from sendMessage');
    //         console.log(response);
    //         window.close();
    //       }
    //     });
    //   }
    // });
    /* ------------- */

      runAction({type: TabAction.Login, params: account}, (response) => {
          if (response) {
              console.log('Response from sendMessage');
              console.log(response);
              window.close();
          }
      });
  };


  const onPasteAndLogin = (account:Account) => {

    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   if (tabs[0]?.id) {
    //     chrome.tabs.sendMessage(tabs[0].id, {type: 'HIGHLIGHT_BUTTONS_FROM_BG', params:account, andLogin:true}, (response) => {
    //       if (response) {
    //         console.log('Response from sendMessage');
    //         console.log(response);
    //       }
    //     });
    //   }
    // });
      /* --------------- */

      runAction({type: TabAction.Login, params: account, andLogin:true}, (response) => {
          if (response) {
              console.log('Response from sendMessage');
              console.log(response);
              window.close();
          }
      });

  };

  return (
      <div className="border rounded-2 p-2">
          <div className="header row justify-content-between">
              <div className="col-auto">{account.login}</div>
          </div>
          <div className="comment">
              {account.comment}
          </div>
          <div className="btn-group btns-block mt-2 w-75" role="group">

              <button className="btn btn-sm btn-outline-dark" title="Paste"
                      onClick={(e) => { onPaste(account) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-file-arrow-down" viewBox="0 0 16 16">
                      <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5"/>
                      <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
                  </svg>
              </button>
              <button title="Paste and Login"
                  className="btn btn-sm btn-outline-dark"
                  onClick={(e) => {
                      onPasteAndLogin(account)
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                      <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                  </svg>
              </button>
              <button className="btn btn-sm btn-outline-secondary"
                      title="Delete"
                      onClick={(e) => { onDelete(account) }}>X
              </button>
          </div>

      </div>
  );
};

export default AccountItem;
