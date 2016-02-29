/**
 * Created by tnguyen on 1/25/2016.
 */
import * as actions from './../constants/actions';
export default {
    process:function(action,state,dispatch){
        switch(action.type){
            case actions.PAGE_UPDATED:{
                var contentScript = require("raw!./../injectedscript.txt");
                chrome.devtools.inspectedWindow.eval(contentScript,function(result,isException){
                    if (isException)
                        console.log(isException);
                    else
                        console.log(result);

                });
            }
        }

    }
}