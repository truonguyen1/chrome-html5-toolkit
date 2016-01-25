/**
 * Created by Truong on 1/24/2016.
 */
import * as actions from './../constants/actions';

let _default = {inspectMode:false};
export default function modes(prevState = _default,action){
    switch(action.type){
        case actions.SET_INSPECT_MODE:
            return {
                inspectMode:action.value
            };
        default:
            return prevState;
    }
}