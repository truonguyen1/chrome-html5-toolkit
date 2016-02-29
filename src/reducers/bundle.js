/**
 * Created by Truong on 1/24/2016.
 */
import { combineReducers } from 'redux';
import modes from './modes';
import nodes from './node';

function instances(r,defaults={}){
    let reducer = function(state=defaults,action){
        var key = action.path;
        if(key==null) return state;
        var copy =  Object.assign({}, state);
        var s = copy[key];
        var obj = r(s,action);
        copy[key] = obj;
        return copy;
    }
    return reducer;
}
let _nodes = {
    'tree':{
        list:{
            root:{id:'root','name':'Root',childrenIds:[2,3,4,5]},
            2:{id:2,'name':'child 2'},
            3:{id:3,'name':'Child 3'},
            4:{id:4,'name':'Child 4'},
            5:{id:5,'name':'Child 5'}
        },
        rootId:'root'
    },
    'attrs':{
        list:{
            root:{id:'root','name':'Root',childrenIds:[2,3,4,5]},
            2:{id:2,'name':'child 2'},
            3:{id:3,'name':'Child 3'},
            4:{id:4,'name':'Child 4'},
            5:{id:5,'name':'Child 5',childrenIds:[6,7,8]},
            6:{id:6,'name':'child 6'},
            7:{id:7,'name':'Child 7'},
            8:{id:8,'name':'Child 8'}
        },
        rootId:'root'
    }
};
let _defaultAttrs = {
    'name':'root',
    'value':null
}
function attrs(prevState=_defaultAttrs,action){
    switch(action.type){
        case 'SET_ATTRIBUTES':{
            var copy =  Object.assign({}, prevState);
            copy.name = action.name;
            copy.value = action.object;
            return copy;
        }
        default:
            return prevState;
    }
}
export default combineReducers({
    modes:modes,
    attrs:attrs,
    nodes:instances(nodes,_nodes)
});
