/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _defaults = [];
export default function attributes(prevState = _defaults,action){
    switch(action.type){
        case actions.SET_ATTRIBUTES:{
            return action.attributes;
        }
        default:
            return prevState;
            break;
    }
}