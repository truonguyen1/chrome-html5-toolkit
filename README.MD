Object Visualizer Chrome Extension
==================================

A generic visualizer to visualize tree structure application data using tree UI and JSON ui

### Installation
    run "npm install"
### Build
    run "webpack"
### Install Chrome Extension
    1. Go to chrome://extensions
    2. Check Developer mode
    3. Load unpacked extension...
    4. Select "dist/" folder generated when run "webpack"
    "Toolkit" tab should appear when hit F12 (Dev Tool)
### Usage
#### Send actions to extension

    var event = new CustomEvent('messageToExtension', {
			'detail': <Action>
	});
	document.dispatchEvent(event);

#### Actions:

##### Set Tree View Data (left section):
    {
        type: "SET_TREE_DATA",
        rootId:<string>,
        list:{
            <id>:{childrenIds:<Array>}
        }
    }

Copy below code and execute in console.

    var event = new CustomEvent('messageToExtension', {
		'detail':{
              'type':'SET_TREE_DATA',
              'rootId':'root',
              'list':{
                    root:{'name':'Test Root','childrenIds':[1,2]},
                    1:{'name':"Child 1"},
                    2:'name':"Child 2",childrenIds:[3]},
                    3:{'name':"Sub Child"}
              }
        }
	});
	document.dispatchEvent(event);

##### Highlight Node:

Highlight node with node(x,y,width,height)

    {
        type: "HIGHLIGHT_NODE",
        node:{
            x:<Number>,
            x:<Number>,
            width:<Number>,
            height:<Number>
        }
    }
##### Select Node:
    {
        type: "SELECT_NODE",
        nodeId: <String>
        selection:<Boolean>
    }
##### Set Json Viewer Data (right section):
    {
        type:"SET_ATTRIBUTES",
        object:<Object>,
        name:<string>
    }

Copy below code and execute in console.

    var event = new CustomEvent('messageToExtension', {
		'detail':{
              'type':'SET_ATTRIBUTES',
              'name':'Attributes':
              'object':{
                  atrr1:{'name':'Atribute 1','value':1},
                  atrr2:{'name':'Atribute 2','value':2},
                  atrr3:3
               }
        }
	});
	document.dispatchEvent(event);


#### Receive Message from Extension
    document.addEventListener("messageFromExtension", function(event) {
		var message = event.detail;
		handleMessageFromExtension(messageObject);
	}, false);

##### Actions
* REFRESH: user click on refresh button
* SET_INSPECT_MODE:  inspection mode changed
* SELECT_NODE: a node is selected