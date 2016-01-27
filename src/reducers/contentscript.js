/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _default = {inspectMode:false};
export default function contentScript(prevState =_default,action){
    switch(action.type){
        case actions.SET_INSPECT_MODE:
            var inspectMode = action['value'];
            return prevState.inspectMode = inspectMode;
        case actions.SEND_TO_EXTENSION:
            chrome.runtime.sendMessage(action['message'], function() {
            });
            return prevState;
        default:
            return prevState;

    }
}
