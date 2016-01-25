/**
 * Created by Truong on 1/24/2016.
 */
import { combineReducers } from 'redux'
import inspectReducer from './inspectReducer'
import rootReducer from './rootReducer'

export default combineReducers({
    inspectReducer,
    rootReducer
});
