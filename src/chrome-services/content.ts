import {Account} from "../AccountItem";

console.log("Running content script on:", window.location.href);

chrome.runtime.onMessage.addListener((message: {type:string, params: Account}, sender, sendResponse) => {

    console.log('sender: ', sender);
    if (message.type === 'HIGHLIGHT_BUTTONS_FROM_BG') {
        console.log('Document ', document);
        document.querySelectorAll('button').forEach(btn => {
            btn.style.border = 'solid 2px red';
        });

        const loginFields: NodeListOf<Element> = document.querySelectorAll("input[name='email'], input[type='text']");
        const passwordFields: NodeListOf<Element> = document.querySelectorAll("input[type='password']");

        if (loginFields.length) {
            let loginRef: HTMLInputElement = loginFields.item(0) as HTMLInputElement;
            loginRef.value = message.params.login;
        }

        if (passwordFields.length > 0) {
            let passwordRef: HTMLInputElement = passwordFields.item(0) as HTMLInputElement;
            passwordRef.value = message.params.password;
        }

        sendResponse('Done!');
    }
});


export {}
