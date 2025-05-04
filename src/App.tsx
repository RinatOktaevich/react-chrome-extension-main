import React, { useState, useEffect } from "react";
import "./App.css";
import AccountItem from "./AccountItem";

export class Account {
  constructor(
      public login?: string,
      public password?: string,
      public comment?: string,
      public createDate?: number) {
  }
}

enum PageMode {
  List,
  Create
}

function App() {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountDraft, setAccountDraft] = useState<Account>(new Account());
  const [mode, setMode] = useState(PageMode.List);

  useEffect(() => {
    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }
    setAccountDraft(new Account());
    restoreDraft();


  }, []);

  const saveAccounts = (updatedAccounts: Account[]) => {
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);
  };

  const saveDraft = () => {
    chrome.storage.local.set({
      'accountDraft': accountDraft
    });
  }

  const restoreDraft = () => {
    chrome.storage.local.get('accountDraft').then((resp) => {
      console.log('chrome.storage.local.get accountDraft: ', resp);
      if(resp.accountDraft) {
        setAccountDraft(resp.accountDraft);
        setMode(PageMode.Create);
      }
    });
  }

  const addAccount = () => {
    if(!accountDraft.login || !accountDraft.password) {
      return;
    }

    accountDraft.createDate = new Date().getTime();

    let accountsList = [...accounts, accountDraft].sort((a,b) => b.createDate! - a.createDate! );
    saveAccounts(accountsList);
    clearFormState();
    chrome.storage.local.remove('accountDraft');
    setMode(PageMode.List);
  };

  const clearFormState = () => {
    setAccountDraft(new Account());
  }

  const onLoginChanged = (loginValue:string) => {
    accountDraft.login = loginValue;
    setAccountDraft({...accountDraft, login: loginValue});
    conditionalDraftSave();
  }

  const onPasswordChanged = (passwordValue:string) => {
    accountDraft.password = passwordValue;
    setAccountDraft({...accountDraft, password: passwordValue});
    conditionalDraftSave();
  }

  const onCommentChanged = (commentValue:string) => {
    accountDraft.comment = commentValue;
    setAccountDraft({...accountDraft, comment: commentValue});
    conditionalDraftSave();
  }

  const deleteAccount = (needToDelete: Account) => {
    const newAccounts = accounts.filter((item) => item.createDate !==needToDelete.createDate);
    saveAccounts(newAccounts);
  };

  const conditionalDraftSave = () => {
    if (isAccountFilled()) {
      saveDraft()
    } else {
      chrome.storage.local.remove('accountDraft');
    }
  }

  const isAccountFilled = () => {
    return (accountDraft.login && accountDraft.login.length) ||
        (accountDraft.password && accountDraft.password.length) ||
    (accountDraft.comment && accountDraft.comment.length);
  }

  const changeMode = (_mode:PageMode) => {
    setMode(_mode);
  }

  return (
      <div>
        { mode === PageMode.Create ? (
            <div className="add-account">
              <div className="header row justify-content-between align-items-center mb-2 mx-0">
                <button className="col col-4 btn btn-sm mt-3 btn-outline-dark"
                        title="Return"
                        onClick={() => {
                          clearFormState();
                          changeMode(PageMode.List);
                        }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                  </svg>
                </button>

                <h6 className="col col-auto mb-0">Добавить аккаунт</h6>
              </div>

              <input type="text"
                     className="form-control form-control-sm"
                     placeholder="Login"
                     value={accountDraft.login}
                     onChange={(e) => onLoginChanged(e.target.value)}/>
              <input type="text" placeholder="Password"
                     className="form-control form-control-sm mt-2"
                     value={accountDraft.password} onChange={(e) => onPasswordChanged(e.target.value)}/>
              <input type="text"
                     className="form-control form-control-sm mt-2"
                     placeholder="Comment"
                 value={accountDraft.comment}
                 onChange={(e) => onCommentChanged(e.target.value)}/>
          <button onClick={addAccount}
                  className="btn btn-sm mt-3 btn-outline-dark">
            Добавить
          </button>
        </div>
          ) :
            ( <div>
              <div className="row justify-content-between">
                <span className="col col-6">Список аккаунтов</span>
                <button className="col col-3 btn btn-sm mt-2 btn-outline-dark fs-1 p-0"
                        title="Add Account"
                        onClick={() => { changeMode(PageMode.Create)}}>
                        +
                </button>
              </div>
              <div className="row g-2 flex-column account-list flex-nowrap px-2 mt-2">
                {accounts.map((account, index) => (
                    <AccountItem
                        key={index}
                        account={account}
                        onDelete={deleteAccount}
                />))}
          </div>
        </div> )
        }

      </div>
  );
}

export default App;
