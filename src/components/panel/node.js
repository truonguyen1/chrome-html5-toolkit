/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component,PropTypes} from 'react';
import Css from './node.less';
import * as actions from './../../constants/actions';

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
    renderChildrenNodes(){
        const {childrenIds=[],nodeInstance,type,expanded=false} = this.props;
        if(!expanded) return [];
        var NodeInstance = nodeInstance;
        var arr = [];

        for(var i=0;i<childrenIds.length;i++){
            arr.push(<NodeInstance
                nodeInstance={nodeInstance}
                key={childrenIds[i]}
                id={childrenIds[i]}></NodeInstance>)
        }
        return arr;
    }
    render(){
        const {name,selected=false,selectNode,id} = this.props;
        let headerClass = 'node-header';
        if(selected){
            headerClass +=' node-selected';
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

export default Node;
