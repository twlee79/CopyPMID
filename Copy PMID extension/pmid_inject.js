/*
 * CopyPMID Chrome Extension
 * Copyright (c) 2012-2016 Tet Woo Lee
 * chrome at twlee dot nz
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * Inject a 'Copy PMID' button to PubMed pages.
 */

pmid_items = Array.prototype.slice
  .call(
    document.querySelectorAll(".pubmed.identifier, .resc:first-child .rprtid")
    // .pubmed.identifier -> Selector for new version 2020-05-29
    // .resc:first-child .rprtid -> Selector for old version
  )
  .concat(
    Array.prototype.slice
      .call(document.querySelectorAll(".docsum-pmid"))
      .map((x) => x.parentElement)
  ); // .docsum-pmid parent -> Selector for lists new version 2020-05-29

for (i = 0; i < pmid_items.length; i++) {
  mybutton = document.createElement("button");
  mybutton.innerText = "Copy PMID";
  mybutton.id = "CopyPMID";
  mybutton.name = "CopyPMID";
  mybutton.className = "CopyPMID";
  mybutton.type = "button"; // need this to stop it acting as a submit button
  pmid_item = pmid_items[i];
  pmid_item.appendChild(mybutton);
  mybutton.onclick = (function (value) {
    return function (event) {
      buttonClicked(event, value);
    };
  })(pmid_item);
}

function buttonClicked(event, pmid_item) {
  fullText = pmid_item.innerText;
  pmid = fullText.replace(/pmid[^0-9]*([0-9]+).*/i, "$1");
  if (event.shiftKey || event.ctrlKey)
    // holding down shift and ctrl allows appending to clipboard
    shouldAppend = true;
  else shouldAppend = false;
  console.log("Got PMID " + pmid + " from text " + fullText);
  chrome.extension.sendMessage({ append: shouldAppend, text: pmid }); // copy to clipboard using background script
}
