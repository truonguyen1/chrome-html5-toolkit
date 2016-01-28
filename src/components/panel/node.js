/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component,PropTypes} from 'react';
import Css from './node.less';

export default class Node extends  Component{

    handleExpanseClick(){
        const{id,toggleChildren} = this.props;
        toggleChildren(id);
    }

    handleHeaderClick(evt){
        const {id,selectNode} = this.props;
        selectNode(id);
    }
    renderExpandIcon(){
        const {expanded=false,children=[]} = this.props;
        if(children.length==0)return '';
        let iconClass = expanded?'glyphicon glyphicon-menu-down':'glyphicon glyphicon-menu-right';
        return  (
            <a className="btn btn-link node-show-children-btn" onClick={this.handleExpanseClick.bind(this)}>
                <span className={iconClass}></span>
            </a>
        )
    }
    renderChildren(){
        const {expanded=false,children=[],toggleChildren,selectNode} = this.props;
        if(children.length==0 || !expanded)return '';
        var arr = [];
        for(var i=0;i<children.length;i++){
            arr.push(<Node
                key={children[i].id} {...children[i]}
                selectNode={selectNode}
                toggleChildren={toggleChildren}
            ></Node>);
        }
        return (
            <div className={expanded?'nodes nodes-visible':'nodes'}>
                {arr}
            </div>
        );
    }
    render(){
        const {name,selected} = this.props;
        let headerClass = 'node-header';
        if(selected){
            headerClass +=' node-selected';
        }
        return (
            <div className="node">
                <div className={headerClass} onClick={this.handleHeaderClick.bind(this)}>
                    <div className="node-show-children-action">
                        {this.renderExpandIcon()}
                    </div>
                    <div className="node-title">
                        <span>{name}</span>
                    </div>
                </div>
                <div className="node-body">
                    {this.renderChildren()}
                </div>
            </div>
        );
    };
}

Node.propTypes = {
}
