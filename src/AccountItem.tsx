import React from "react";


interface AccountProps {
  account: {
    login: string;
    password: string;
    comment: string;
  };
  onDelete: () => void;
}

const AccountItem: React.FC<AccountProps> = (props: AccountProps) => {
  const fillForm = () => {
    chrome.runtime.sendMessage({ action: "fillForm", login: props.account.login, password: props.account.password });
  };

  return (
    <li onClick={fillForm}>
      {props.account.login} - {props.account.comment}
      <button onClick={(e) => { e.stopPropagation(); props.onDelete(); }}>X</button>
    </li>
  );
};

export default AccountItem;
