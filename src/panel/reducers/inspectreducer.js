/**
 * Created by Truong on 1/24/2016.
 */
import * as actions from './../constants/actions';

export default function inspectReducer(prevState,action){
    switch(action.type){
        case actions.SET_INSPECT_MODE:
            var tabid = chrome.devtools.inspectedWindow.tabId;
            chrome.runtime.sendMessage({
                'type':actions.SEND_TO_CONTENT_SCRIPT,
                'content':{
                    'tabId': tabid,
                    'message':{
                        'type':actions.SEND_INSPECT_MODE,
                        'content':prevState
                    }
                }
            });
            return {
                inspectMode:action.value
            };
        default:
            return {
                inspectMode:false
            };
    }
}