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

    restoreDraft();

    // return () => {
    //   console.log('App onDestroy');
    //   saveDraft();
    // }
  }, []);

  const saveAccounts = (updatedAccounts: Account[]) => {
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);
  };

  /* chrome.storage.local */
  const saveDraft = () => {
    chrome.storage.local.set({
      'accountDraft': accountDraft
    });
  }

  const restoreDraft = () => {
    chrome.storage.local.get('accountDraft').then((resp) => {
      console.log('chrome.storage.local.get accountDraft: ', resp);
      setAccountDraft(resp.accountDraft);
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
  };

  const clearFormState = () => {
    setAccountDraft(new Account());
  }

  const onLoginChanged = (loginValue:string) => {
    accountDraft.login = loginValue;
    setAccountDraft({...accountDraft, login: loginValue});
    saveDraft();
  }

  const onPasswordChanged = (passwordValue:string) => {
    accountDraft.password = passwordValue;
    setAccountDraft({...accountDraft, password: passwordValue});
    saveDraft();
  }

  const onCommentChanged = (commentValue:string) => {
    accountDraft.comment = commentValue;
    setAccountDraft({...accountDraft, comment: commentValue});
    saveDraft();
  }

  const deleteAccount = (needToDelete: Account) => {
    const newAccounts = accounts.filter((item) => item.createDate !==needToDelete.createDate);
    saveAccounts(newAccounts);
  };

  const changeMode = (_mode:PageMode) => {
    setMode(_mode);
  }

  return (
      <div>
        { mode === PageMode.Create ? (
            <div className="mt-3 ms-1">

          <span>
          <h3>Добавить аккаунт</h3>
            <button className="btn btn-sm mt-3 btn-outline-dark"
                    onClick={() => { changeMode(PageMode.List) }}>
          </button>
          </span>

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
          <div className="header">
            <span>Список аккаунтов</span>
            <button className="btn btn-sm mt-3 btn-outline-dark"
                    onClick={() => {
                      changeMode(PageMode.Create)
                    }}>
            </button>
          </div>
          <div className="row g-2 flex-column account-list flex-nowrap px-2">
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
