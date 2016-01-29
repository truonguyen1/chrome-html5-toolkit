/**
 * Created by Truong on 1/24/2016.
 */
import { combineReducers } from 'redux';
import modes from './modes';
import treeNodes from './node';
import connections from './connections';
import attributes from './attributes';

export default combineReducers({
    modes,treeNodes,connections,attributes
});
