/**
 * ContentScript manages current page,
 * The bridge between active page and the extension
 * Can send and receive message to background page
 *
 */
import * as actions from './constants/actions';
import {createContentScriptStore} from './stores/contenscriptstore';
import contentScript from './reducers/contentscript';

createContentScriptStore(contentScript);