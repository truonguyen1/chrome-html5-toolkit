/**
 * Created by tnguyen on 1/25/2016.
 */

import {createStore, applyMiddleware} from 'redux';
import * as actions from './../constants/actions';
let _store =null;
let _backgroundConnection = null;
function sendStateChange({ getState,dispatch }) {
    return (next) => (action) => {
        // Call the next dispatch method in the middleware chain.
        let returnValue = next(action);

        let curState = getState();

        if(action.type !== actions.SEND_TO_CONTENT_SCRIPT){
            _backgroundConnection.postMessage({
                'type':actions.SEND_TO_CONTENT_SCRIPT,
                'tabId':chrome.devtools.inspectedWindow.tabId,
                'message':action
            });
            console.log("Panel sent ",action.type," to Background ",action);
        }
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}

export function createPanelStore(reducer){
    let createStoreWithMiddleware = applyMiddleware(sendStateChange)(createStore);
    if(_store==null){
        _store = createStoreWithMiddleware(reducer);

        _backgroundConnection = chrome.runtime.connect({
            name: 'panel'
        });
        _backgroundConnection.postMessage({
            type: actions.HAND_SHAKE,
            tabId: chrome.devtools.inspectedWindow.tabId
        });

        _backgroundConnection.onMessage.addListener(function(message){
            _store.dispatch(message);
        });
    }

    return _store;
}