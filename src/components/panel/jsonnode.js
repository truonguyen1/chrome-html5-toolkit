/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component,PropTypes} from 'react';

let counter = 0;
class JSONNode extends  Component{
    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }
    renderExpandIcon(){
        const {value} = this.props;
        const {expanded} = this.state;
        if(typeof value!='object' && typeof value!='function')return '';

        if(value==null)return '';
        if(typeof value=='object' && Object.keys(value).length==0)return '';
        if(typeof value=='function')return '';
        let setExpanded = function(){
            this.setState({expanded:!expanded});
        }

        let iconClass = expanded?'glyphicon glyphicon-menu-down':'glyphicon glyphicon-menu-right';
        return  (
            <a className="btn btn-link node-show-children-btn" onClick={setExpanded.bind(this)}>
                <span className={iconClass}></span>
            </a>
        );
    }
    renderChildrenNodes(){
        const {value} = this.props;
        const {expanded} = this.state;
        if(!expanded) return [];
        if(typeof value!='object' || value==null)return [];
        var arr = [];
        var keys = Object.keys(value).sort();
        var key;
        for(var i=0;i<keys.length;i++){
            counter++;
            key = keys[i];
            arr.push(<JSONNode key={counter} name ={key}  value={value[key]} ></JSONNode>);
        }
        return arr;
    }
    render(){
        const {name,value} = this.props;
        let headerClass = 'node-header';
        let actions = 'node-actions';
        let valText = value;
        let valClasses = 'node-value ';

        let type = typeof value;

        if(value===null){
            valText = 'null';
            valClasses += 'node-value-empty';
        }
        else if(value===undefined){
            valText = 'undefined';
            valClasses += 'node-value-empty';
        }
        else if(Array.isArray(value)){
            valText ='Array ['+value.length +']';
            valClasses += 'node-value-array';
        }
        else if(type =='object'){
            valText ='Object {'+Object.keys(value).length +'}';
            valClasses += 'node-value-object';

        }else if(type=='function'){
            valText='function';
            valClasses += 'node-value-function';
        }
        else if (type=='string'){
            valClasses += 'node-value-text';
            valText = '"'+valText+'"';
        }
        else if (type=='boolean'){
            valClasses += 'node-value-boolean';
            valText= valText.toString();
        }
        else if (type=='number'){
            valClasses += 'node-value-number';
        }

        return (
            <div className="node">
                <div className={headerClass}>
                    <div className="node-show-children-action">
                        {this.renderExpandIcon()}
                    </div>
                    <div className="node-title">
                        <span className="node-name-text">{name}</span>
                        <span>:</span>
                        <span  className={valClasses}>{valText}</span>
                    </div>
                    <div className={actions}>
                        <button className="btn btn-link"><span className="glyphicon glyphicon-console"></span></button>
                    </div>
                </div>
                <div className="node-body">
                    {this.renderChildrenNodes()}
                </div>
            </div>
        );
    }
}

JSONNode.propTypes = {
}
export default JSONNode;
