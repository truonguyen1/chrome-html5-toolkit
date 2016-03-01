/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component} from 'react';
import ToolbarCss from './toolbar.less';

export default class Toolbar extends  Component{
    render(){
        const {toggleInspect,inspectMode,highlightMode,onRefreshClick,onHighlightClick} = this.props;
        var classes = 'btn btn-link btn-toolbar-action inspect-btn';
        if(inspectMode){
            classes +=' inspect-on';
        }
        var highlight = 'btn btn-link btn-toolbar-action';
        if(highlightMode){
            highlight +=' inspect-on'
        }
        return (
            <nav className="panel-toolbar">
                <a onClick={toggleInspect} className={classes} >
                        <span className="glyphicon glyphicon-zoom-in"></span>
                </a>
                <a onClick={onRefreshClick} className='btn btn-toolbar-action btn-link refresh-btn' >
                    <span className="glyphicon glyphicon-refresh"></span>
                </a>
                <a onClick={onHighlightClick} className={highlight} >
                    <span className="glyphicon glyphicon-pencil"></span>
                </a>
             </nav>
        );
    };
}
