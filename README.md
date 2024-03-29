# Basecolor
Small and simple javascript library for manipulating colour objects. With methods for (rainbow) gradients, cmyk and text contrast. Optimized for the human eye.

## The story
No doubt, there are many great colour libraries. Unfortunately not any of them met my needs. I had to fill a chart with a rainbow coloured pattern but many colours looked alike doing so pure mathematically. I wanted individually distinguishable colours. That's what ddBasecolor tries to provide. If the human eye is more important than the math behind you should give ddBasecolor a try. Also, where smart methods are involved it's optional.
	
## Concept
Compared to other libraries the concept is a little different also. Once a ```ddBasecolor``` is created its base colour will never change again. Instead, each operation will return a copy with updated values. Multiple operations can be stacked together though. The big advantage is that all operations are predictable because they are always calculated from the same base colour.

## Basic usage
The basic use consists of 3 simple steps:
1. Create a ```ddBasecolor``` using the constructor. See _Consturctor_ and _setter methods_ below. As mentioned above, it's important to notice that the base colour you create will never change because the colour updates and loops from the next step depend on this base colour. If you need to change the base colour, use ```clone()```, create a new ```ddBasecolor``` or reuse the base colour variable as the result of the operation.
```
var my_color = new ddBasecolor('red');
var my_color = my_color.hue(240); // update the basecolor to blue
```
2. Next, update your colour variable using various _setter-_ and _smart methods_. Create series of colours with simple for-loops. See the _Codepen.io examples_ below. Many operations need the base colour for their calculations which is why the base colour never changes (just to say it again). You can stack multiple operations and the returned colour object will always be a clone with it's own new base colour.
```
var my_new_color = my_color.lighten(0.5);
var my_new_color = my_color.hue(240).lighten(0.5); // stacking
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
my_basecolor.alpha(); // get alpha level
my_basecolor.alpha(0.5); // set alpha level to half transparent
```

#### cmyk(c,m=0,y=0,k=0,a=1)
Set the colour to _c,m,y_ and _k_ values between 0 and 100.

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
my_basecolor.cmyk(); // get cmyk object {c:0,m:100,y:100,k:0} if cmyk is enabled
my_basecolor.cmyk(0,100,100,0,0.5); // set color to red from cmyk values, half transparent.
```

#### hex(h)
_h_ is a hexadecimal string, with or without transparency information.
```
my_basecolor.hex(); // get color as a hexadecimal string '#ff0000'
my_basecolor.hex('#ff0000'); // set color from hexadecimal string (alpha channel will be 1)
my_basecolor.hex('#ff000080'); // set color with alpha channel from hexadecimal string
```

#### hexa(h)
_h_ is a hexadecimal string, with or without transparency information.
```
my_basecolor.hexa(); // get hexadecimal string with alpha channel '#ff000080'
my_basecolor.hexa('#ff0000'); // set color from hexadecimal string (alpha channel will be 1)
my_basecolor.hexa('#ff000080'); // set color with alpha channel from hexadecimal string
```

#### hsl(h,s=100,l=50,a=1)
_h_ is the hue value between 0 and 360 degrees.

_s_ is the saturation value between 0 (grey) and 100 (fully saturated).

_l_ is the lightness value between 0 (black) and 100 (white) where 50 is full colour.

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
my_basecolor.hsl(); // get hsl string 'hsl(0,100%,50%)'
my_basecolor.hsl('obj'); // get hsl object with alpha channel {h:0,s:100,l:50,a=1}
my_basecolor.hsl(0,100,50,0.5); // set hsl values and optional opacity to half transparent
```

#### hsla(h,s=100,l=50,a=1)
_h_ is the hue value between 0 and 360 degrees.

_s_ is the saturation value between 0 (grey) and 100 (fully saturated).

_l_ is the lightness value between 0 (black) and 100 (white) where 50 is full colour.

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
my_basecolor.hsla(); // get hsla string 'hsl(0,100%,50%,0.5)'
my_basecolor.hsla('obj'); // get hsl object with alpha channel {h:0,s:100,l:50,a=1}
my_basecolor.hsla(0,100,50,0.5); // set hsl values and optional opacity to half transparent
```

#### hue(h)
_h_ is the hue value in degrees between 0 and 360.
```
my_basecolor.hue(); // get hue value
my_basecolor.hue(240); // set hue value to 120, which is blue.
```

#### lightness(l)
_l_ is the lightness value between 0 (black) and 100 (white) where 50 is full colour.
```
my_basecolor.lightness(); // get lightness value
my_basecolor.lightness(l); // set lightness value to 1, which is white.
```

#### rgb(r,g=0,b=0,a=1)
_r, g, b_ values are between 0 and 255

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
my_basecolor.rgb(); // get rgb string 'rgb(255,0,0)'
my_basecolor.rgb('obj'); // get rgb object with alpha channel {r:255,g:0,b:0,a=1}
my_basecolor.rgb(255,0,0); // set color to red, fully opaque (default 1)
```

#### rgba(r,g=0,b=0,a=1)
_r, g, b_ values are between 0 and 255

_a_ is an opacity value between 0 and 1 where 1 is default and fully opaque.
```
my_basecolor.rgba(); // get rgb string 'rgb(255,0,0,0.5)'
my_basecolor.rgba('obj'); // get rgb object with alpha channel {r:255,g:0,b:0,a=0.5}
my_basecolor.rgba(255,0,0,0.5); // set rgb values to red, half transparent
```

#### saturation(s)
_s_ is the saturation value between 0 (grey) and 100 (fully saturated).
```
my_basecolor.saturation(); // get saturation value
my_basecolor.saturation(100); // set saturation value to fully saturated
```

### Relative setter methods
These setter methods make it easier to alter specific properties in a single direction relative to the current colour settings.

#### desaturate(s=1)
_s_ is a desaturation value from 0 to 1, where 0 is the current saturation value and 1 is fully desaturated.
```
my_basecolor.desaturate(1); // decrease the saturation level to fully desaturated
```
#### opaque(o=1)
_o_ is an opacity value from 0 to 1 where 0 is the current opacity value and 1 is fully opaque.
```
my_basecolor.opaque(0.5); // increase the opacity level by 50%, halfway the current opacity value and fully opaque
```
#### rotate(h=180)
_h_ is the hue rotaion value in degrees where positive values rotate clockwise and negative values counter clockwise.
```
my_basecolor.rotate(-90); // rotate the current hue value 90 degrees counter clockwisde
```
#### saturate(s=1)
_s_ is a saturation value from 0 to 1, where 0 is the current saturation value and 1 is fully saturated.
```
my_basecolor.saturate(0.5); // increase the saturation level by 50%, halfway the current saturation value and fully saturated
```
#### transparent(o=1)
_o_ is an opacity value from 0 to 1 where 0 is the current opacity value and 1 is fully transparent.
```
my_basecolor.transparent(0.5); // decrease the opacity level by 50%, halfway the current opacity value and fully transparent
```
#### vivid(v=1)
_v_ is a value from 0 to 1 where 0 is the current vivid level and 1 is the same colour, fully saturated without any darkness or lightness. By default, black, grey and white have a hue value of 0, which is equal to red when vividness is applied.
```
my_basecolor.vivid(1); // fully expose the hue color relative to the current saturation and lightness values
```
See the ```vivid()``` in [Codepen.io](https://codepen.io/design-dude/pen/WNNVMPb)


### Smart methods
The smart methods do some smart tricks and make ```ddBasecolor``` a class apart. The results of _smart_ operations are still mathematical corrections. Sometimes the not-so-smart calculationa turn out to work better. Its best practice to compare both results with and without _smart_ using the examples below to find out the best result for your project.

#### blend(color, smart=true)
This method blends two colours into one.

_color_ must be a ```ddBasecolor``` object.

With _smart_ (default _true_) both colours are blended for the eye instead of mathematically. Smart blend takes most effect on darker and lighter areas.
```
var my_basecolor = new ddBasecolor('brown');
var my_second_color = new ddBasecolor('black');
var my_smart_blend_color = my_basecolor.blend(my_second_color);
var my_normal_blend_color = my_basecolor.blend(my_second_color, false);
```
See the ```blend()``` difference with and without _smart_ in [Codepen.io](https://codepen.io/design-dude/pen/qBBojWE)

#### complement()
Returns complementary colour by rotation. Same as rotate(). ```complement()``` does not invert lightness like ```invert()```
```
complement(); // rotate the current hue value 180 degrees
```
See the ```complement()``` and ```invert()``` difference in [Codepen.io](https://codepen.io/design-dude/pen/mddNzpG)


#### darken(p, smart=true)
This method return a darkened colour variant of the base colour.

_p_ is a darkness value between 0 (full colour) and 1 (black).

With _smart_ (default _true_) the base colours is darkened for the eye instead of mathematically. Smart darkening takes most effect on darker and lighter areas.
```
var my_basecolor = new ddBasecolor('red');
var my_smart_darkened_color = my_basecolor.darken(0.8);
var my_normal_darkened_color = my_basecolor.darken(0.8, false);
```
See the ```darken()``` difference with and without _smart_ in [Codepen.io](https://codepen.io/design-dude/pen/zYYgKvX)

#### gradient(color, p, smart=true)

This method return a gradient variant between two colours.

_color_ must be a ```ddBasecolor``` object.

_p_ is a gradient value between 0 (base colour) and 1 (color).

With _smart_ (default _true_) the gradient is calculated for the eye instead of mathematically. Smart gradient takes most effect on darker and lighter areas.
```
var my_basecolor = new ddBasecolor('red');
var my_second_color = new ddBasecolor('black');
var my_smart_gradient_color = my_basecolor.blend(my_second_color, 0.5);
var my_normal_gradient_color = my_basecolor.blend(my_second_color, 0.5, false);
```
See the ```gradient()``` difference with and without _smart_ in [Codepen.io](https://codepen.io/design-dude/pen/mddNrWW)

#### grey(p=1, l=0)

This method return a grey variant of the base colour. Additionally you can lighten the greyscale with a second parameter.

_p_ is the greyness value between 0 (base colour) and default 1 (grey scale colour).

_l_ is the lighness value between 0 (greyscale colour) and 1 (white).

```
var my_basecolor = new ddBasecolor('red');
var my_grey_color = my_basecolor.grey(); // grey
var my_grey_color = my_basecolor.grey(0.5); // half grey
var my_grey_color = my_basecolor.grey(1, 0.5); // grey and 50% lightened
```
See the ```grey()``` example in [Codepen.io](https://codepen.io/design-dude/pen/qBBeaKN)

#### invert()
Returns inverted colour by rgb calculation. ```invert()``` also inverts lightness unlike ```complement()```
```
invert();
```
See the ```complement()``` and ```invert()``` difference in [Codepen.io](https://codepen.io/design-dude/pen/mddNzpG)

#### lighten(p, smart=true)
This method return a lightened colour variant of the base colour.

_p_ is a lightness value between 0 (full colour) and 1 (white).

With _smart_ (default _true_) the base colours is lightened for the eye instead of mathematically. Smart lightening takes most effect on darker and lighter areas.
```
var my_basecolor = new ddBasecolor('red');
var my_smart_lightened_color = my_basecolor.lighten(0.8);
var my_normal_lightened_color = my_basecolor.lighten(0.8, false);
```
See the ```lighten()``` difference with and without _smart_ in [Codepen.io](https://codepen.io/design-dude/pen/ExxQgeR)

#### monotone(color, p = 1)
Returns a monotone variant of the base colour.

_color_ must be a ```ddBasecolor``` object and will act as the base tone for the mono tone.

_p_ is the blend value between 0 and 1 for _color_. With 0 for _p_ ```monotone``` returns a greyscale.

```
var my_basecolor = new ddBasecolor('red');
var my_tone_color = new ddBasecolor('green');
var my_mono_tone = my_basecolor.monotone(my_tone_color, 0.5);
```
See the ```monotone()``` in [Codepen.io](https://codepen.io/design-dude/pen/RwwXeoM)

#### rainbow(p=0.5, r=0, color=this.copy(), smart=true)
Returns a rainbow colour variant between the base colour and _color_.

_p_ is the index value between 0 and 1

_r_ is the rotation type 'c'(1) clockwise, 'cc'(-1) counter clockwise, 's'(0) short path to _color_ or 'l'(2) long path to _color_

_color_ must be a ```ddBasecolor``` object. It is the target colour for the rainbow.

With _smart_ (default _true_) the rainbow is calculated for the eye instead of mathematically. Smart rainbows takes most effect on darker and lighter areas.
```
var my_basecolor = new ddBasecolor('red');
var colors = 16;
for(i=1;i<=colors;i++) {
  var col_index = my_base_color.index(colors, i, -0.5);
  var my_rainbow_col = my_base_color.rainbow(col_index, 'c');
}
```
See the ```rainbow()``` with difference options in [Codepen.io](https://codepen.io/design-dude/pen/abbeBPV)

#### random(r=1, g=1, b=1, h=1, s=1, l=1, a=0)
Calculate random color .relative to the base colour. The lower the values, the closer the random colour will look like the base colour.

_r_ value between 0 and 1 with which red participates in the random result

_g_ value between 0 and 1 with which green participates in the random result

_b_ value between 0 and 1 with which blue participates in the random result

_s_ value between 0 and 1 with which saturation participates in the random result

_l_ value between 0 and 1 with which lightness participates in the random result

_a_ value between 0 and 1 with which transparency participates in the random result

```
var my_basecolor = new ddBasecolor();
var my_random_color = my_basecolor.random();
```
See the ```random()``` in [Codepen.io](https://codepen.io/design-dude/pen/ZEEgamo)

#### ratio(backgroundcolor, level, p)
Calculate text contrast ratio colour according to WCAG 2.0.

_backgroundcolor_ the colour the text will be placed on.

_level_ WCAG ratio level 'aa', 'aaa', 'aa18', 'aaa18'. If _level_ is false the method return the difference in ration between text (base colour) and _backgroundcolor_.

_p_ value between 0 (minimal contrast ration colour) and 1 (black or white).

```
var my_textcolor = new ddBasecolor('green');
var my_background = new ddBasecolor('lime');
my_textcolor = my_textcolor.ration(my_background, 'aa', 0);
```
See the ```ratio()``` in [Codepen.io](https://codepen.io/design-dude/pen/vYYodxR)


### Convenient methods
Other methods to help you out.

#### clone()
Make a clone with current colour as new base colour. Kinda unnecessary. Added for internal use.
```
var my_basecolor = new ddBasecolor('red');
var my_new_lightened_basecolor = my_basecolor.lighten(0.5).clone();
```

#### copy()
Make a copy that shares the initial base colour. A bit useless. Added for internal use.
```
var my_basecolor = new ddBasecolor('red');
var my_new_lightened_basecolor = my_basecolor.lighten(0.5).copy();
```

#### index(count=2, index=1, include=true, shift=0)
Calculate necessary value between 0 and 1 from a given number of colours plus index value for further use.

_count_ is the number of colours in the series.

_index_ is the current index value between 1 and _count_.

_include_ excludes last target colour form the series if set to _false_.

_shift_ shifts _index_ by _shift_ while _index_ > _count_.
```
var my_basecolor = new ddBasecolor('red');
var colors = 16;
for(i=1;i<=colors;i++) {
  var col_index = my_base_color.index(colors, i);
  var some_col = my_base_color.lighten(col_index);
}
```
By default ```index()``` returns 1 if _index_ equals _count_. Sometimes this is unwanted, for example in a rainbow coloured pie where the last target colour is the same as the base colour. The last target colour can be excluded from the serie with _include_ set to _false_.
```
var my_basecolor = new ddBasecolor('red');
var colors = 16;
for(i=1;i<=colors;i++) {
  var col_index = my_base_color.index(colors, i, false);
  var some_rainbow_col = my_base_color.rainbow(col_index, 'c', my_basecolor, false);
}
```
if your code allows the _index_ to become larger than the available amount of colors (_count_) the colour series will repeat in rainbows and gradients. ```index``` has a _shift_ attribute with which the overflow series can be altered. You may leave out the _include_ parameter if it's _true_.
```
var my_basecolor = new ddBasecolor('red');
var colors = 16;
for(i=1;i<=colors;i++) {
  var col_index = my_base_color.index(colors, i, false);
  var some_rainbow_col = my_base_color.rainbow(col_index, 'c', my_basecolor, true, 0.25); // shift the index 0.25 onwards
  var some_rainbow_col = my_base_color.rainbow(col_index, 'c', my_basecolor, 0.25); // include will still be true
  var some_rainbow_col = my_base_color.rainbow(col_index, 'c', my_basecolor, false, 0.25); // exclude last target colour
}
```
Index examples at [Codepen.io](https://codepen.io/design-dude/pen/QWWezMr)

#### luminance()
Returns the relative brightness according to WCAG 2.0
```
var my_basecolor = new ddBasecolor('red');
my_basecolor.luminance();
```


### Return methods
These methods return color information for use in html or stylesheets:
```
var my_basecolor = new ddBasecolor('red');
my_basecolor.hex(); // #FF0000;
my_basecolor.hexa(); // #FF0000FF;
my_basecolor.rgb(); // rgb(255,0,0);
my_basecolor.rgba(); // rgba(255,0,0,1);
my_basecolor.hsl(); // hsl(0,100%,50%);
my_basecolor.hsla(); // hsl(0,100%,50%,1);
```
If you need the color information in number format you can read out each property individually.
```
var my_basecolor = new ddBasecolor('red');
my_basecolor.alpha(); // alpha
my_basecolor.hue(); // hue
my_basecolor.saturation(); // saturation
my_basecolor.lightness(); // lightness
```
Rgb, hsl and cmyk data may also be retured as data objects. The keyword _obj_ is compulsory for rgb and hsl. Both rgb and hsl include the alpha channel.
```
var my_basecolor = new ddBasecolor('red');
my_basecolor.rgb('obj'); // {r:255,g:0,b:0,a:1}
my_basecolor.hsl('object'); // {h:0,s:100,l:50,a:1}
console.log(my_basecolor.cmyk()); // {c:0,m:100,y:100,k:0}
```

Good luck to you!

