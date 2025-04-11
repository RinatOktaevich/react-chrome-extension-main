import React, { useState, useEffect } from "react";
import "./App.css";
import AccountItem from "./AccountItem";

interface Account {
  login: string;
  password: string;
  comment: string;
}

function App() {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  const saveAccounts = (updatedAccounts: Account[]) => {
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);
  };

  const addAccount = () => {
    if (!login || !password) return;
    const newAccounts = [...accounts, { login, password, comment }];
    saveAccounts(newAccounts);
    setLogin("");
    setPassword("");
    setComment("");
  };

  const deleteAccount = (needToDelete: Account) => {
    const newAccounts = accounts.filter((item) => item !==needToDelete);
    saveAccounts(newAccounts);
  };

  return (<div>
    <h2>Список аккаунтов</h2>
    <div className="row g-2 flex-column account-list flex-nowrap px-2">
      {accounts.map((account, index) => (
        <AccountItem
          key={index}
          account={account}
          onDelete={deleteAccount}
        />
      ))}
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
                  className="btn btn-sm mt-3 bg-light">
            Добавить
          </button>
        </div>

      </div>
  );
}

export default App;
