/**
 * Created by tnguyen on 1/25/2016.
 */

import {createStore, applyMiddleware} from 'redux';
import * as actions from './../constants/actions';
import jQ from 'jquery';
let store = null;
export function createContentScriptStore(reducer){
    //let createStoreWithMiddleware = applyMiddleware(sendStateChange)(createStore)
    //let store = createStoreWithMiddleware(reducer);
    if(store==null) {
        store = createStore(reducer);
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            console.log("Received ",request.type, " from Background ,request");
        });
        window.addEventListener("message", function(event) {
            if (event.source != window)
                return;
            if (event.data) {
                console.log("Received ", event.data.type, " from page",event.data);
                store.dispatch(actions.sendToExtension(event.data));
            }
        }, false);
    }
    return store;
}