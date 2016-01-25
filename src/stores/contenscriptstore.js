/**
 * Created by tnguyen on 1/25/2016.
 */

import {createStore, applyMiddleware} from 'redux';
import * as actions from './../constants/actions';

let store = null;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(store==null)return;
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