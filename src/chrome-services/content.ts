chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "fillForm") {
    const loginFields: NodeListOf<Element> =  document.querySelectorAll("input[name='email'], input[type='text']");
    const passwordFields: NodeListOf<Element> = document.querySelectorAll("input[type='password']");

    if (loginFields.length > 0) loginFields.item(0).innerHTML = request.login;
    if (passwordFields.length > 0) passwordFields.item(0).innerHTML = request.password;
  }
});

export {}
