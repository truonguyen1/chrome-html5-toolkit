/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _defaults = {
    expanded:false,
    name:'Root1',
    id:23,
    children:[
        {id:1,name:'Child 1 LV1 ',children:[
            {id:11,name:"child 11 LV2"},
            {id:12,name:"child 121 LV2"},
            {id:13,name:"child 14 LV2"}

        ]},
        {id:2,name:'Child 2 LV1 '},
        {id:3,name:'Child 3 LV1 '},
        {id:4 ,name:'Child 4 LV1 '}
    ]
}

function traverseNode(node,callBack){
    var stop = callBack(node);
    if(stop)return true;
    if(node.children==null || node.children.length<=0)return;
    for(var i=0;i<node.children.length;i++){
        stop = traverseNode(node.children[i],callBack);
        if(stop)return true;
    }
}

export default function node(prevState = _defaults,action){
    switch(action.type){
        case actions.TOGGLE_CHILDREN:
            var copy = Object.assign({}, prevState);
            var id = action['value'];
            traverseNode(copy,function(node){
                if(node.id===id){
                    node.expanded = !node.expanded;
                    return true;
                }
                return false;
            });
            return copy;
        default:
            return prevState;
            break;
    }
}