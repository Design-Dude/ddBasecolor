Small and simple javascript library for manipulating color objects.
The class Includes smart gradient, cmyk and text contrast options.

Owner: Design Dude
Developer: Mek van 't Hoff
Year: 2019
Contact: master.mek@design-dude.nl

Dependencies: none

Source code: https://github.com/Design-Dude/ddBasecolor

Getter and setter methods:
	alpha(a = false)
	cmyk(c,m,y,k,a=1)
	hex(h)
	hexa(h)
	hsl(h,s,l,a=1)
	hsla(h,s,l,a=1)
	lightness(l = false)
	rgb(r,g,b,a=1)
	rgba(r,g,b,a=1)
	saturation(s = false)

General methods:
	clone() ––NEW in 1.2.0 ––
	complement()
	copy()
	desaturate(s = 1)
	hue(h = false)
	invert()
	monotone(color, sc = 1)
	opaque(o = 1)
	rotate(h = 180)
	saturate(s = 1)
	transparent(t = 1)
	vivid(c = 1)

Smart methods
	blend(color := new ddBasecolor(), s=true)
	darken(d=1,s=true)
	gradient(color = new ddBasecolor(), p = 0.5)
	grey(gr = 1)
	lighten(l = 1, s=true)
	luminance()
	rainbow(s = 0.5, c = 0, color = this.copy(), sm = true)
	random(r=1, g=1, b=1, h=1, s=1, l=1, a=0)
	ratio(color, level = false, scale = 1)

Convenient methods:
	index(m=2, i=1, shift=0)

Versions:
1.0.0 release nov 1st 2019
1.1.0 add convenient method for calculating index between 0 and 1, nov 3rd
1.2.0 add general clone function, nov 4th
