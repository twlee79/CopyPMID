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
 * Background page containing a textarea for copying id.
 */

chrome.extension.onMessage.addListener(function (msg, sender, sendResponse) {

    shouldAppend = msg.append;

    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    if (shouldAppend) {
        textarea.select();
        document.execCommand("paste", false, null);
        textarea.value = textarea.value + " " + msg.text;
    } else {
        textarea.value = msg.text;
    }


    textarea.select();
    document.execCommand("copy", false, null);
    sendResponse({});

});
