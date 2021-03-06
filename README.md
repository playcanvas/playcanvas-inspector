# PlayCanvas Inspector

Chrome extension for inspecting published PlayCanvas apps.

![Preview](playcanvas-devtools/images/preview-20200715-152807.jpg)

## Installation

1. In Chrome, navigate to chrome://extensions/
2. In the top left of the tab, hit 'Load unpacked'
3. Select the root folder of your clone of the playcanvas-inspector repo

## Enabling the Inspector

Open Chrome DevTools and select the PlayCanvas tab. Press the 'Add devtools' button to add the debug menu to the app.

![DevTools button](playcanvas-devtools/images/devtools-playcanvas-button.jpg)

Note that the Inspector will not activate if the PlayCanvas app is contained within an iframe. Apps published to the https://playcanv.as domain are wrapped in an iframe. For example, this is the link for a PlayCanvas app:

https://playcanv.as/p/2OlkUaxF/

The same app without the iframe requires you to add a `/e` (which stands for embed) to the URL:

https://playcanv.as/e/p/2OlkUaxF/

The Inspector will now be able to activate.

## Available Tools

### Mini Stats
Shows the CPU, GPU and total frame time in ms. Can be enabled/disabled via the menu.

![Mini Stats menu](playcanvas-devtools/images/ministats-menu.jpg)

### Physics debug renderer
Render physics volumes in the scene. Requires the script to be added to the scene first by clicking on `addPhysicsDebug`.

![Physics menu](playcanvas-devtools/images/physics-menu.jpg)
![Physics menu expanded](playcanvas-devtools/images/physics-expanded-menu.jpg)

### Print scene graph
This will print out the scene hierarchy to the console to see the current state is. Really useful if you are adding/removing entities at runtime.

![Print graph menu](playcanvas-devtools/images/print-graph-menu.jpg)

`entitiesOnly` will only print nodes that are entities (no meshInstances)
`enabledNodesOnly` will filter out disabled nodes from the print out
`printPaths` will print out the hierarchy paths of each node which makes it easier to modify the entity on the console

e.g.
```
var e = pc.app.root.findByPath('some/path/to/entity');
e.enabled = false;
```

![Graph entities console](playcanvas-devtools/images/print-graph-entities-only.jpg)

`withFilter` allows you to add use the conditional in the filterString to print out where `node` represents the node to filter.

e.g.
Set the `filterString` to `node.model` will on print nodes with a model component.

![Graph filter with node.model console](playcanvas-devtools/images/print-graph-with-filter-model.jpg)

### Entity picker
Allows you to middle click or touch on any object in the scene and print the details to the console. Useful for finding where entities are in the hierarchy and investigating the current prosperities on said entity. The hierarchy path is also printed to make easier to directly modify the entity on the console.

e.g.
```
var e = pc.app.root.findByPath('some/path/to/entity');
e.enabled = false;
```

![Entity picker menu](playcanvas-devtools/images/entity-picker-menu.jpg)
![Entity picker console](playcanvas-devtools/images/entity-picker.jpg)

The camera list should be set to camera that is used for the current view.
