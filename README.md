# Basecolor
Small and simple javascript library for manipulating colour objects. With methods for (rainbow) gradients, cmyk and text contrast. Optimized for the human eye.

## The story
No doubt, there are many great colour libraries. Unfortunately not any of them met my needs. I had to fill a chart with a rainbow coloured pattern but many colours looked alike doing so pure mathematically. I wanted individually distinguishable colours. That's what ddBasecolor tries to provide. If the human eye is more important than the math behind you should give ddBasecolor a try. Also, where smart methods are involved it's optional.
	
## Concept
Compared to other libraries the concept is a little different also. Once a ```ddBasecolor``` is created its base colour will never change again. Instead, each operation will return a copy with updated values. Multiple operations can be stacked together though, as you can see in the section _Advanced techniques_. The big advantage is that all operations are predictable because they are always calculated from the same base colour.

## Basic usage
The basic use consists of 3 simple steps:
1. Create a ```ddBasecolor``` using the constructor. See _Consturctor_ and _setter methods_ below. As mentioned above, it's important to notice that the base colour you create will never change because the colour updates and loops from the next step depend on this base colour. If you need to change the base colour, use ```clone()``` or create a new ```ddBasecolor```.
```
var my_color = new ddBasecolor('red');
```
2. Next, update your colour variable using various _setter-_ and _smart methods_. Create series of colours with simple for-loops. See the _examples_ below and _Advanced techniques_ at the bottom. Many operations need the base colour for their calculations which is why the base colour never changes (just to say it again). Both the initial and the returned colour object will share the unaltered base colour which makes it possible to stack operations.
```
var my_new_color = my_color.lighten(0.5);
```
3. Finally use _getter methods_ and obtain the colour data in a format for further use in your css, script or html.
```
my_new_color = my_new_color.hex();
```
## Series
To make a series of colours you will need a loop.
```
var my_color = new ddBasecolor('red'); // step 1: create a colour 
for(i=0 ; i<=1 ; i+=0.1) { // 10 steps, 11 colours
  var step_color = my_color.lighten(i); // step 2: calculate colour step
  var step_color_as_hex_string = step_color.hex(); // step 3: get the result...
  ... // and do somthing with it
}
```
See the [basic usage example at Codepen.io](https://codepen.io/design-dude/pen/ExxQgeR)

## Dependencies
None.

## Installation
Download the latest version ```ddBasecolor.1.2.0.js``` or ```ddBasecolor.1.2.0.min.js``` and include the file in your project.
```
<script type='text/javascript' src='ddBasecolor.1.2.0.min.js'></script>
```
Or link ```ddBasecolor``` from design-dude.nl. This will always be the latest version.
```
<script type='text/javascript' src='https://www.design-dude.nl/classes/ddBasecolor.min.js'></script>
```

## Constructor
```var my_color = new ddBasecolor(color, ymck=false);```
Call ```ddBasecolor``` and provide any valid web colour specification. The following examples all create a red colour object, some with alpha channel.
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
Without colour specification the new ```ddBasecolor``` will be black opaque or black transparent if the _transparent_ keyword is used.
```
var my_basecolor = new ddBasecolor();
var my_basecolor = new ddBasecolor('transparent');
```
Colours can also be created using these ```setter methods.``` Pass the appropriate comma seperated values with or without alpha channel. 
```
var my_basecolor = new ddBasecolor();
var my_red = my_basecolor.hex('#ff0000');
var my_red = my_basecolor.hex('#ff000080'); // half transparent
var my_red = my_basecolor.rgb(255, 0, 0, 0.5); // half transparent
var my_red = my_basecolor.hsl(0, 100, 50);
var my_red = my_basecolor.cmyk(0, 100, 100, 0, 0.5); // half transparent
```

## CMYK
By default ```ddBasecolor``` does not calculate cmyk values to prevent unnecessary overhead. To activate cmyk calculations set the second cmyk option to _true_. A few examples:
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
### Colour properties
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

## Methods
### Getter and setter methods
These methods get or set the various properties of the colour involved. All properties will be updated accordingly. Setting the hsl values for example will also update the rgb and cmyk values.

#### alpha(a)
_a_ is an opacity value between 0 and 1 where 1 is fully opaque.
```
alpha(); // get alpha level
alpha(0.5); // set alpha level to half transparent
```

#### cmyk(c,m,y,k,a=1)
Set the colour to _c,m,y_ and _k_ values between 0 and 100.

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
cmyk(); // get cmyk object {c:0,m:100,y:100,k:0} if cmyk is enabled
cmyk(0,100,100,0,0.5); // set color to red from cmyk values, half transparent.
```

#### hex(h)
_h_ is a hexadecimal string, with or without transparency information.
```
hex(); // get color as a hexadecimal string '#ff0000'
hex('#ff0000'); // set color from hexadecimal string (alpha channel will be 1)
hex('#ff000080'); // set color with alpha channel from hexadecimal string
```

#### hexa(h)
_h_ is a hexadecimal string, with or without transparency information.
```
hexa(); // get hexadecimal string with alpha channel '#ff000080'
hexa('#ff0000'); // set color from hexadecimal string (alpha channel will be 1)
hexa('#ff000080'); // set color with alpha channel from hexadecimal string
```

#### hsl(h,s,l,a=1)
_h_ is the hue value between 0 and 360 degrees.

_s_ is the saturation value between 0 (grey) and 100 (fully saturated).

_l_ is the lightness value between 0 (black) and 100 (white) where 50 is full colour.

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
hsl(); // get hsl string 'hsl(0,100%,50%)'
hsl('obj'); // get hsl object with alpha channel {h:0,s:100,l:50,a=1}
hsl(0,100,50,0.5); // set hsl values and optional opacity to half transparent
```

#### hsla(h,s,l,a=1)
_h_ is the hue value between 0 and 360 degrees.

_s_ is the saturation value between 0 (grey) and 100 (fully saturated).

_l_ is the lightness value between 0 (black) and 100 (white) where 50 is full colour.

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
hsla(); // get hsla string 'hsl(0,100%,50%,0.5)'
hsla('obj'); // get hsl object with alpha channel {h:0,s:100,l:50,a=1}
hsla(0,100,50,0.5); // set hsl values and optional opacity to half transparent
```

#### hue(h)
_h_ is the hue value in degrees between 0 and 360.
```
hue(); // get hue value
hue(240); // set hue value to 120, which is blue.
```

#### lightness(l)
_l_ is the lightness value between 0 (black) and 100 (white) where 50 is full colour.
```
lightness(); // get lightness value
lightness(l); // set lightness value to 1, which is white.
```

#### rgb(r,g,b,a=1)
_r, g, b_ values are between 0 and 255

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
rgb(); // get rgb string 'rgb(255,0,0)'
rgb('obj'); // get rgb object with alpha channel {r:255,g:0,b:0,a=1}
rgb(255,0,0); // set color to red, fully opaque (default 1)
```

#### rgba(r,g,b,a=1)
_r, g, b_ values are between 0 and 255

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
rgba(); // get rgb string 'rgb(255,0,0,0.5)'
rgba('obj'); // get rgb object with alpha channel {r:255,g:0,b:0,a=0.5}
rgba(255,0,0,0.5); // set rgb values to red, half transparent
```

#### saturation(s)
_s_ is the saturation value between 0 (grey) and 100 (fully saturated).
```
saturation(); // get saturation value
saturation(100); // set saturation value to fully saturated
```

### Relative setter methods
These setter methods make it easier to alter specific properties in a single direction relative to the current colour settings.

[EXAMPLE]

#### desaturate(s)
_s_ is a desaturation value from 0 to 1, where 0 is the current saturation value and 1 is fully desaturated.
```
desaturate(1); // decrease the saturation level to fully desaturated
```
#### opaque(a)
_a_ is an opacity value from 0 to 1 where 0 is the current opacity value and 1 is fully opaque.
```
opaque(0.5); // increase the opacity level by 50%, halfway the current opacity value and fully opaque
```
#### rotate(h)
_h_ is the hue rotaion value in degrees where positive values rotate clockwise and negative values counter clockwise.
```
rotate(-90); // rotate the current hue value 90 degrees counter clockwisde
```
#### saturate(s)
_s_ is a saturation value from 0 to 1, where 0 is the current saturation value and 1 is fully saturated.
```
saturate(0.5); // increase the saturation level by 50%, halfway the current saturation value and fully saturated
```
#### transparent(a)
_a_ is an opacity value from 0 to 1 where 0 is the current opacity value and 1 is fully transparent.
```
transparent(0.5); // decrease the opacity level by 50%, halfway the current opacity value and fully transparent
```
#### vivid(sl)
_sl_ is a value from 0 to 1 where 0 is the current level and 1 is the same colour, fully saturated without any darkness or lightness. By default, black, grey and white have a hue value of 0, which is equal to red when vividness is applied.
```
vivid(1); // fully expose the hue color relative to the current saturation and lightness values
```


### Smart methods
The smart methods do some magic tricks and make ```ddBasecolor``` a class apart.

#### blend(color, smart=true)
This method blends two colours into one.

_color_ must be ddBasecolor object.

With _smart_ (default _true_) blends both colors for the eye instead of mathematically. Smart blend take most effect on darker and lighter areas.
```
var my_basecolor = new ddBasecolor('brown');
var my_second_color = new ddBasecolor('brown');
var my_blend_color = my_basecolor(my_second_color);
```
See the ```blend()``` difference with and without _smart_ in [Codepen.io](https://codepen.io/design-dude/pen/qBBojWE)

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
