import React, { useState, useEffect } from "react";
import "./App.css";
import AccountItem from "./AccountItem";

interface Account {
  login: string;
  password: string;
  comment: string;
  createDate: number;
}

enum PageMode {
  List,
  Create
}

function App() {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [mode, setMode] = useState(PageMode.List);

  useEffect(() => {
    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }

    restoreDraft();

    return () => {
      console.log('App onDestroy');
      saveDraft();
    }
  }, []);

  const saveAccounts = (updatedAccounts: Account[]) => {
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);
  };

  /* chrome.storage.local */
  const saveDraft = () => {
    login && localStorage.setItem("login", JSON.stringify(login) );
    password && localStorage.setItem("password", JSON.stringify(password));
    comment && localStorage.setItem("comment", JSON.stringify(comment));
  }

  const restoreDraft = () => {
    let _login = localStorage.getItem('login');
    if (_login) {
      setLogin(_login);
      localStorage.removeItem('login');
    }

    let _pass = localStorage.getItem('password');
    if (_pass) {
      setPassword(_pass);
      localStorage.removeItem('password');
    }

    let _comment = localStorage.getItem('comment');
    if (_comment) {
      setComment(_comment);
      localStorage.removeItem('comment')
    }
  }


  const addAccount = () => {
    if (!login || !password) return;
    let newAccount: Account = {
      login: login,
      password: password,
      comment: comment,
      createDate: new Date().getTime()
    };

    let accountsList = [...accounts, newAccount].sort((a,b) => b.createDate - a.createDate );
    saveAccounts(accountsList);
    clearFormState();
  };

  const clearFormState = () => {
    setLogin("");
    setPassword("");
    setComment("");
  }

  const deleteAccount = (needToDelete: Account) => {
    const newAccounts = accounts.filter((item) => item !==needToDelete);
    saveAccounts(newAccounts);
  };

  return (
      <div>
        <h2>Список аккаунтов</h2>
        <div className="row g-2 flex-column account-list flex-nowrap px-2">
          {accounts.map((account, index) => (
              <AccountItem
                  key={index}
                  account={account}
                  onDelete={deleteAccount}
              />))}
        </div>


        <div className="mt-3 ms-1">
          <h3>Добавить аккаунт</h3>
          <input type="text"
                 className="form-control form-control-sm"
                 placeholder="Login" value={login}
                 onChange={(e) => setLogin(e.target.value)}/>
          <input type="text" placeholder="Password"
                 className="form-control form-control-sm mt-2"
                 value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input type="text"
                 className="form-control form-control-sm mt-2"
                 placeholder="Comment"
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}/>
          <button onClick={addAccount}
                  className="btn btn-sm mt-3 btn-outline-dark">
            Добавить
          </button>
        </div>

      </div>
  );
}

export default App;
