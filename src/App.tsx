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

  console.log('Popup component created!');

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

  const deleteAccount = (index: number) => {
    const newAccounts = accounts.filter((_, i) => i !== index);
    saveAccounts(newAccounts);
  };

  return ( <div>
    <h2>Список аккаунтов</h2>
    <ul>
      {accounts.map((account, index) => (
        <AccountItem
          key={index}
          account={account}
          onDelete={() => deleteAccount(index)}
        />
      ))}
    </ul>
    <h3>Добавить аккаунт</h3>
    <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
    <input type="text" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
    <input type="text" placeholder="Комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
    <button onClick={addAccount}>Добавить</button>
  </div>
  );
}

export default App;
