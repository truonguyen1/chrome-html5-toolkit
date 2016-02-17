/**
 * Created by Truong on 1/24/2016.
 */

import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from './toolbar';
import Node from './node';
import * as actions from './../../constants/actions';
import Css from './appcontainer.less';
import { bindActionCreators } from 'redux'
import jQ from 'jquery';
class AppContainer extends  Component{
    constructor(props) {
        super(props)
    }
    handleKeyDown(path,evt){
        const {id,setSelectionExpanded,moveSelectionDown,moveSelectionUp} = this.props;
        let code = evt.keyCode;
        switch(code){
            case 37://Left
                setSelectionExpanded(path,false);
                break;
            case 38://Up
                moveSelectionUp(path);
                break;
            case 39://Right
                setSelectionExpanded(path,true);
                break;
            case  40: //Down
                moveSelectionDown(path);
                break;

        }
    }
    renderAttributes(){
        return (<Node id="root" path="attrs"></Node>);

    }
    renderTree(){
        return (
            <Node id="root" path="tree"></Node>
        );
    }
    render(){
        const {inspectMode=false,setInspectMode,refresh,highlightMode,setHighlightOnSelection} = this.props;

        return(
            <div className="panel-container">
                <div className="panel-header">
                    <Toolbar
                        toggleInspect={()=>setInspectMode(!inspectMode)}
                        onHighlightClick={()=>setHighlightOnSelection(!highlightMode)}
                        onRefreshClick={()=>refresh()}
                        inspectMode={inspectMode} highlightMode={highlightMode}>
                    </Toolbar>
                </div>
                <div className="panel-body">
                    <div>
                        <div className="panel-object-view" tabIndex="1" onKeyDown={this.handleKeyDown.bind(this,"tree")}>
                            {this.renderTree()}
                        </div>
                        <div className="panel-spliter" onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}></div>
                        <div className="panel-attributes-view">
                            <div className="panel-attributes-header">Attributes</div>
                            <div className="panel-attributes-body" tabIndex="2" onKeyDown={this.handleKeyDown.bind(this,"attrs")}>
                                {this.renderAttributes()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AppContainer.propTypes = {

}
function mapDispatchToAppProps(dispatch){
    let setInspectMode = actions.setInspectMode;
    let setSelectionExpanded = actions.setSelectionExpanded;
    let moveSelectionDown = actions.moveSelectionDown;
    let moveSelectionUp = actions.moveSelectionUp;
    let setHighlightOnSelection = actions.setHighlightOnSelection;
    let refresh = actions.refresh;
    return bindActionCreators({ setInspectMode,setSelectionExpanded,moveSelectionDown,moveSelectionUp,refresh,setHighlightOnSelection}, dispatch)
}
function mapStateToAppProps(state){
    return {inspectMode:state.modes.inspectMode,highlightMode:state.modes.highlightMode};
}
export default connect(mapStateToAppProps,mapDispatchToAppProps)(AppContainer);
