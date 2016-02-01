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
        default:
           return prevState;
    }
}
let _defaultStates = {
    0:{id:0,name:'root',childrenIds:[2]},
    2:{id:2,name:'child 2',childrenIds:[5]},
    3:{id:3,name:'child 3',childrenIds:[]},
    4:{id:4,name:'child 4',childrenIds:[]},
    5:{id:5,name:'child 2- 5',childrenIds:[]}
}
export default function (state = _defaultStates,action){
    const { nodeId } = action
    if (typeof nodeId === 'undefined') {
        return state
    }

    return Object.assign({}, state, {
        [nodeId]: node(state[nodeId], action)
    })

}