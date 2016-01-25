/**
 * Created by Truong on 1/24/2016.
 */
export const SET_INSPECT_MODE = 'SET_INSPECT_MODE';
export const SEND_INSPECT_MODE = 'SEND_INSPECT_MODE';

export const SEND_TO_CONTENT_SCRIPT = 'SEND_TO_CONTENT_SCRIPT';

export const LOG_TYPE = 'LOG_TYPE';

export function setInspectMode(val){
    return {
        type:SET_INSPECT_MODE,
        value:val
    };
}