/**
 * Created by Truong on 1/24/2016.
 */
import * as actions from './../constants/actions';

export default function inspectReducer(prevState,action){
    switch(action.type){
        case actions.SET_INSPECT_MODE:
            return {
                inspectMode:action.value
            };
            break;
        default:
            return {
                inspectMode:false
            };
            break;
    }
}