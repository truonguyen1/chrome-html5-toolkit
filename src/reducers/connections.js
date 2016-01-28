/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _default = {};
let _backgroundConnection = null;
export default function connections(prevState =_default,action){
    switch(action.type){
        case actions.ESTABLISH_CONNECTION_WITH_BACKGROUND:
            let _callback = action['onMessageCallback']
            _backgroundConnection = chrome.runtime.connect({
                name: action['name']
            });
            _backgroundConnection.postMessage({
                type: actions.HAND_SHAKE,
                tabId: chrome.devtools.inspectedWindow.tabId
            });

            _backgroundConnection.onMessage.addListener(function(message){
                if(typeof _callback=='function')
                    _callback(message);
            });
            return prevState;
        default:
            return prevState;

    }
}
