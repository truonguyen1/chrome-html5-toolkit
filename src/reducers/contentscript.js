/**
 * Created by Truong on 1/24/2016.
 */

import * as actions from './../constants/actions';
let _default = {};
export default function contentScript(prevState =_default,action){
    switch(action.type){
        case actions.HANDLE_MESSAGE:
            var message = action['message'];
            switch( message.type){
                case actions.PANEL_STATE:
                    var state = message.message;
                    console.log("Received ",state);
                    break;
                default:
                    break;
            }
            return prevState;
        default:
            return prevState;

    }
}
