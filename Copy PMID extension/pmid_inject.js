pmid_items = document.querySelectorAll(".rprtid");

for (i=0;i<pmid_items.length;i++) {
  mybutton = document.createElement("button")
  mybutton.innerText = "Copy ID";
  pmid_item = pmid_items[i];
  pmid_item.appendChild(mybutton);
  mybutton.onclick = (function(value) {
    return function(event) { 
      buttonClicked(event, value)
      };
    })(pmid_item);
}


function buttonClicked(event, pmid_item) {
  fullText = pmid_item.innerText;
  pmid = pmid_item.children[1].innerText;
  if (event.shiftKey || event.ctrlKey) shouldAppend = true;
  else shouldAppend = false;
  console.log("Got PMID "+pmid+" from text "+fullText);
  chrome.extension.sendRequest({ append : shouldAppend, text: pmid }); // copy to clipboard using background script
}
