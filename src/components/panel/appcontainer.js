/**
 * Created by Truong on 1/24/2016.
 */

import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from './toolbar';
import Node from './node';
import * as actions from './../../constants/actions';
import Css from './appcontainer.less';
import { bindActionCreators } from 'redux'
import jQ from 'jquery';
class AppContainer extends  Component{
    constructor(props) {
        super(props)
        this.handleKeyUpHandler = this.handleKeyUp.bind(this);
        jQ(document).keyup(this.handleKeyUpHandler);
    }
    handleMouseDown(){

    }
    handleMouseUp(){
        console.log(arguments);
    }
    handleMouseMove(){
        console.log(arguments);
    }
    handleKeyUp(evt){
        const {dispatch,treeStates} = this.props;
        if(treeStates.selectedId==null)return;
        let code = evt.keyCode;
        switch(code){
            case 37://Left
                dispatch(actions.setExpanded(treeStates.selectedId,false));
                break;
            case 38://Up
                dispatch(actions.moveSelection(true));
                break;
            case 39://Right
                dispatch(actions.setExpanded(treeStates.selectedId,true));
                break;
            case  40: //Down
                dispatch(actions.moveSelection(false));
                break;

        }
    }

    handleInspectMode(){
        //const {dispatch,inspectMode} = this.props;
        //dispatch(actions.setInspectMode(!inspectMode));
    }
    renderAttributes(){
        return (<AttrNode id="attr_root" nodeInstance={AttrNode} ></AttrNode>);

    }
    renderTree(){
        const {dispatch} = this.props;

        let boundActionCreators = bindActionCreators((actions.selectNode,actions.setExpanded), dispatch)
        return (
            <TreeNode id={0} type="tree" nodeInstance={TreeNode}></TreeNode>
        );
    }
    render(){
        const {inspectMode=false} = this.props;

        return(
            <div className="panel-container" onKeyUp={this.handleKeyUp}>
                <div className="panel-header">
                    <Toolbar
                        toggleInspect={this.handleInspectMode.bind(this)}
                        inspectMode={inspectMode}>
                    </Toolbar>
                </div>
                <div className="panel-body">
                    <div>
                        <div className="panel-object-view">
                            {this.renderTree()}
                        </div>
                        <div className="panel-spliter" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
                        <div className="panel-attributes-view">
                            <div className="panel-attributes-header">Attributes</div>
                            <div className="panel-attributes-body">
                                {this.renderAttributes()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AppContainer.propTypes = {

}

function mapStateToAppProps(state){
    return {treeStates:state.treeStates};
}
function mapDispatchToNodeProps(dispatch){
    let setExpanded = actions.setExpanded;
    let selectNode = actions.selectNode;
    return bindActionCreators({ setExpanded,selectNode }, dispatch)
}

function select(node,states){
    var copy = Object.assign({},node);
    var ids = states.expandedIds;
    copy.expanded = ids.indexOf(node.id) !=-1;
    copy.selected = states.selectedId ===node.id;
    return copy;
}
var TreeNode = connect((state,ownProps)=>{
    var instance = ownProps.nodeInstance;
    if(instance!==TreeNode)return;
    let id = ownProps.id;
    return select(state.tree[id],state.treeStates);
},mapDispatchToNodeProps)(Node);
var AttrNode = connect((state,ownProps)=>{
    var instance = ownProps.nodeInstance;
    if(instance!==AttrNode)return;
    let id = ownProps.id;
    return select(state.attrs[id],state.attrStates);
},mapDispatchToNodeProps)(Node);
export default connect(mapStateToAppProps)(AppContainer);
