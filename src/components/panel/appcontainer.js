/**
 * Created by Truong on 1/24/2016.
 */

import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from './toolbar';
import NodeView from './nodeview';
import * as actions from './../../constants/actions';
import Css from './appcontainer.less';
class AppContainer extends  Component{
    render(){
        const {dispatch, inspectMode,root} = this.props;

        return(
            <div className="panel-container">
                <div className="panel-header">
                    <Toolbar
                        toggleInspect={
                            ()=>{
                                dispatch(actions.setInspectMode(!inspectMode));
                            }
                        }
                        inspectMode={inspectMode}>
                    </Toolbar>,
                </div>
                <div className="panel-body">
                    <div className="panel-object-view">
                        <NodeView {...root} toggleChildren={(node)=>{
                            dispatch(actions.showChildren(!node.isExpanded))
                        }}></NodeView>
                    </div>
                    <div className="panel-attributes-view">Atribute View</div>
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
