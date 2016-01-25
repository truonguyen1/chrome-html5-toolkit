/**
 * ContentScript manages current page,
 * The bridge between active page and the extension
 * Can send and receive message to background page
 *
 */
import * as actions from './constants/actions';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch( request.type){
            case actions.PANEL_STATE:
                var state = request.message;
                console.log("Received ",state);
                break;
            default:
                break;
        }
    }
);