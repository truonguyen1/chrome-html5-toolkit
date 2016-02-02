/**
 * Created by Truong on 1/24/2016.
 */
import * as actions from './../constants/actions';

let _default = {
    tree: {
        'expandedIds': [],
        'selectedId': null
    },
    attrs:{
        'expandedIds': [],
        'selectedId': null
    }

};
export default function nodeStates(prevState = _default,action){
    const {path,nodeId} = action;
    if(path==null)return prevState;
    if(nodeId==null)return prevState;
    if(prevState[path]==null)return prevState;
    let copy = Object.assign({}, prevState);

    switch(action.type){
        case actions.SET_EXPANDED:
            var index =  copy[path].expandedIds.indexOf(nodeId);
            if(action.expanded) {
                if(index!=-1) return prevState;
                copy[path].expandedIds.push(nodeId);
                return copy;
            }
            else {
                if(index==-1)return prevState;
                copy[path].expandedIds.splice(index,1);
                return copy;
            }
        case actions.SELECT_NODE:{
            copy[path].selectedId = nodeId;
            return copy;
        }
        default:
            return prevState;
    }
}