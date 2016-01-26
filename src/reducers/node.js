/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _defaults = {
    expanded:false,
    name:'Root1',
    id:23,
    children:[
        {id:1,name:'Child 1 LV1 '},
        {id:2,name:'Child 2 LV1 '},
        {id:3,name:'Child 3 LV1 '},
        {id:4 ,name:'Child 4 LV1 '}
    ]
}
export default function node(prevState = _defaults,action){
    switch(action.type){
        case actions.SHOW_CHILDREN:
            var copy = Object.assign({}, prevState);
            copy.expanded = action['value'];
            return copy;
        default:
            return prevState;
            break;
    }
}