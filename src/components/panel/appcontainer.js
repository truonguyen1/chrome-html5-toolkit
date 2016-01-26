/**
 * Created by Truong on 1/24/2016.
 */

import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from './toolbar';
import Node from './node';
import * as actions from './../../constants/actions';
import Css from './appcontainer.less';
class AppContainer extends  Component{
    handleMouseDown(){

    }
    handleMouseUp(){
        console.log(arguments);
    }
    handleMouseMove(){
        console.log(arguments);
    }
    render(){
        const {dispatch, inspectMode,root} = this.props;

        return(
            <div className="panel-container">
                <div className="panel-header shadow-bottom">
                    <Toolbar
                        toggleInspect={
                            ()=>{
                                dispatch(actions.setInspectMode(!inspectMode));
                            }
                        }
                        inspectMode={inspectMode}>
                    </Toolbar>
                </div>
                <div className="panel-body">
                    <div>
                        <div className="panel-object-view">
                            <Node {...root} toggleChildren={(node)=>{
                                dispatch(actions.showChildren(!node.expanded))
                            }}></Node>
                        </div>
                        <div className="panel-spliter"
                             onMouseDown={this.handleMouseDown}
                             onMouseMove={this.handleMouseMove}
                             onMouseUp={this.handleMouseUp}
                        ></div>
                        <div className="panel-attributes-view">
                            <div className="panel-attributes-header">Attributes</div>
                            <div className="panel-attributes-body">

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AppContainer.propTypes = {
    inspectMode:PropTypes.bool.isRequired
}
function mapStateToProps(state){
    return {
        inspectMode:state.modes.inspectMode,
        root:state.treeNodes
    };

}
export default connect(mapStateToProps)(AppContainer);
