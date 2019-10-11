# Color
Simple javascript library for manipulation color, including cmyk and text contrast.

## Dependencies
None.

## Installation
Download ```ddColor.js``` and include the file in your project.
```
<script type='text/javascript' src='ddColor.js'></script>
```

## Constructor
```var my_color = new ddColor(color, ymck = false);```
Creates an object with a base ***color***. The constructor will take any valid HTML/css color notation. The second parameter ***ymck*** is optional. If _true_ the object will calculate ```ymck``` values as well. An empty declaration will create a black color. 
```
var my_color = new ddColor('#f00');
var my_color = new ddColor('#f00C');
var my_color = new ddColor('gold');
var my_color = new ddColor('rgb(255,0,0)');
var my_color = new ddColor('rgba(255,0,0, 0.5)');
var my_color = new ddColor('#f0f000aa');
var my_color = new ddColor('green', true);
```

## Properties
The following properties will be available after construction. These values will change if any of the manipulation ***Methods*** are used.
```
my_color.r // red value (0-255)
my_color.g // green value (0-255)
my_color.b // blue value (0-255)
my_color.a // alpha value (0-1)
my_color.h // hue value (0-360)
my_color.s // saturation value (0-100)
my_color.l // lightness value (0-100)
my_color.c // cyan value (0-100)
my_color.m // magenta value (0-100)
my_color.y // yellow value (0-100)
my_color.k // black value (0-100)
```
