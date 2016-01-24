import Devtool from 'file?name=[name].[ext]!./devtool.html';
import Panel from 'file?name=[name].[ext]!./panel.html';
import Icon from 'file?name=[name].[ext]!./../images/icon48.png';


/**
 * Have access to inspected window
 * Can comunicate with background page
 * Can not talk to content script page
 */
chrome.devtools.panels.create("Toolkit",
    "icon48.png",
    "panel.html",
    function(panel) {
        // code invoked on panel creation
        debugger;
    }
);
