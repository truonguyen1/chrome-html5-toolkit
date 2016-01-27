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
        console.log('state after dispatch', curState);
        if(action.type !== actions.SEND_TO_CONTENT_SCRIPT){
            let message = {
                'type':actions.PANEL_STATE,
                'message':curState
            };
            dispatch(actions.sendToContentScript(message));
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
        _store.dispatch(actions.createConnectionWithBackground('panel',function(message){
            _store.dispatch(message);
        }));
    }

    return _store;
}