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

export default function node(prevState = _defaults,action){
    switch(action.type){
        case actions.TOGGLE_SELECTED_CHILDREN:{
            let copy = Object.assign({}, prevState);
            let visible = action.visible;
            traverseNode(null,copy,(node)=>{
                if(node.selected){
                    node.expanded = visible;
                    if(visible && node.children && node.children.length>0){
                        node.selected = false;
                        node.children[0].selected = true;
                    }
                    return true;
                }
                return false;
            });
            return copy;
        }
        case actions.MOVE_SELECTION:
        {
            let copy = Object.assign({}, prevState);
            var isUp = action['isUp'];
            //TODO: HANDLE SELECTION UP AND DOWN
            var selection = null;
            traverseNode(null,copy, (node, parent, index)=> {
                if(node.selected==false)return;
                if (isUp) {
                    if (index == null) {
                        return true;
                    }
                    node.selected =false;
                    if (index == 0) {
                        parent.selected = true;
                        return true;
                    }
                    var sibling = parent.children[index - 1];
                    if (sibling == null)return;
                    parent.children[index - 1].selected = true;
                    return true;
                }
                if (node.expanded == false && parent == null)return;
                node.selected =false;
                if (node.expanded == true) {
                    var child = node.children[0];
                    if (child == null)return;
                    node.children[0].selected = true;
                    return true;
                }
                var sibling = parent.children[index + 1];
                if (sibling == null)return;
                parent.children[index + 1].selected = true;
                return true;

            })
            return copy;
        }
        case actions.SELECT_NODE:
        {
            let copy = Object.assign({}, prevState);
            let id = action['id'];
            let selection = action['selection'];
            traverseNode(null,copy, function (node) {
                if(node.id===id) node.selected = true;
                else node.selected = false;
            });
            return copy;
        }
        case actions.TOGGLE_CHILDREN:
        {
            var copy = Object.assign({}, prevState);
            var id = action['id'];
            traverseNodeById(copy, id, function (node) {
                node.expanded = action['visible'] == null ? !node.expanded : action['visible'];
            });
            return copy;
        }
        default:
            return prevState;
            break;
    }
}