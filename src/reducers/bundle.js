/**
 * Created by Truong on 1/24/2016.
 */
import { combineReducers } from 'redux';
import modes from './modes';
import treeNodes from './node';
import messages from './messages';

export default combineReducers({
    modes,treeNodes,messages
});
