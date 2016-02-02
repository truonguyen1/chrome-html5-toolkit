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
            console.log("ContentScript Received ",request.type, " from Background ",request);
            var event = new CustomEvent('messageFromExtension', {'detail':request});
            document.dispatchEvent(event);
        });
        document.addEventListener("messageToExtension", function(data) {
            var message = data['detail'];
            store.dispatch(actions.sendToExtension(message));
        });
    }
    return store;
}