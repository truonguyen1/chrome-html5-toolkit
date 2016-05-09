/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Css from './node.less';
import * as actions from './../../constants/actions';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'

class Node extends  Component{
    renderExpandIcon(){
        const {expanded=false,childrenIds=[],setExpanded,id} = this.props;
        if(childrenIds.length==0)return '';
        let iconClass = expanded?'glyphicon glyphicon-menu-down':'glyphicon glyphicon-menu-right';
        return  (
            <a className="btn btn-link node-show-children-btn" onClick={()=>setExpanded(id,!expanded)}>
                <span className={iconClass}></span>
            </a>
        )
    }
    componentDidMount(){

    }
    renderChildrenNodes(){
        const {childrenIds=[],expanded=false} = this.props;
        if(!expanded) return [];
        var arr = [];

        for(var i=0;i<childrenIds.length;i++){
            arr.push(<ConnectedNode
                key={childrenIds[i]}
                id={childrenIds[i]}></ConnectedNode>)
        }
        return arr;
    }

    render(){
        const {name,selected=false,selectNode,id} = this.props;
        let headerClass = 'node-header';
        if(selected){
            headerClass +=' node-selected';
        }
        let actions = 'node-actions';
        if(selected){
            actions += ' node-actions-show';
        }
        return (
            <div className="node">
                <div className={headerClass} onClick={()=>selectNode(id,true)}>
                    <div className="node-show-children-action">
                        {this.renderExpandIcon()}
                    </div>
                    <div className="node-title">
                        <span>{name}</span>
                    </div>
                    <div className={actions}>
                    </div>
                </div>
                <div className="node-body">
                    {this.renderChildrenNodes()}
                </div>
            </div>
        );
    };
}

Node.propTypes = {
}
function mapDispatchToNodeProps(dispatch){
    let setExpanded = actions.setExpanded;
    let selectNode = actions.selectNode;
    return bindActionCreators({ setExpanded,selectNode}, dispatch)
}
function select(id,node,states){
    var copy = Object.assign({},node);
    copy.id = id;
    var {expandedIds=[],selectedId=''} = states;
    copy.expanded = expandedIds.indexOf(id) !=-1;
    copy.selected =selectedId!=null && selectedId.toString() ===id;
    return copy;
}
var ConnectedNode = connect((state,ownProps)=>{
    var tree = state.nodes;
    if(tree==null) return {};
    var node = tree.list[ownProps.id];
    return select(ownProps.id,node,tree);
},mapDispatchToNodeProps)(Node);

export default ConnectedNode;
