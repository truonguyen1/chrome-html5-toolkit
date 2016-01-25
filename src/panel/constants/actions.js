/**
 * Created by Truong on 1/24/2016.
 */
export const SET_INSPECT_MODE = 'INSPECT_ON';
export function setInspectMode(val){
    return {
        type:SET_INSPECT_MODE,
        value:val
    };
}