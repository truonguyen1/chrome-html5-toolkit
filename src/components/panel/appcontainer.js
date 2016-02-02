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
    }
    handleKeyDown(path,evt){
        const {id,setSelectionExpanded} = this.props;
        let code = evt.keyCode;
        switch(code){
            case 37://Left
                setSelectionExpanded(path,false);
                break;
            case 38://Up
                break;
            case 39://Right
                setSelectionExpanded(path,true,childrenIds[0]);
                break;
            case  40: //Down
                break;

        }
        evt.stopPropagation();
        evt.preventDefault();
    }
    renderAttributes(){
        return (<ConnectedNode id="root" path="attrs" nodeInstance={ConnectedNode} ></ConnectedNode>);

    }
    renderTree(){
        return (
            <ConnectedNode id="root" path="tree" nodeInstance={ConnectedNode}></ConnectedNode>
        );
    }
    render(){
        const {inspectMode=false,setInspectMode} = this.props;

        return(
            <div className="panel-container">
                <div className="panel-header">
                    <Toolbar
                        toggleInspect={()=>setInspectMode(!inspectMode)}
                        inspectMode={inspectMode}>
                    </Toolbar>
                </div>
                <div className="panel-body">
                    <div>
                        <div className="panel-object-view" tabIndex="1" onKeyDown={this.handleKeyDown.bind(this,"tree")}>
                            {this.renderTree()}
                        </div>
                        <div className="panel-spliter" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
                        <div className="panel-attributes-view">
                            <div className="panel-attributes-header">Attributes</div>
                            <div className="panel-attributes-body" tabIndex="2">
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
function mapDispatchToAppProps(dispatch){
    let setInspectMode = actions.setInspectMode;
    return bindActionCreators({ setInspectMode}, dispatch)
}
function mapStateToAppProps(state){
    return {inspectMode:state.modes.inspectMode};
}
function mapDispatchToNodeProps(dispatch){
    let setExpanded = actions.setExpanded;
    let selectNode = actions.selectNode;
    let setSelectionExpanded = actions.setSelectionExpanded;
    return bindActionCreators({ setExpanded,selectNode,setSelectionExpanded }, dispatch)
}

function select(node,states){
    var copy = Object.assign({},node);
    var ids = states.expandedIds;
    copy.expanded = ids.indexOf(node.id) !=-1;
    copy.selected = states.selectedId ===node.id;
    return copy;
}
var ConnectedNode = connect((state,ownProps)=>{
    let node = state.nodes[ownProps.path][ownProps.id];
    return select(node,state.nodeStates[ownProps.path]);
},mapDispatchToNodeProps)(Node);

export default connect(mapStateToAppProps,mapDispatchToAppProps)(AppContainer);
