/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _default = {};
export default function messages(prevState =_default,action){
    switch(action.type){
        case actions.SEND_TO_CONTENT_SCRIPT:
            var tabid = chrome.devtools.inspectedWindow.tabId;
            chrome.runtime.sendMessage({
                'type':actions.SEND_TO_CONTENT_SCRIPT,
                'tabId':tabid,
                'message':action['message']
            });
            return prevState;
        default:
            return prevState;

    }
}
