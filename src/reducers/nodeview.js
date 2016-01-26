/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _default = {
    showChildren:false
};
export default function nodeView(prevState =_default,action){
    switch(action.type){
        case actions.SHOW_CHILDREN:
            return {
                showChildren: actions['value']
            };
        default:
            return prevState;

    }
}
