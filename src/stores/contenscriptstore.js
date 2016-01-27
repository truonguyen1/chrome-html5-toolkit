/**
 * Created by tnguyen on 1/25/2016.
 */

import {createStore, applyMiddleware} from 'redux';
import * as actions from './../constants/actions';
import jQ from 'jquery';
let store = null;


window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data) {
        console.log("Content script received: ", event.data);
        store.dispatch(actions.sendToExtension(event.data));
    }
}, false);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        let jQuery = jQ;
        if(store==null)return;
        var message = request['message'];
        console.log("Received ",message);
        switch( message.type){
            case actions.PANEL_STATE:
                let state = message.message;
                let inspectMode =  state.modes.inspectMode;
                store.dispatch(actions.setInspectMode(inspectMode));
                break;
            default:
                break;
        }
        store.dispatch(actions.handleMessage(request));
    }
);

export function createContentScriptStore(reducer){
    //let createStoreWithMiddleware = applyMiddleware(sendStateChange)(createStore)
    //let store = createStoreWithMiddleware(reducer);
    if(store==null)
        store = createStore(reducer);
    return store;
}