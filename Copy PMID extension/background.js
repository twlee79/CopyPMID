chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

    shouldAppend = msg.append;

    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    if (shouldAppend) {
      textarea.select();
      document.execCommand("paste", false, null);
      textarea.value = textarea.value  + " " + msg.text;
    } else {
      textarea.value = msg.text;
    }
    

    textarea.select();
    document.execCommand("copy", false, null);
    sendResponse({});
    
  });
