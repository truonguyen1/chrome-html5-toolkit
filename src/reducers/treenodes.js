/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _defaults = {
    isExpanded:false,
    name:'Root1',
    //childrenNodes:[
    //    {isExpanded:false,name:'Child 1 LV1 ',children:[]},
    //    {isExpanded:false,name:'Child 2 LV1 ',children:[]},
    //    {isExpanded:false,name:'Child 3 LV1 ',children:[]},
    //    {isExpanded:false,name:'Child 4 LV1 ',children:[]},
    //]
}
export default function treeNodes(prevState = _defaults,action){
    switch(action.type){
        default:
            return prevState;
            break;
    }
}