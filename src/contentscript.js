/**
 * ContentScript manages current page,
 * The bridge between active page and the extension
 * Can send and receive message to background page
 *
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            debugger;
        }
    }
);