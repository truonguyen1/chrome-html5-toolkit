import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import App from './panel/components/App';
import {Provider} from 'react-redux';
import reducer from './panel/reducers/bundle'
import BootstrapCss from 'bootstrap/less/bootstrap.less';

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('root')
);