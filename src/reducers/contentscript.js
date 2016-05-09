/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _default = {
    inspectMode:false,
    highlightMode:false,
    node:{
        x:0,
        y:0,
        width:20,
        height:30
    }
};
export default function contentScript(prevState =_default,action){
    switch(action.type){
        case actions.SET_INSPECT_MODE:
            var copy = Object.assign({},prevState);
            var inspectMode = action['value'];
            copy.inspectMode = inspectMode;
            return copy;
        case actions.SET_HIGHLIGHT_MODE:
            var copy = Object.assign({},prevState);
            var inspectMode = action['value'];
            copy.highlightMode = inspectMode;
            return copy;
        case actions.HIGHLIGHT_NODE:
            var x = action.x;
            var y = action.y;
            var copy = Object.assign({},prevState);
            copy.node = action.node;
            return copy;
        default:
            if(action.source!='contentscript')return prevState;

            chrome.runtime.sendMessage(action, function() {
            });
            return prevState;
    }
}
