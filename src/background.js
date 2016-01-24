/**
 * Started if extension is enabled
 * Have access to all extension api
 * Can send and receive message with content script page
 * Can send and receive message with dev tool page
 * Can also execute script
 * Have no access to window
 */
chrome.browserAction.onClicked.addListener(function(tab) {
    //chrome.tabs.sendMessage(tab.id, {"message": "clicked_browser_action"});
    chrome.tabs.executeScript(tab.id,
        { file: 'injectedscript.js' });
});