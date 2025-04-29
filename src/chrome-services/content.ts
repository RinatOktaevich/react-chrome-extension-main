import {Account} from "../AccountItem";
import {TabAction} from "./utils/getter";

console.log("Running content script on:", window.location.href);



chrome.runtime.onMessage.addListener((message: {type:TabAction, params: Account, andLogin:boolean}, sender, sendResponse) => {

    if (message.type === TabAction.Login) {

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

        if(message.andLogin) {
            const submitNodes: NodeListOf<Element> = document.querySelectorAll("input[type='submit']");
            if (submitNodes) {
                let submitBtn: HTMLButtonElement = submitNodes.item(0) as HTMLButtonElement;
                submitBtn.click();
            }
        }

        sendResponse('Done!');
    }
});


export {}
