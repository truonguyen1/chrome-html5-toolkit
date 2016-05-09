/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _list = {};
function list(state = _list,action){
    switch(action.type){
        case actions.ADD_LIST_ITEM:
            var copy =  Object.assign({}, state);
            var id = action.id;
            copy[id] = {id:id,name:action.name};
            return copy;
        default:
            return state;
    }
}
function tree(listReducer){
    let _tree = {
        list:{
            root:{id:'root','name':'Root',childrenIds:[2,3,4,5]},
            2:{id:2,'name':'child 2'},
            3:{id:3,'name':'Child 3'},
            4:{id:4,'name':'Child 4'},
            5:{id:5,'name':'Child 5'}
        },
        rootId:'root'
    };
    let reducer = function(state,action){
        var copy = Object.assign({},_tree,state);
        switch(action.type){
            case actions.ADD_NODE:{
                var a = {
                    type:'ADD_ITEM',
                    'id':action.id,
                    'name':action.name
                };
                var list = listReducer(copy.list,a);
                var curNode = list[action.id];
                if(curNode==null){
                    //NO node is created
                    return state;
                }
                var parent = copy[parentId];
                if(parent==null)return state;

                var siblings = parent.childrenIds;
                siblings = siblings==null?[]:siblings;
                siblings.push(action.id);
                copy[parentId].childrenIds = siblings;

                if(curNode.childrenIds==null) curNode.childrenIds = [];
                curNode.childrenIds = actions.childrenIds;

                copy.list = list;
                return copy;
            }
            case actions.SET_TREE_DATA:{
                var data = action.data;
                copy.list = data;
                return copy;
            }

            case actions.SET_ROOT:{
                return copy;
            }
            default:
                return copy;
        }

    }
    return reducer;
}
let treeReducer = tree(list);

let _default = {
    'expandedIds': [],
    'selectedId': null
};

function treeStateReducer(tReducer){
    function findParent(list,nodeid){
        var node,id;
        for(id in list){
            node = list[id];
            if(!node.childrenIds || node.childrenIds.length<1)continue;
            for(var i=0;i<node.childrenIds.length;i++){
                if(node.childrenIds[i]===nodeid)return id;
            }
        }
        return null;
    }
    function findLeftSibling(list,nodeid){
        var node,id;
        for(id in list){
            node = list[id];
            if(!node.childrenIds || node.childrenIds.length<1)continue;
            for(var i=0;i<node.childrenIds.length;i++){
                if(node.childrenIds[i]===nodeid){
                    if(i==0)return null;
                    return node.childrenIds[i-1];
                }
            }
        }
        return null;
    }
    function findRightSibling(list,nodeid){
        var node,id;
        for(id in list){
            node = list[id];
            if(!node.childrenIds || node.childrenIds.length<1)continue;
            for(var i=0;i<node.childrenIds.length;i++){
                if(node.childrenIds[i]===nodeid){
                    if(i==node.childrenIds.length-1)return null;
                    return node.childrenIds[i+1];
                }
            }
        }
        return null;
    }
    function findFirstChild(list,nodeid){
        var node = list[nodeid];
        if(node==null || !node.childrenIds || node.childrenIds.length<1)return null;
        return node.childrenIds[0];
    }
    function reducer(prevState = _default,action){
        switch(action.type){
            case actions.SET_SELECTION_EXPANDED:{
                var copy = Object.assign({},_default,prevState);
                let selected = copy.selectedId;
                let expanded = action.expanded;
                //No current selection
                if(selected==null)return prevState;

                //Leaf node
                //if(firstChildId==null)return prevState;

                let index = copy.expandedIds.indexOf(selected);
                let curExpanded = index!=-1;

                //Same close state
                if(curExpanded===expanded && !expanded)return prevState;

                //Close node
                if(!expanded){
                    copy.expandedIds.splice(index,1);
                    return copy;
                }
                //Open node
                if(!curExpanded){
                    copy.expandedIds.push(selected);
                    return copy;
                }
                var list = copy.list==null?{}:copy.list;
                var curNode = list[selected];
                if(curNode==null || !curNode.childrenIds || curNode.childrenIds.length<1) return copy;
                copy.selectedId = curNode.childrenIds[0];
                return copy;

            }

            case actions.SET_EXPANDED:
                var copy = Object.assign({},_default,prevState);
                var nodeId = action.nodeId;
                var index =  copy.expandedIds.indexOf(nodeId);
                if(action.expanded) {
                    if(index!=-1) return prevState;
                    copy.expandedIds.push(nodeId);
                    return copy;
                }
                else {
                    if(index==-1)return prevState;
                    copy.expandedIds.splice(index,1);
                    return copy;
                }
            case actions.SELECT_NODE:{
                var copy = Object.assign({},_default,prevState);
                var nodeId = action.nodeId;
                if(copy.selectedId==nodeId) return prevState;
                if(nodeId==null)return prevState;
                var parentId = nodeId;
                while(parentId=findParent(copy.list,parentId)){
                    if(copy.expandedIds.indexOf(parentId)==-1){
                        copy.expandedIds.push(parentId);
                    }
                }
                copy.selectedId = nodeId;
                return copy;
            }
            case actions.MOVE_SELECTION_UP:{
                //TODO: name tree node "lv1.lv2.lv3" for fast lookup
                var copy = Object.assign({},_default,prevState);
                let selected = copy.selectedId;
                if(selected==null)return copy;
                var s = findLeftSibling(copy.list,selected);
                if(s==null){
                    s = findParent(copy.list,selected);
                }
                if(s==null)return copy;
                copy.selectedId = s;
                return copy;
            }
            case actions.MOVE_SELECTION_DOWN:{
                //TODO: name tree node "lv1.lv2.lv3" for fast lookup
                var copy = Object.assign({},_default,prevState);
                let selected = copy.selectedId;
                if(selected==null)return copy;
                var s = findFirstChild(copy.list,selected);
                if(s==null){
                    s = findRightSibling(copy.list,selected);
                }
                if(s==null)return copy;
                copy.selectedId = s;
                return copy;
            }
            default:
                return tReducer(prevState,action);
        }
    }
    return reducer;
}
 export default treeStateReducer(treeReducer);