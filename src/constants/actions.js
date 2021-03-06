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

export const SET_EXPANDED = 'SET_EXPANDED';
export function setExpanded(id,value){
    return {
        'type': SET_EXPANDED,
        'nodeId':id,
        'expanded':value
    }
}
export const SET_SELECTION_EXPANDED = 'SET_SELECTION_EXPANDED';
export function setSelectionExpanded(value,firstChildId){
    return {
        'type': SET_SELECTION_EXPANDED,
        'firstChildId':firstChildId,
        'expanded':value
    }
}

export const ADD_NODE = 'ADD_NODE';
export function addNode(parentId,node){
    return {
        'type': ADD_NODE,
        'parentid':parentId,
        'node':node
    }
}


export const SELECT_NODE = 'SELECT_NODE';
export function selectNode(id,selection){
    return {
        'type': SELECT_NODE,
        'nodeId':id,
        'selection':selection
    }
}

export const MOVE_SELECTION = 'MOVE_SELECTION';
export function moveSelection(isUp){
    return {
        'type': MOVE_SELECTION,
        'isUp':isUp
    }
}

export const TOGGLE_SELECTED_CHILDREN = 'TOGGLE_SELECTED_CHILDREN';
export function toggleSelectedChildren(bool){
    return {
        'type': TOGGLE_SELECTED_CHILDREN,
        'visible':bool
    }
}
export const PAGE_UPDATED = 'PAGE_UPDATED';

export const SEND_TO_EXTENSION = 'SEND_TO_EXTENSION';
export function sendToExtension(messsage){
    return {
        'type': SEND_TO_EXTENSION,
        'message':messsage
    }
}
export const HAND_SHAKE = 'HAND_SHAKE';

export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export function addListItem(id,name){
    return {
        id:id,name:name
    }
}

export const SET_ATTRIBUTES = 'SET_ATTRIBUTES';
export function setAttributes(attributes,name){
    return {
        'type': SET_ATTRIBUTES,
        'attributes':attributes,
        'name':name
    }
}

export const SET_ROOT = 'SET_ROOT';
export function setRoot(rootId){
    return {
        'type': SET_ROOT,
        'rooId':rootId
    }
}
export const HIGHLIGHT_NODE = 'HIGHLIGHT_NODE';

export const MOVE_SELECTION_UP = 'MOVE_SELECTION_UP';
export function moveSelectionUp(){
    return {
        'type': MOVE_SELECTION_UP
    }
}


export const MOVE_SELECTION_DOWN = 'MOVE_SELECTION_DOWN';
export function moveSelectionDown(){
    return {
        'type': MOVE_SELECTION_DOWN
    }
}

export const SET_TREE_DATA = 'SET_TREE_DATA';
export function setListData(data){
    return {
        'type': SET_TREE_DATA,
        'data':data
    }
}

export const REFRESH = 'REFRESH';
export function refresh(){
    return {
        'type': REFRESH
    }
}

export const SET_HIGHLIGHT_MODE = 'SET_HIGHLIGHT_MODE';
export function setHighlightOnSelection(bool){
    return {
        'type': SET_HIGHLIGHT_MODE,
        'value':bool
    }
}