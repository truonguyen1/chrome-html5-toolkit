/**
 * Created by Truong on 1/24/2016.
 */

import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from './toolbar';
import Node from './node';
import * as actions from './../../constants/actions';
import Css from './appcontainer.less';
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
        const {dispatch} = this.props;
        let code = evt.keyCode;
        switch(code){
            case 37://Left
                dispatch(actions.toggleSelectedChildren(false));
                break;
            case 38://Up
                dispatch(actions.moveSelection(true));
                break;
            case 39://Right
                dispatch(actions.toggleSelectedChildren(true));
                break;
            case  40: //Down
                dispatch(actions.moveSelection(false));
                break;

        }
    }
    handleChildrenVisibility(nodeid,visible){
        const {dispatch} = this.props;
        dispatch(actions.toggleChildren(nodeid,visible))
    }
    handleNodeSelection(nodeid){
        const {dispatch} = this.props;
        dispatch(actions.selectNode(nodeid,true));
    }
    handleInspectMode(){
        const {dispatch,inspectMode} = this.props;
        dispatch(actions.setInspectMode(!inspectMode));
    }
    renderAttributes(){
        const {attrs=[]} = this.props;
        var arr = [];
        for(var i=0;i<attrs.length;i++){
            arr.push(
                <Node {...attrs[i]}
                    toggleChildren={this.handleChildrenVisibility.bind(this)}
                    selectNode = {this.handleNodeSelection.bind(this)}
                ></Node>
            )
        }
    }
    render(){
        const {inspectMode,root} = this.props;

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
                            <Node {...root} toggleChildren={this.handleChildrenVisibility.bind(this)} selectNode={this.handleNodeSelection.bind(this)}></Node>
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
    inspectMode:PropTypes.bool.isRequired
}
function mapStateToProps(state){
    return {
        inspectMode:state.modes.inspectMode,
        root:state.treeNodes,
        attrs:state.attributes
    };

}
export default connect(mapStateToProps)(AppContainer);
