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


  const onPaste = (account:Account) => {

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


  const onPasteAndLogin = (account:Account) => {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'HIGHLIGHT_BUTTONS_FROM_BG', params:account, andLogin:true}, (response) => {
          if (response) {
            console.log('Response from sendMessage');
            console.log(response);
          }
        });
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
          <div className="btn-group btns-block mt-2" role="group">
              {/*<button type="button" className="btn btn-outline-primary">Left</button>*/}
              {/*<button type="button" className="btn btn-outline-primary">Middle</button>*/}
              {/*<button type="button" className="btn btn-outline-primary">Right</button>*/}

              <button
                  className="btn btn-sm btn-outline-light"
                  onClick={(e) => {
                      onPaste(account);
                  }}>Apply
              </button>
              <button
                  className="btn btn-sm btn-outline-light"
                  onClick={(e) => {
                      onPasteAndLogin(account);
                  }}>... Login
              </button>
              <button
                  className="col-2 btn btn-sm btn-outline-danger"
                  onClick={(e) => {
                      onDelete(account);
                  }}>X
              </button>
          </div>


          {/* ------------ */}
          {/*<div className="btns-block mt-2">*/}
          {/*    <button*/}
          {/*        className="btn btn-sm btn-outline-light"*/}
          {/*        onClick={(e) => {*/}
          {/*            e.stopPropagation();*/}
          {/*            onPaste(account);*/}
          {/*        }}>Apply*/}
          {/*    </button>*/}
          {/*    <button*/}
          {/*        className="btn btn-sm ms-2 btn-outline-light"*/}
          {/*        onClick={(e) => {*/}
          {/*            e.stopPropagation();*/}
          {/*            onPasteAndLogin(account);*/}
          {/*        }}>... Login*/}
          {/*    </button>*/}
          {/*    <button*/}
          {/*        className="col-2 btn btn-sm ms-2 btn-outline-danger"*/}
          {/*        onClick={(e) => {*/}
          {/*            e.stopPropagation();*/}
          {/*            onDelete(account);*/}
          {/*        }}>X*/}
          {/*    </button>*/}
          {/*</div>*/}


      </div>
  );
};

export default AccountItem;
