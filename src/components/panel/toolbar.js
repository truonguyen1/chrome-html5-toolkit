/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component} from 'react';
import ToolbarCss from './toolbar.less';

export default class Toolbar extends  Component{
    render(){
        const {toggleInspect,inspectMode} = this.props;
        var classes = 'btn btn-link inspect-btn';
        if(inspectMode){
            classes +=' inspect-on';
        }
        return (
            <nav className="panel-toolbar">
                <a onClick={toggleInspect} className={classes} >
                        <span className="glyphicon glyphicon-zoom-in"></span>
                </a>
             </nav>
        );
    };
}
