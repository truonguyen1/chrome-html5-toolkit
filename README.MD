Object Visualizer Chrome Extension
==================================

A generic visualizer to visualize tree structure application data using tree UI and JSON ui

Getting started
---------------
#### Installation
    run "npm install"
#### Build
    run "webpack"
### Install Chrome Extension
    1. Go to chrome://extensions
    2. Check Developer mode
    3. Load unpacked extension...
    4. Select "dist/" folder generated when run "webpack"
    "Toolkit" tab should appear when hit F12 (Dev Tool)
### Usage
##### Send actions to extension

    var event = new CustomEvent('messageToExtension', {
			'detail': <MessageObject>
	});
	document.dispatchEvent(event);

ex. Copy below code and execute in console
This is the action to set the new list to the treeview, Tree View will be repopulated with new content.

    var event = new CustomEvent('messageToExtension', {
		'detail':{
              'type':'SET_LIST_DATA',
              'path':'tree',
              'data':{
                  'root':{id:'root','name':'Test Root','childrenIds':[1,2]},
                  1:{'id':1,'name':"Child 1"},
                  2:{'id':2,'name':"Child 2",childrenIds:[3]},
                  3:{'id':3,'name':"Sub Child"}
               }

        }
	});
	document.dispatchEvent(event);

##### Actions:

###### SET_LIST_DATA:
    {
        type: "SET_LIST_DATA",
        path: <"tree"| "attrs">
        data: <Object>
    }
###### SELECT_NODE:
    {
        type: "SELECT_NODE",
        path: <"tree"| "attrs">
        nodeId: <String>
        selection:<Boolean>
    }
###### SET_ATTRIBUTES:
    {
        type:"SET_ATTRIBUTES",
        object:<Object>,
        name:<string>
    }



##### Receive Message from Extension
    document.addEventListener("messageFromExtension", function(event) {
		var message = event.detail;
		handleMessageFromExtension(messageObject);
	}, false);

##### Receiving MessageObject from Extension
* REFRESH: user click on refreshbutton
* SET_INSPECT_MODE:  inspection mode changed
* SELECT_NODE: a node is selected