/**
 * Created by Truong on 1/24/2016.
 */

import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../constants/actions';
import Css from './appcontainer.less';
import { bindActionCreators } from 'redux'
import jQ from 'jquery';
class AppContainer extends  Component{
    constructor(props) {
        super(props)
    }
    render(){
        const {inspectMode=false,x,y,width,height} = this.props;
        var styles = {
            left:x+'px',
            top:y+'px',
            width:width+'px',
            height:height+'px'
        }
        if(inspectMode)
            return( <div style={styles} className="node-box"> </div> );
        return null;
    }
}
AppContainer.propTypes = {

}
function mapDispatchToAppProps(dispatch){
    return bindActionCreators({}, dispatch)
}
function mapStateToAppProps(state){
    return {inspectMode:state.inspectMode,x:state.node.x,y:state.node.y,width:state.node.width,height:state.node.height};
}
export default connect(mapStateToAppProps,mapDispatchToAppProps)(AppContainer);
