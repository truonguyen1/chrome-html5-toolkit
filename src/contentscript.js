/**
 * ContentScript manages current page,
 * The bridge between active page and the extension
 * Can send and receive message to background page
 *
 */
import * as actions from './panel/constants/actions';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch( request.type){
            case actions.SEND_INSPECT_MODE:
                var mode = request.content.inspectMode;
                console.log("Received ",request);
                break;
            default:
                break;
        }
    }
);