/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component,PropTypes} from 'react';
import Css from './nodeview.less';

export default class NodeView extends  Component{
    render(){
        const {isExpanded,name,childrenNodes,toggleChildren} = this.props;

        var iconClass = isExpanded?'glyphicon glyphicon-chevron-down':'glyphicon glyphicon-chevron-up';
        return (
            <div className="node-view">
                <div className="node-view-header">
                    <div className="node-view-expand">
                        <a btn="btn btn-link" onClick={()=>{toggleChildren(this.props)}}>
                            <span className={iconClass}></span>
                        </a>
                    </div>
                    <div className="node-view-title">
                        <span>{{name}}</span>
                    </div>
                </div>
                <div className="node-view-body">
                    { childrenNodes.forEach(node=>{
                        <NodeView {...node} toggleChildren={()=>{toggleChildren(node)}}></NodeView>
                    })}
                </div>
            </div>
        );
    };
}

NodeView.propTypes = {
}
