/**
 * Created by Truong on 1/24/2016.
 */
import { combineReducers } from 'redux';
import modes from './modes';
import nodes from './node';
import connections from './connections';
import nodeStates from './nodestates';

export default combineReducers({
    modes:modes,
    nodes:nodes,
    nodeStates:nodeStates,
    connections:connections
});
