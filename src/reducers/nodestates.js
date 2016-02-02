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

    if(prevState[path]==null)return prevState;
    let copy = Object.assign({}, prevState);

    switch(action.type){
        case actions.SET_SELECTION_EXPANDED:{
            let selected = copy[path].selectedId;
            let expanded = action.expanded;
            let firstChildId = action.firstChildId;
            //No current selection
            if(selected==null)return prevState;

            //Leaf node
            if(firstChildId==null)return prevState;

            let index = copy[path].expandedIds.indexOf(selected);
            let curExpanded = index!=-1;

            //Same close state
            if(curExpanded===expanded && !expanded)return prevState;

            //Close node
            if(!expanded){
                copy[path].expandedIds.splice(index,1);
                return copy;
            }
            //Open node
            if(!curExpanded){
                copy[path].expandedIds.push(selected);
                return copy;
            }
            copy[path].selectedId = firstChildId;
            return copy;

        }

        case actions.SET_EXPANDED:
            if(nodeId==null)return prevState;
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
            if(nodeId==null)return prevState;
            copy[path].selectedId = nodeId;
            return copy;
        }
        default:
            return prevState;
    }
}