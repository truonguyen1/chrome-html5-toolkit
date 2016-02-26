/**
 * ContentScript manages current page,
 * The bridge between active page and the extension
 * Can send and receive message to background page
 *
 */
import * as actions from './constants/actions';
import {createContentScriptStore} from './stores/contenscriptstore';
import contentScript from './reducers/contentscript';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppContainer from './components/contentscript/appcontainer';

var store = createContentScriptStore(contentScript);
var DIV = document.createElement("DIV");
document.body.appendChild(DIV);
ReactDOM.render(
    <Provider store={store}>
        <AppContainer>
        </AppContainer>
    </Provider>,
    DIV
);