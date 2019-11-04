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
my_basecolor = my_basecolor.cmyk(0, 100, 100, 0); // cmyk properties are now available
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
### CMYK properties:
```
my_basecolor.c; // cyan
my_basecolor.m; // magenta
my_basecolor.y; // yellow
my_basecolor.k; // black
```

## Basic usage
The basic use consists of 3 steps simple steps:
1. Create a _ddBasecolor_ using the constructor. See the _consturctors_ above or _setter methods_ below. It's important to notice that the basecolor you create will never change because the color updates and loops from the next step depend on this basecolor. If you need to change the basecolor, use _clone()_ or simply create a new _ddBasecolor_.
1. Next update your color using various _setter, standard or smart methods_. Create series of colors with simple for-loops, all from the same basecolor. See the _example_ below and _advanced techniques_ at the bottom.
1. Finally use _getter methods_ to obtain usable color formats for further use in your scripts.

### Basic example
```
var my_basecolor = new ddBasecolor('red'); // step 1, create a color
for(i=0 ; i<=1 ; i+=0.1) { // make a loop to create 11 colors
  var color_step = my_basecolor.lighten(i); // step 2, calculate color step
  console.log(color_step.hex()); // step 3, do something with the color step
}
```
[EXAMPLE]

## Methods
### Getter and setter methods
These methods get or set the various properties. Pass the correct attributes to set a property.

#### alpha(level)
```
alpha(); // get alpha level
alpha(level); // set alpha level between 0 and 1
```

#### cmyk(c,m,y,k,a=1)
```
cmyk(); // get cmyk object {c:0,m:100,y:100,k:0} if cmyk is enabled
cmyk(c,m,y,k,a=1); // set cmyk values between 0 and 100 and optional alpha channel between 0 and 1
```

#### hex(h)
```
hex(); // get hexadecimal string '#ff0000'
hex('#ff0000'); // set color from hexadecimal string (alpha channel will be 1)
hex('#ff000080'); // set color with alpha channel from hexadecimal string
```

#### hexa(h)
```
hexa(); // get hexadecimal string with alpha channel '#ff000080'
hexa('#ff0000'); // set color from hexadecimal string (alpha channel will be 1)
hexa('#ff000080'); // set color with alpha channel from hexadecimal string
```

#### hsl(h,s,l,a=1)
_h_ stands for hue with values between 0 and 360 degrees.
_s_ stands for saturation with values between 0 (grey) and 100 (fully saturated)
_l_ stands for lightness with values between 0 (black), 50 (full color) and 100 (white)
```
hsl(); // get hsl string 'hsl(0,100%,50%)'
hsl('obj'); // get hsl object with alpha channel {h:0,s:100,l:50,a=1}
hsl(h,s,l,a=1); // set hsl values and optional alpha channel between 0 and 1
```

#### hsla(h,s,l,a=1)
```
hsla(); // get hsla string 'hsl(0,100%,50%,0.5)'
hsla('obj'); // get hsl object with alpha channel {h:0,s:100,l:50,a=1}
hsla(h,s,l,a=1); // set hsl values and optional alpha channel between 0 and 1
```

#### lightness(l)
```
lightness(); // get lightness value
lightness(l); // set lightness value between 0 (black), 50 (full color) and 100 (white)
```

#### rgb(r,g,b,a=1)
```
rgb(); // get rgb string 'rgb(255,0,0)'
rgb('obj'); // get rgb object with alpha channel {r:255,g:0,b:0,a=1}
rgb(r,g,b,a=1); // set rgb values between 0 and 255 and optional alpha channel between 0 and 1
```

#### rgba(r,g,b,a=1)
```
rgba(); // get rgb string 'rgb(255,0,0,0.5)'
rgba('obj'); // get rgb object with alpha channel {r:255,g:0,b:0,a=1}
rgba(r,g,b,a=1); // set rgb values between 0 and 255 and optional alpha channel between 0 and 1
```

#### saturation(s)
```
saturation(); // get saturation value
saturation(s); // set saturation value between 0 (grey) and 100 (fully saturated)
```


### Standard methods
Unlike setter methods these methods update a single property

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

## Advanced techniques
