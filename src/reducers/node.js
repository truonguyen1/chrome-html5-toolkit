/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';

let _defaults = {}

function traverseNode(parent,node,callBack,index){
    var stop = callBack(node,parent,index);
    if(stop)return true;
    if(node.children==null || node.children.length<=0)return;
    for(var i=0;i<node.children.length;i++){
        stop = traverseNode(node,node.children[i],callBack,i);
        if(stop)return true;
    }
}

function traverseNodeById(root,id,callback){
    traverseNode(null,root,(node,parent,index)=>{
        if(node.id===id){
            callback(node,parent,index);
            return true;
        }
        return false;
    })
};

function node(prevState = {},action){
    switch(action.type){
        case actions.SET_NODES:{
            return actions.nodes;
        }
        default:
           return prevState;
    }
}
let _defaultStates = {
    tree:{
        'root': {id: 'root', name: 'Root', childrenIds: []}
    },
    attrs:{
        'root': {id: 'root', name: 'Root', childrenIds: []}
    }
}
export default function (state = _defaultStates,action){
    const { nodeId,path } = action;
    switch (action.type){
        case actions.SET_ROOT:{
            if( typeof path ==='undefined') return state;
            var copy =  Object.assign({}, state);
            copy[path] = action.root;
            return copy;
        }
        default:
        {
            if( typeof path ==='undefined') return state;
            if (typeof nodeId === 'undefined') {
                return state
            }
            if(state[path]==null)return state;
            var copy =  Object.assign({}, state);
            var obj = node(state[path][nodeId], action);
            copy[path][nodeId] = obj
            return copy;
        }

    }


}