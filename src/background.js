/**
 * Started if extension is enabled
 * Have access to all extension api
 * Can send and receive message with content script page
 * Can send and receive message with dev tool page
 * Can also execute script
 * Have no access to window
 */

import * as actions from './constants/actions';




var connections = {};
chrome.browserAction.onClicked.addListener(function(tab) {
    var contentScript = require("raw!./injectedscript.txt");

    //chrome.tabs.executeScript(tab.id,{ file: 'injectedscript.js' });
    chrome.tabs.sendMessage(tab.id,{
        type:"EXECUTE_SCRIPT",
        content:contentScript
    }, function(response) {
        console.log(response);
    });
});
function sendPageUpdatedToPanel(tabId){
    if (tabId in connections) {
        connections[tabId].postMessage({
            'type':actions.PAGE_UPDATED
        });
    } else {
        console.log("Tab not found in connection list.");
    }
}
chrome.webNavigation.onCompleted.addListener(function (obj){
    var tabId = obj['tabId'];
    sendPageUpdatedToPanel(tabId);
});

chrome.runtime.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {

        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        console.log("Received ",message.type, " from DevTool", message);
        if (message.type == actions.HAND_SHAKE) {
            connections[message.tabId] = port;
            sendPageUpdatedToPanel(message.tabId);
            return;
        }
        if (message.type == actions.SEND_TO_CONTENT_SCRIPT) {
            chrome.tabs.sendMessage(message.tabId, message.message, function(response) {
                console.log(response);
            });
            console.log("Forward ",message.type, " to ContentScript", message);
        }

        // other message handling
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
            if (connections[tabs[i]] == port) {
                delete connections[tabs[i]]
                break;
            }
        }
    });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    if (sender.tab) {
        var tabId = sender.tab.id;
        if (tabId in connections) {
            connections[tabId].postMessage(request);
        } else {
            console.log("Tab not found in connection list.");
        }
    } else {
        console.log("sender.tab not defined.");
    }
    return true;
});