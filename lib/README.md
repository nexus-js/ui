# How to Make Your Own Widget

1. Follow the install/build instructions at the bottom of the main NexusUI readme
2. Switch to the *dev* branch.
3. **Do not** work inside dist/nexusUI.js, instead work inside lib/widgets
4. In lib/widgets, duplicate position.js (or another widget file) and use it as a template. Position.js is a good choice because it is commented for this purpose.
5. Rename the file to your new widget name (i.e. tuningfork.js)
6. Add that same name to the list in lib/widgets/index.js. Please keep this in alphabetical order.
7. Modify and build your widget. (See guidelines below)
8. When you have finished making your widget:

  • Build the project with `gulp`
  
  • Test the widget by adding it to one of the /examples pages. Make sure your widget outputs the correct data.
  
  • Send a pull request so I can merge your awesome interface!

--

### Guidelines for development:

  **the constructor** is a good place to define properties of your widget
  
  **.init()** is automatically called when your widget is created. At this point, your canvas has been rendered and you can access auto-generated properties like this.width, this.height, this.canvas, this.context, and many others (see the widget object template in lib/core/widget.js or the nexusUI API for all properties and methods). You probably also want to call .draw() here, to initialize the graphics of your widget.

  **.draw()** should include all of your canvas drawing code (this.context.fillRect(...), etc). 

  **.click(), .move(), and .release()** are called when the widget's canvas is interacted with. Each of these functions is optional. In these functions, you should update your widget's .val using the interaction data stored in .clickPos or .deltaMove, then execute .draw() so that these updated values are visually repesented on the canvas.

  **.transmit()** sends data from the widget. The data sent should be an object with properties for each piece of data (see .val)
  
  **.val** is a required property. It should be a javascript object whose properties will become the output data of the widget.
  
  **.clickPos** is a js object containing the x and y of the most recent touch/click interaction point.
  
  **.deltaMove** is a js object containing the difference between the current x and y interaction point and the previous x and y interaction point.
  
  **.clicked** is automatically set to true when a click or touch has been registered, and set to false upon a mouse/touch release.
