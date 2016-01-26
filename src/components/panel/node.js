/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component,PropTypes} from 'react';
import Css from './node.less';

export default class Node extends  Component{
    render(){
        const {expanded=false,name,children=[],toggleChildren,id} = this.props;

        let iconClass = expanded?'glyphicon glyphicon-chevron-down':'glyphicon glyphicon-chevron-up';
        let nodesClass = expanded?'nodes nodes-visible':'nodes';
        var ns = [];
        for(var i=0;i<children.length;i++){
            ns.push(<Node key={children[i].id} {...children[i]} toggleChildren={()=>{toggleChildren(children[i])}}></Node>)
        }
        return (
            <div className="node">
                <div className="node-header">
                    <div className="node-show-children-action">
                        {children.length > 0 ?
                            <a className="btn btn-link node-show-children-btn" onClick={()=>{toggleChildren(this.props)}}>
                                <span className={iconClass}></span>
                            </a>
                        :''}
                    </div>
                    <div className="node-title">
                        <span>{name}</span>
                    </div>
                </div>
                <div className="node-body">
                    {children.length>0?
                        <div className={nodesClass}>
                            {ns}
                        </div>
                    :''}
                </div>
            </div>
        );
    };
}

Node.propTypes = {
}
