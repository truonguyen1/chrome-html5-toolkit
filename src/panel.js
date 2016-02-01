import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/panel/appcontainer';
import {Provider} from 'react-redux';
import reducer from './reducers/bundle'
import BootstrapCss from 'bootstrap/less/bootstrap.less';
import {createPanelStore} from './stores/panelstore';

let panelStore = createPanelStore(reducer);

ReactDOM.render(
    <Provider store={panelStore}>
        <AppContainer>
        </AppContainer>
    </Provider>,
    document.getElementById('root')
);