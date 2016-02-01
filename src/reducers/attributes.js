/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
import nodes from './node';

let _defaults = {
    attr_root:{id:'attr_root',name:"Attr Root",childrenIds:[11,12,13]},
    11: {id: 11,name:'Attr 1'},
    12: {id: 12,name:'Attr 2'},
    13: {id: 13,name:'Attr 3',childrenIds:[131,132]},
    131: {id: 131,name:'Attr 3 1'},
    132: {id: 132,name:'Attr 3 2'}
};
export default function (prevState = _defaults,action){
    return nodes(prevState,action);
}