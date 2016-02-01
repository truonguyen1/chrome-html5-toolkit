/**
 * Created by Truong on 1/24/2016.
 */
import * as actions from './../constants/actions';

let _default = {
    'expandedIds':[],
    'selectedId':null
};
export default function nodeStates(prevState = _default,action){
    switch(action.type){
        case actions.SET_EXPANDED:
            let copy = Object.assign({}, prevState);
            if(action.nodeId==null)return prevState;
            var index =  copy.expandedIds.indexOf(action.nodeId);
            if(action.expanded) {
                if(index!=-1) return prevState;
                copy.expandedIds.push(action.nodeId);
                return copy;
            }
            else {
                if(index==-1)return prevState;
                copy.expandedIds.splice(index,1);
                return copy;
            }
        case actions.SELECT_NODE:{
            let copy = Object.assign({}, prevState);
            if(action.nodeId==null)return prevState;
            copy.selectedId = action.nodeId;
            return copy;
        }
        default:
            return prevState;
    }
}