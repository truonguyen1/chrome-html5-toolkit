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
        case actions.CLEAR:

            break;
        case actions.ADD_NODE:

            break;
        default:
           return prevState;
    }
}
let _defaultStates = {
    tree:{
        0: {id: 0, name: 'root', childrenIds: [2]},
        2: {id: 2, name: 'child 2', childrenIds: [5]},
        3: {id: 3, name: 'child 3', childrenIds: []},
        4: {id: 4, name: 'child 4', childrenIds: []},
        5: {id: 5, name: 'child 2- 5', childrenIds: []}
    },
    attrs:{
        2:{id:2,name:'child2',childrenIds:[6,7]},
        6:{id:5,name:'child 2-1',childrenIds:[]},
        7:{id:7,name:'child 2- 1',childrenIds:[]}

    }
}
export default function (state = _defaultStates,action){
    const { nodeId,path } = action
    if (typeof nodeId === 'undefined') {
        return state
    }
    if( typeof path ==='undefined') return state;
    if(state[path]==null)return state;
    var copy =  Object.assign({}, state);
    var obj = node(state[path][nodeId], action);
    copy[path][nodeId] = obj
    return copy;

}