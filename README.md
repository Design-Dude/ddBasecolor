# Basecolor
Small and simple javascript library for manipulating color objects. With methods for (rainbow) gradients, cmyk and text contrast. Optimized for the human eye.

## Dependencies
None.

## Installation
Download the latest version ```ddBasecolor.1.2.0.js``` or ```ddBasecolor.1.2.0.min.js``` and simply include the file in your project.
```
<script type='text/javascript' src='ddBasecolor.1.2.0.min.js'></script>
```
Or simply include the (always) latest version from design-dude.nl.
```
<script type='text/javascript' src='https://www.design-dude.nl/classes/ddBasecolor.min.js'></script>
```

## Constructor
```var my_color = new ddBasecolor(color, ymck=false);```
Call ```ddBasecolor``` and provide any valid web color specification. The following examples all create a red color object, some with alpha channel.
```
var my_red = new ddBasecolor('red');
var my_red = new ddBasecolor('#f00');
var my_red = new ddBasecolor('#ff0000');
var my_red = new ddBasecolor('rgb(255, 0, 0)');
var my_red = new ddBasecolor('hsl(0, 100%, 50%)');
var my_red = new ddBasecolor('cmyk(0, 100, 100, 0)');
// with transparency (most browsers accept the above statements with extra alpha channel provided)
var my_red = new ddBasecolor('#f008');
var my_red = new ddBasecolor('#FF000080');
var my_red = new ddBasecolor('rgba(255, 0, 0, 0.5)');
var my_red = new ddBasecolor('hsla(0, 100%, 50%, 0.5)');
var my_red = new ddBasecolor('cmyk(0, 100, 100, 0, 0.5)');
```
Without color specification the new ```ddBasecolor``` will be black opaque or black transparent if the _transparent_ keyword is used.
```
var my_basecolor = new ddBasecolor();
var my_basecolor = new ddBasecolor('transparent');
```
Colors can also be created using these ```setter methods.``` Pass the appropriate comma seperated values with or without alpha channel. 
```
var my_basecolor = new ddBasecolor();
var my_red = my_basecolor.hex('#ff0000');
var my_red = my_basecolor.hex('#ff000080'); // half transparent
var my_red = my_basecolor.rgb(255, 0, 0, 0.5); // half transparent
var my_red = my_basecolor.hsl(0, 100, 50);
var my_red = my_basecolor.cmyk(0, 100, 100, 0, 0.5); // half transparent
```

## CMYK
By default ```ddBasecolor``` does not calculate cmyk values to prevent unnecessary overhead. To activate cmyk calculations set the second cmyk option to _true_. A few axamples:
```
var my_red = new ddBasecolor('#f00', true);
var my_red = new ddBasecolor('rgb(255, 0, 0)', true);
var my_red = new ddBasecolor('cmyk(0, 100, 100, 0)');
var my_red = new ddBasecolor().cmyk(0, 100, 100, 0);
var my_basecolor = new ddBasecolor(true, true);
var my_basecolor = new ddBasecolor('transparent', true);
```
The cmyk properties will also be available if cmyk values are specified later on.
```
var my_basecolor = new ddBasecolor('#f00'); // no cmyk properties
my_basecolor = my_basecolor.cmyk(0, 100, 100, 0)); // cmyk properties are now available
```

## Properties
The following properties will be available after construction.
### General properties
```
var my_basecolor = new ddBasecolor();
my_basecolor.version; // version
my_basecolor.info; // meta information
```
### Color properties
```
my_basecolor.r; // red
my_basecolor.g; // green
my_basecolor.b; // blue
my_basecolor.a; // alpha
my_basecolor.h; // hue
my_basecolor.s; // saturation
my_basecolor.l; // lightness
```
### Cmyk properties:
```
my_basecolor.c; // cyan
my_basecolor.m; // magenta
my_basecolor.y; // yellow
my_basecolor.k; // black
```

## Basic usage
The basic use consists of 3 steps simple steps
1. make a color using the constructor. See above.
2. change the color using various setter, standard or smart methods
3. use getter methods to obtain usable color formats for further use in your scripts.


## Methods

### Standard methods
You can update alpha, hue, lightness and saturation values with the standard methods.

### Smart methods
The smart methods let you do some magic things. The methods make ddBasecolor a class apart.

### Return methods
These methods return color information for use in html or stylesheets:
```
var my_basecolor = my_basecolor('red');
my_basecolor.hex(); // #FF0000;
my_basecolor.hexa(); // #FF0000FF;
my_basecolor.rgb(); // rgb(255,0,0);
my_basecolor.rgba(); // rgba(255,0,0,1);
my_basecolor.hsl(); // hsl(0,100%,50%);
my_basecolor.hsla(); // hsl(0,100%,50%,1);
```
If you need the color information in number format you can read out each property individually.
```
var my_basecolor = my_basecolor('red');
my_basecolor.alpha(); // alpha
my_basecolor.hue(); // hue
my_basecolor.saturation(); // saturation
my_basecolor.lightness(); // lightness
```
Rgb, hsl and cmyk data may also be retured as data objects. The keyword _obj_ is compulsory for rgb and hsl. Both rgb and hsl include the alpha channel.
```
var my_basecolor = my_basecolor('red');
my_basecolor.rgb('obj'); // {r:255,g:0,b:0,a:1}
my_basecolor.hsl('object'); // {h:0,s:100,l:50,a:1}
console.log(my_basecolor.cmyk()); // {c:0,m:100,y:100,k:0}
```

## Itterations
