/**
 * Created by Truong on 1/24/2016.
 */
import { combineReducers } from 'redux';
import modes from './modes';
import treeNodes from './node';
import connections from './connections';
import attributes from './attributes';
import nodeStates from './nodestates';

export default combineReducers({
    modes:modes,
    tree:treeNodes,
    attrs:attributes,
    connections:connections,
    treeStates:nodeStates,
    attrStates:nodeStates
});
