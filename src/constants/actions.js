/**
 * Created by Truong on 1/24/2016.
 */
export const SET_INSPECT_MODE = 'SET_INSPECT_MODE';
export const PANEL_STATE = 'PANEL_STATE';

export const SEND_TO_CONTENT_SCRIPT = 'SEND_TO_CONTENT_SCRIPT';

export const LOG_TYPE = 'LOG';

export const HANDLE_MESSAGE = 'HANDLE_MESSAGE';

/**
 * Create set inspect mode action
 * @param val
 * @returns {{type: string, value: boolean}}
 */
export function setInspectMode(val){
    return {
        type:SET_INSPECT_MODE,
        value:val
    };
}

/**
 * Create send to script action
 * @param val
 * @returns {{type: string, message: *}}
 */
export function sendToContentScript(message){
    return {
        'type': SEND_TO_CONTENT_SCRIPT,
        'message':message
    }
}

export function handleMessage(message){
    return {
        'type': HANDLE_MESSAGE,
        'message':message
    }
}

export const TOGGLE_CHILDREN = 'TOGGLE_CHILDREN';
export function toggleChildren(props){
    return {
        'type': TOGGLE_CHILDREN,
        'value':props
    }
}