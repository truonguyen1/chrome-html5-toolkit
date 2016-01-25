/**
 * Created by Truong on 1/24/2016.
 */

import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import Toolbar from './toolbar';
import * as actions from './../../constants/actions';
class AppContainer extends  Component{
    render(){
        const {dispatch, inspectMode} = this.props;

        return(
            <Toolbar
                toggleInspect={
                    ()=>{
                        dispatch(actions.setInspectMode(!inspectMode));
                    }
                }
                inspectMode={inspectMode}>
            </Toolbar>
        );
    }
}
AppContainer.propTypes = {
    inspectMode:PropTypes.bool.isRequired
}
function mapStateToProps(state){
    return {inspectMode:state.modes.inspectMode};

}
export default connect(mapStateToProps)(AppContainer);
