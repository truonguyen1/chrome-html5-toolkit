/**
 * Created by Truong on 1/24/2016.
 */
import React,{Component} from 'react';
import ToolbarCss from './toolbar.less';

export default class Toolbar extends  Component{
    render(){
        const {toggleInspect,inspectMode,highlightMode,onRefreshClick,onHighlightClick} = this.props;
        var classes = 'btn btn-link inspect-btn';
        if(inspectMode){
            classes +=' inspect-on';
        }
        var highlight = 'btn btn-link';
        if(highlightMode){
            highlight +=' inspect-on'
        }
        return (
            <nav className="panel-toolbar">
                <a onClick={toggleInspect} className={classes} >
                        <span className="glyphicon glyphicon-zoom-in"></span>
                </a>
                <a onClick={onRefreshClick} className='btn btn-link refresh-btn' >
                    <span className="glyphicon glyphicon-refresh"></span>
                </a>
                <a onClick={onHighlightClick} className={highlight} >
                    <span className="glyphicon glyphicon-pencil"></span>
                </a>
             </nav>
        );
    };
}
