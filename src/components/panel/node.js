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
        const {expanded=false,childrenIds=[],setExpanded,id,path} = this.props;
        if(childrenIds.length==0)return '';
        let iconClass = expanded?'glyphicon glyphicon-menu-down':'glyphicon glyphicon-menu-right';
        return  (
            <a className="btn btn-link node-show-children-btn" onClick={()=>setExpanded(id,path,!expanded)}>
                <span className={iconClass}></span>
            </a>
        )
    }
    componentDidMount(){

    }
    renderChildrenNodes(){
        const {childrenIds=[],expanded=false,path} = this.props;
        if(!expanded) return [];
        var arr = [];

        for(var i=0;i<childrenIds.length;i++){
            arr.push(<ConnectedNode
                path = {path}
                key={childrenIds[i]}
                id={childrenIds[i]}></ConnectedNode>)
        }
        return arr;
    }

    render(){
        const {name,selected=false,selectNode,id,path,logNode} = this.props;
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
                <div className={headerClass} onClick={()=>selectNode(id,path,true)}>
                    <div className="node-show-children-action">
                        {this.renderExpandIcon()}
                    </div>
                    <div className="node-title">
                        <span>{name}</span>
                    </div>
                    <div className={actions}>
                        <button onClick={()=>logNode(id,path)} className="btn btn-link"><span className="glyphicon glyphicon-console"></span></button>
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
    let logNode = actions.logNode;
    return bindActionCreators({ setExpanded,selectNode,logNode }, dispatch)
}
function select(node,states){
    var copy = Object.assign({},node);
    var {expandedIds=[],selectedId=''} = states;
    copy.expanded = expandedIds.indexOf(node.id) !=-1;
    copy.selected =selectedId.toString() ===node.id.toString();
    return copy;
}
var ConnectedNode = connect((state,ownProps)=>{
    var tree = state.nodes[ownProps.path];
    if(tree==null) return {};
    var node = tree.list[ownProps.id];
    return select(node,tree);
},mapDispatchToNodeProps)(Node);

export default ConnectedNode;
