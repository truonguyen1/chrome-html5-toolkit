import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import AppContainer from './components/panel/appcontainer';
import {Provider} from 'react-redux';
import reducer from './reducers/bundle'
import BootstrapCss from 'bootstrap/less/bootstrap.less';
import * as actions from './constants/actions';

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

let createStoreWithMiddleware = applyMiddleware(sendStateChange)(createStore)
let store = createStoreWithMiddleware(reducer);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer></AppContainer>
    </Provider>,
    document.getElementById('root')
);