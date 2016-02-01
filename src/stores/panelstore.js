/**
 * Created by tnguyen on 1/25/2016.
 */

import {createStore, applyMiddleware} from 'redux';
import * as actions from './../constants/actions';
let _store =null;
function sendStateChange({ getState,dispatch }) {
    return (next) => (action) => {
        // Call the next dispatch method in the middleware chain.
        let returnValue = next(action);

        let curState = getState();

        if(action.type !== actions.SEND_TO_CONTENT_SCRIPT){
            let message = action;
            //dispatch(actions.sendToContentScript(message));
            console.log("Sent ",message.type," to Background ",message);
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
        //_store.dispatch(actions.createConnectionWithBackground('panel',function(message){
        //    _store.dispatch(message);
        //}));
    }

    return _store;
}