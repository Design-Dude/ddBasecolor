# Basecolor
Small and simple javascript library for manipulating color objects. The class Includes gradients, cmyk and text contrast options.

## Dependencies
None.

## Installation
Download ```ddBasecolor.js``` or ```ddBasecolor.min.js``` and simply include the file in your project.
```
<script type='text/javascript' src='ddBasecolor.js'></script>
<script type='text/javascript' src='ddBasecolor.min.js'></script>
```

## Constructor
```var my_color = new ddBasecolor(color, ymck = false);```
Call ddBasecolor by passing any valid web color specification or the ddBasecolor specific cmyk option. The following examples all create a red color object, with or without alpha channel.
```
var my_red = new ddBasecolor('red');
var my_red = new ddBasecolor('#f00');
var my_red = new ddBasecolor('#f008'); // half transparent
var my_red = new ddBasecolor('#ff0000');
var my_red = new ddBasecolor('#FF000080'); // half transparent
var my_red = new ddBasecolor('rgb(255, 0, 0)');
var my_red = new ddBasecolor('rgba(255, 0, 0, 0.5)'); // half transparent
var my_red = new ddBasecolor('hsl(0, 100%, 50%)');
var my_red = new ddBasecolor('hsla(0, 100%, 50%, 0.5)'); // half transparent
var my_red = new ddBasecolor('cmyk(0, 100, 100, 0)');
var my_red = new ddBasecolor('cmyka(0, 100, 100, 0, 0.5)'); // half transparent
```
Without color specification the new ddBasecolor will be black opaque or black transparent if the transparent keyword is used.
```
var my_basecolor = new ddBasecolor();
var my_basecolor = new ddBasecolor('transparent');
```
Finally colors can be created using these methods passing values instead of strings, with or without alpha channels. Without alpha channel the new ddBasecolor will be fully opaque.
```
var my_basecolor = new ddBasecolor();
var my_red = my_basecolor.hex('#ff0000');
var my_red = my_basecolor.rgb(255, 0, 0, 0.5); // half transparent
var my_red = my_basecolor.hsl(0, 100, 50);
var my_red = my_basecolor.cmyk(0, 100, 100, 0, 0.5); // half transparent
```

## CMYK
The constant calculation of cmyk values means unnecessary overhead in most cases. By default ddBasecolor does not do that. To activate cmyk calculations include the second cmyk boolean during creation or use the ddBasecolor specific cmyk option. A few axamples:
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

##Basic usage
It is important to know that the basecolor will never change once created unless you do so yourself. Methods all have a return value with the newly changed color information. In the first example below, the variable my_basecolor is still blue whereas my_red is a clone, changed to red. In the second example my_basecolor changes from blue to red because it is assigned its own return value.
```
var my_basecolor = new ddBasecolor('blue');
my_red = my_basecolor.rgb(255, 0, 0, 0.5);

var my_basecolor = new ddBasecolor('blue');
my_basecolor = my_basecolor.rgb(255, 0, 0, 0.5);
```
Methods may be stacked to combine different actions:
```
var my_basecolor = new ddBasecolor().rgb(255, 0, 0).alpha(0.5);

var my_basecolor = new ddBasecolor('blue');
var my_highlight = my_basecolor.rgb(255, 0, 0, 0.5).lighten(0.5);
```

## Properties
The following properties will be available after construction.
###General
```
var my_basecolor = new ddBasecolor();
my_basecolor.version; // version
my_basecolor.info; // meta information
```
###color data
```
my_basecolor.r; // red
my_basecolor.g; // green
my_basecolor.b; // blue
my_basecolor.a; // alpha
my_basecolor.h; // hue
my_basecolor.s; // saturation
my_basecolor.l; // lightness
```
With cmyk enabled:
```
my_basecolor.c; // cyan
my_basecolor.m; // magenta
my_basecolor.y; // yellow
my_basecolor.k; // black
```

##Cloning
Since every method return a clone for further use, cloning a color is not ver useful. It is possible however. Both examples below do the same thing.
```
var my_basecolor = new ddBasecolor();
var my_second_basecolor = my_basecolor.clone().lighten(0.1);

var my_basecolor = new ddBasecolor();
var my_second_basecolor = my_basecolor.lighten(0.1);
```
