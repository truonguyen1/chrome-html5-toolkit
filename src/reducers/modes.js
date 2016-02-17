/**
 * Created by Truong on 1/24/2016.
 */
import * as actions from './../constants/actions';

let _default = {inspectMode:false,highlightMode:false};
export default function modes(prevState = _default,action){
    switch(action.type){
        case actions.SET_INSPECT_MODE:
            var copy = Object.assign({},prevState);
            copy.inspectMode = action.value;
            return copy;
        case actions.SET_HIGHLIGHT_MODE:
            var copy = Object.assign({},prevState);
            copy.highlightMode = action.value;
            return copy;
        case actions.REFRESH:
            return prevState;
        default:
            return prevState;
    }
}