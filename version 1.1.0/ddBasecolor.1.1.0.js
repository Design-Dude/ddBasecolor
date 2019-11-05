class ddBasecolor {
	/*
	// Small and simple javascript library for manipulating color objects.
	// The class Includes smart gradient, cmyk and text contrast options.
	// Owner: Design Dude
	// Developer: Mek van 't Hoff
	// Year: 2019
	// Contact: master.mek@design-dude.nl
	// Dependencies: none
	// Source code: https://github.com/Design-Dude/ddBasecolor
	// Examples code: https://codepen.io
	// Methods:
	// info
	// general/standard
	// setter/getter
	// smart
	// convenient
	// Versions:
	// 1.0.0 release nov 1st 2019
	// 1.1.0 add convenient method for calculating index between 0 and 1, nov 3rd
	// 1.2.0 add cloning function, nov 4th
	// Todos:
	// add control for max index and overflow in series
	// 1.x.0 TODO add convenient method order color array
	// 1.x.0 TODO add convenient method distinct color array
	// Information:
	// https://css-tricks.com/converting-color-spaces-in-javascript/
	// https://tabreturn.github.io/code/html/javascript/2017/01/26/converting_css_colour_to_greyscale.html
	// https://www.w3.org/TR/WCAG20/#relativeluminancedef
	// https://stackoverflow.com/questions/36906252/difference-between-complement-and-invert-in-sass
	// https://webaim.org/resources/contrastchecker/
	// https://medium.muz.li/the-science-of-color-contrast-an-expert-designers-guide-33e84c41d156
	// https://www.w3.org/TR/WCAG20/#contrast-ratiodef
	*/

	/*
	// The constructor is used to create new colors
	*/
	constructor(color, cmyk = false) {
		this.version = "1.2.0"; // major . minor . bug
		this.info = { // please, be respectful
			classname: this.__proto__.constructor.name,
			version: this._version,
			library: "ddBasecolor.js",
			owner: "Design Dude",
			year: "2019",
			developer: "Mek van 't Hoff",
			contact: "master.mek@design-dude.nl"
		}
		// create canvas 
		var canvas, context;
		canvas = document.createElement('canvas');
		canvas.height = 1;
		canvas.width = 1;
		context = canvas.getContext('2d');
		// fill with any valid web color notation
		context.fillStyle = color;
		context.fillRect(0, 0, 1, 1);
		// get the data to set private properties
		this.r = context.getImageData(0, 0, 1, 1).data[0];
		this.g = context.getImageData(0, 0, 1, 1).data[1];
		this.b = context.getImageData(0, 0, 1, 1).data[2];
		this.a = context.getImageData(0, 0, 1, 1).data[3] / 255;
		this.h = 0;
		this.s = 0;
		this.l = 0;
		this._cmyk = cmyk;
		if(this._cmyk) {
			this.c = 0;
			this.m = 0;
			this.y = 0;
			this.k = 0;
		}
		// calc hsl values from rgb
		this._to_hsl();
		if(this._cmyk) this._to_cmyk();
		// translate non-existing cmyk input
		if(typeof(color) === 'string' && color.indexOf('cmyk') === 0) {
			var n = color.match(/([0-9\.\-]+)/g);
			if(n.length === 4 || n.length === 5) {
				this._cmyk = true;
				this.c = n[0] < 0 ? 0 : n[0] > 100 ? 100 : parseFloat(n[0]);
				this.m = n[1] < 0 ? 0 : n[1] > 100 ? 100 : parseFloat(n[1]);
				this.y = n[2] < 0 ? 0 : n[2] > 100 ? 100 : parseFloat(n[2]);
				this.k = n[3] < 0 ? 0 : n[3] > 100 ? 100 : parseFloat(n[3]);
				this.a = 1;
				if(n.length === 5 && color.indexOf('cmyka') === 0) this.a = n[4] < 0 ? 0 : n[4] > 1 ? 1 : parseFloat(n[4]);
				this._from_cmyk();
				this._to_hsl();
			}
		}
		// save as basecolor
		this._basecolor = this.info.classname === 'ddBasecolor' ? this.copy() : false;
	}
	
	/*
	// Translate cmyk values to rgb
	// No return value, for internal use only
	*/
	_from_cmyk() {
		if(this._cmyk) {
			var c = this.c / 100;
			var m = this.m / 100;
			var y = this.y / 100;
			var k = this.k / 100;
			this.r = 1 - Math.min( 1, c * (1-k) + k );
			this.g = 1 - Math.min( 1, m * (1-k) + k );
			this.b = 1 - Math.min( 1, y * (1-k) + k );
			this.r = Math.round(this.r * 255);
			this.g = Math.round(this.g * 255);
			this.b = Math.round(this.b * 255);
		}
	}
	
	/*
	// Translate hsl values to rgb
	// No return value, for internal use only
	*/
	_from_hsl() {
		var h = this.h;
		var s = this.s / 100;
		var l = this.l /  100;
		var c = (1 - Math.abs(2 * l - 1)) * s;
		var x = c * (1 - Math.abs((h / 60) % 2 - 1));
		var m = l - c/2;
		var r = 0;
		var g = 0;
		var b = 0;
		if (0 <= h && h < 60) { r = c; g = x; b = 0; }
		else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
		else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
		else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
		else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
		else if (300 <= h && h < 360) { r = c; g = 0; b = x; }
		this.r = Math.round((r + m) * 255);
		this.g = Math.round((g + m) * 255);
		this.b = Math.round((b + m) * 255);
	}
	
	/*
	// Calculate greyness from any color including lightened and darkened colors
	// No return value, for internal use only
	*/
	_grey(gr = 1) {
		var l = (this.l - 50) / 25;
		var r = 0.897 * this.r;
		var g = 1.761 * this.g;
		var b = 0.342 * this.b;
		var s = (r + g + b) / 3;
		this.r = Math.round(this.r + (s - this.r) * gr);
		this.g = Math.round(this.g + (s - this.g) * gr);
		this.b = Math.round(this.b + (s - this.b) * gr);
		var d =  9.5/10; 
		this.r = Math.round(this.r * d + (255 - 255 * d));
		this.g = Math.round(this.g * d + (255 - 255 * d));
		this.b = Math.round(this.b * d + (255 - 255 * d));
		if(l < 0) {
			l = Math.min(0, l+1);
			this.r += Math.round(this.r * l);
			this.g += Math.round(this.g * l);
			this.b += Math.round(this.b * l);
		}
	}
	
	/*
	// Calculate optimized color distribution by shifting indices to places with better visible luminance gaps within series
	// For internal use only
	*/
	_index(p,r,g=-1,b) {
		var s = [];
		var l = 0;
		for(var i=0;i<=100;i+=1) {
			var j = i / 100;
			var t = this.copy();
			if(g===-1) {
				t = t.lightness(Math.round(t.l + r * j));
			} else {
				t.r = Math.round(t.r + r * j);
				t.g = Math.round(t.g + g * j);
				t.b = Math.round(t.b + b * j);
			}
			var tl = t.luminance();
			if(Math.abs(tl - l) > 0.02 || j == 0) {
				s.push(j);
				l = tl;
			}
			if(j == 1 && Math.abs(tl - l) <= 0.02) s.push(1);
		}
		var sc = p * (s.length-1);
		var p1 = s[Math.floor(sc)];
		var p2 = s[Math.ceil(sc)];
		return p1 + (p2 - p1) * (sc < 1 ? sc : (sc % Math.floor(sc)));
	}
	
	/*
	// Calculate luminance value for any color
	// For internal use only
	*/
	_luminance(r, g, b) {
		// https://www.w3.org/TR/WCAG20/#relativeluminancedef
		var a = [r, g, b].map(function (v) {
			v /= 255;
			return v <= 0.03928 ? v / 12.92 : Math.pow( (v + 0.055) / 1.055, 2.4 );
		});
		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    
	/*
	// Calculate value between 0 and max
	// For internal use only
	*/
	_max(p, def = 0, max = 1) {
		return isNaN(p) ? def : p < 0 ? 0 : p > max ? max : p;
	}
    
	/*
	// Reset color to basecolor
	// For internal use only
	*/
	_resetbasecolor() {
		var clone = this.copy();
		this.r = this._basecolor.r;
		this.g = this._basecolor.g;
		this.b = this._basecolor.b;
		this.a = this._basecolor.a;
		this.h = this._basecolor.h;
		this.s = this._basecolor.s;
		this.l = this._basecolor.l;
		if(this._cmyk) {
			this.c = this._basecolor.c;
			this.m = this._basecolor.m;
			this.y = this._basecolor.y;
			this.k = this._basecolor.k;
		}
		return clone;
	}
    
	/*
	// Calculate random value left or right from a center point
	// For internal use only
	*/
	_rnd(v, tv, max) {
		var rnd = Math.random();
		var sc = max * v;
		v = tv + (-(max/2) * v) + (rnd * sc);
		v = v < 0 ? v + sc : v > max ? v - sc : v;
		return v;
	}
    
	/*
	// Calculate smart lightness with adjusted index value
	// For internal use only
	*/
	_smart_luminance(color = new ddBasecolor(), p = 0.5, sm = true) {
		if(typeof(color) !== 'undefined' && color.__proto__.constructor.name === 'ddBasecolor') {
			p = this._max(p, 0.5);
			var dl = color.l - this.l;
			if(sm) p = this._index(p,dl);
			this.l = Math.round(this.l + dl * p);
			this._from_hsl();
			if(this._cmyk) this._to_cmyk();
			return this._resetbasecolor();
		}
	}
    
	/*
	// Translate rgb values to cmyk values
	// For internal use only
	*/
	_to_cmyk() {
		if(this._cmyk) {
			if(!this.r && !this.g && !this.b) {
				this.c = 0;
				this.m = 0;
				this.y = 0;
				this.k = 1;
			} else {
				var r = 1 - (this.r / 255);
				var g = 1 - (this.g / 255);
				var b = 1 - (this.b / 255);
				this.k = Math.min(r, Math.min(g, b));
				this.c = Math.round((r - this.k) / (1-this.k) * 100000) / 1000;
				this.m = Math.round((g - this.k) / (1-this.k) * 100000) / 1000;
				this.y = Math.round((b - this.k) / (1-this.k) * 100000) / 1000;
				this.k = Math.round(this.k * 10000) / 100;
			}
		}
	}
    
	/*
	// Translate rgb values to hsl values
	// For internal use only
	*/
	_to_hsl() {
		var r = this.r / 255;
		var g = this.g / 255;
		var b = this.b / 255;
		var cmin = Math.min(r,g,b);
		var cmax = Math.max(r,g,b);
		var delta = cmax - cmin;
		var h = 0;
		var s = 0;
		var l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h = Math.round(h * 60);
		if (h < 0) h += 360;
  		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		this.h = Math.round(h);
		this.s = Math.round(s);
		this.l = Math.round(l);
		return {h:this.h,s:this.s,l:this.l,a:this.a};
	}
    
	/*
	// Get or set alpha channel
	*/
	alpha(a = false) { //g/s
		if(isNaN(a) || a === false) return this.a;
		this.a = this._max(a);
		return this._resetbasecolor();
	}
    
	/*
	// Blend 2 colors
	*/
	blend(color = new ddBasecolor(), s=true) { // smart
		if(typeof(color) !== 'undefined' && color.__proto__.constructor.name === 'ddBasecolor') {
			if(s) return this.gradient(color);
			this.r = Math.round(this.r + (color.r - this.r) / 2);
			this.g = Math.round(this.g + (color.g - this.g) / 2);
			this.b = Math.round(this.b + (color.b - this.b) / 2);
			this.a = Math.round(this.a + (color.a - this.a) / 2);
			this._to_hsl();
			if(this._cmyk) this._to_cmyk();
			return this._resetbasecolor();
		}
	}
    
	/*
	// Clone color object with new basecolor
	*/
	clone() { // general
		var clone = this.copy();
		var baseclone = Object.create(
			Object.getPrototypeOf(clone._basecolor), 
			Object.getOwnPropertyDescriptors(clone._basecolor) 
		)
		baseclone.r = clone.r;
		baseclone.g = clone.g;
		baseclone.b = clone.b;
		baseclone.a = clone.a;
		baseclone.h = clone.h;
		baseclone.s = clone.s;
		baseclone.l = clone.l;
		if(baseclone._cmyk) {
			baseclone.c = clone.c;
			baseclone.m = clone.m;
			baseclone.y = clone.y;
			baseclone.k = clone.k;
		}
		clone._basecolor = baseclone;
		return clone;
	}
    
	/*
	// Get or set cmyk values, including optional alpha channel
	*/
	cmyk(c,m,y,k,a=1) { // g/s
		if(typeof(c) !== 'undefined' && !this._cmyk) {
			this.c = 0;
			this.m = 0;
			this.y = 0;
			this.k = 0;
			this._cmyk = true;
		}
		if(this._cmyk) {
			if(typeof(c) !== 'undefined') {
				this.c = isNaN(c) || c < 0 ? 0 : c > 100 ? 100 : c;
				this.m = isNaN(m) || m < 0 ? 0 : m > 100 ? 100 : m;
				this.y = isNaN(y) || y < 0 ? 0 : y > 100 ? 100 : y;
				this.k = isNaN(k) || k < 0 ? 0 : k > 100 ? 100 : k;
				this.a = isNaN(a) || a > 1 ? 1 : a < 0 ? 0 : a;
				this._from_cmyk();
				this._to_hsl();
				return this._resetbasecolor();
			} else {
				return {c:this.c,m:this.m,y:this.y,k:this.k};
			}
		}
	}
    
	/*
	// Calculate complementary color by rotation
	*/
	complement() { // general
		return this.rotate();
	}
    
	/*
	// Copy color object with shared basecolor
	*/
	copy() { // general
		return Object.create(
			Object.getPrototypeOf(this), 
			Object.getOwnPropertyDescriptors(this) 
		);
	}
    
	/*
	// Darken by percentage
	*/
	darken(d=1,s=true) { // smart
		d = this._max(d, 1);
		var newl = this.l - this.l * d;
		if(s) return this._smart_luminance(new ddBasecolor(), d);
		else this.l = newl;
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
    
	/*
	// Desaturate by percentage
	*/
	desaturate(s = 1) { // general
		s = this._max(s, 1);
		this.s = this.s - Math.round(this.s * s);
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
	distinct() { // smart
		// future
		// make a list of colors individually distinguishable
	}
	order() { // smart
		// future
		// order a list of colors by hue or lightness
	}
    
	/*
	// Calculate gradient by percentage
	*/
	gradient(color = new ddBasecolor(), p = 0.5) { // smart
		if(typeof(color) !== 'undefined' && color.__proto__.constructor.name === 'ddBasecolor') {
			var dr = color.r - this.r;
			var dg = color.g - this.g;
			var db = color.b - this.b;
			var da = color.a - this.a;
			p = isNaN(p) ? 0.5 : p < 0 ? 0 : p > 1 ? 1 : p;
			var lf = (Math.abs(color.l - this.l) / 100) * (Math.abs(color.s - this.s) / 360);
			if(lf > 0.011) p = this._index(p,dr,dg,db);
			this.r = Math.round(this.r + dr * p);
			this.g = Math.round(this.g + dg * p);
			this.b = Math.round(this.b + db * p);
			this.a = Math.round(this.a + da * p);
			this._to_hsl();
			if(this._cmyk) this._to_cmyk();
			return this._resetbasecolor();
		}
	}
    
	/*
	// Calculate greyscale by percentage
	*/
	grey(gr = 1) { // smart
		gr = this._max(gr, 1);
		this._grey(gr);
		this._to_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
    
	/*
	// Get or set hex color as string
	*/
	hex(h) { // g/s
		if(typeof(h) !== 'undefined') {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
			if(result) {
				result.push("ff");
			} else {
				result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
			}
			if(result) {
				this.r = parseInt(result[1], 16);
				this.g = parseInt(result[2], 16);
				this.b = parseInt(result[3], 16);
				this.a = parseInt(result[4], 16) / 255;
				this._to_hsl();
				if(this._cmyk) this._to_cmyk();
				return this._resetbasecolor();
			}
		} else {
			var a = [this.r, this.g, this.b].map(function (v) {
				v = v.toString(16);
				if(v.length == 1) v = "0" + v;
				return v.length == 1 ? v = "0" + v : v;
			});
			return "#" + a[0] + a[1] + a[2];
		}
	}
    
	/*
	// Get or set hex color as string, including alpha channel
	*/
	hexa(h) { // g/s
		if(typeof(h) !== 'undefined') {
			return this.hex(h);
		} else {
			var a = [this.r, this.g, this.b, Math.round(this.a*255)].map(function (v) {
				v = v.toString(16);
				if(v.length == 1) v = "0" + v;
				return v.length == 1 ? v = "0" + v : v;
			});
			return "#" + a[0] + a[1] + a[2] + a[3];
		}
	}
    
	/*
	// Get or set hsl color as string or object
	*/
	hsl(h,s,l,a=1) { // g/s
		if(h === 'object' || h === 'obj') {
			return {h:this.h,s:this.s,l:this.l,a:this.a}
		} else if(typeof(h) !== 'undefined') {
			this.h = isNaN(h) ? 0 : h < 0 ? (h + (Math.ceil(-h / 360)*360)) % 360 : h > 360 ? h % 360 : h;
			this.s = isNaN(s) || s > 100 ? 100 : s < 0 ? 0 : s;
			this.l = isNaN(l) ? 50 : l > 100 ? 100 : l < 0 ? 0 : l;
			this.a = isNaN(a) || a > 1 ? 1 : a < 0 ? 0 : a;
			this._from_hsl();
			if(this._cmyk) this._to_cmyk();
			return this._resetbasecolor();
		} else {
			return 'hsl('+this.h+','+this.s+'%,'+this.l+'%)';
		}
	}
	
	/*
	// Get or set hsl color as string or object, including alpha channel
	*/
	hsla(h,s,l,a=1) { // g/s
		if(h === 'object' || h === 'obj') {
			return this.hsl(h,s,l,a);
		} else {
			return 'hsla('+this.h+','+this.s+'%,'+this.l+'%,'+this.a.toFixed(1)+')';
		}
	}
	
	/*
	// Get or set hue
	*/
	hue(h = false) { // general
		if(isNaN(h) || h === false) return this.h;
		this.h = h < 0 ? (h + (Math.ceil(-h / 360)*360)) % 360 : h > 360 ? h % 360 : h;
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
	
	/*
	// Calculate index value between 0 and 1
	*/
	index(m=2, i=1, shift=0) {
		// 5 1 - 0
		// 5 5 - 1 s = 0.25
		if(isNaN(m) || m < 2) m = 2;
		if(isNaN(i) || i < 1) i = 1;
		var s = 1 / (m-1);
		i = (i-1) * s;
		while(i>1) i = i - 1 + (s * shift);
		return i;
	}
	
	/*
	// Invert color by rgb values
	*/
	invert() { // general
		//https://stackoverflow.com/questions/36906252/difference-between-complement-and-invert-in-sass
		this.r = 255 - this.r;
		this.g = 255 - this.g;
		this.b = 255 - this.b;
		this._to_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
	
	/*
	// Lighten color by percentage
	*/
	lighten(l = 1, s=true) { // smart
		l = this._max(l, 1);
		var newl = this.l + (100 - this.l) * l;
		if(s) return this._smart_luminance(new ddBasecolor('white'), l);
		else this.l = newl;
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
	
	/*
	// get or set lightness
	*/
	lightness(l = false) { // g/s
		if(isNaN(l) || l === false) return this.l;
		l = this._max(l, 0, 100);
		this.l = Math.round(l);
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._basecolor ? this._resetbasecolor() : this;
	}
	
	/*
	// Get luminance value
	*/
	luminance() { // smart
		return this._luminance(this.r,this.g,this.b);
    }
	
	/*
	// Calculate monotone value
	*/
	monotone(color, sc = 1) { // general
		if(typeof(color) !== 'undefined' && color.__proto__.constructor.name === 'ddBasecolor') {
			sc = this._max(sc, 0.5);
			this._grey(1);
			var mc = this.copy();
			var s = (this.r / 255);
			this.r = color.r;
			this.g = color.g;
			this.b = color.b;
			this._to_hsl();
			this.l = Math.round(color.l * (1  - (1-(s*2))));
			this._from_hsl();
			
			var dr = this.r - mc.r;
			var dg = this.g - mc.g;
			var db = this.b - mc.b;
			this.r = Math.round(mc.r + dr * sc);
			this.g = Math.round(mc.g + dg * sc);
			this.b = Math.round(mc.b + db * sc);
			this._to_hsl();
				
			
			if(this._cmyk) this._to_cmyk();
			return this._resetbasecolor();
		}
	}
	
	/*
	// Make color transparent by percentage
	*/
	opaque(o = 1) { // general
		o = this._max(o, 1);
		this.a = this.a + (1 - this.a) * o;
		return this._resetbasecolor();
	}
	
	/*
	// Calculate color by rotation with enough color space
	*/
	rainbow(s = 0.5, c = 0, color = this.copy(), sm = true) { // smart
		if(typeof(color) !== 'undefined' && color.__proto__.constructor.name === 'ddBasecolor') {
			s = this._max(s, 0.5);
			c = isNaN(c) ? c==='cc' ? -1 : c==='s' ? 0 : c==='c' ? 1 : c==='l' ? 2 : 0 : c;
			var col = color.copy()
			if(col.r===col.g && col.r===col.b) col.h = this.h;
			var sd = col.s - this.s;
			this.s = this.s + sd * s;
			var sl = col.l - this.l;
			this.l = this.l + sl * s;
			var sa = col.a - this.a;
			this.a = this.a + sa * s;
			var hd = col.h - this.h;
			if(c < 0) while(hd >= 0) hd -= 360;
			if(c===1) while(hd <= 0) hd += 360;
			if((c===0 && hd < -180) || (c===2 && hd < 0 && hd > -180)) hd = 360 + hd;
			if((c===0 && hd > 180) || (c===2 && hd > 0 && hd < 180)) hd = -360 + hd;
			if(c===0 && hd===0) hd=360;
			if(sm) {
				var l = [];
				var dl = 0;
				for(var i=0;i<=1;i+=1/100) {
					var cl = this.copy();
					var d = cl.h + Math.round(hd * i);
					d = d < 0 ? (d + (Math.ceil(-d / 360)*360)) % 360 : d > 360 ? d % 360 : d;
					if(d === 360) d = 0;
					cl.h = d;
					cl._from_hsl();
					var ok = '';
					if(Math.abs(dl - cl.luminance()) > 0.025) {
						l.push(i);
						dl = cl.luminance();
						ok = ' ok';
					}
				}
				if(l[l.length-1] != 1) l.push(1);
				var sc = s * (l.length-1);
				var p1 = l[Math.floor(sc)];
				var p2 = l[Math.ceil(sc)];
				s = p1 + (p2 - p1) * (sc < 1 ? sc : (sc % Math.floor(sc)));
			}
			hd = this.h + Math.round(hd * s);
			hd = hd < 0 ? (hd + (Math.ceil(-hd / 360)*360)) % 360 : hd > 360 ? hd % 360 : hd;
			if(hd === 360) hd = 0;
			this.h = hd;
			this._from_hsl();
			if(this._cmyk) this._to_cmyk();
			return this._resetbasecolor();
		}
	}
	
	/*
	// Calculate random color by percentage from property
	*/
	random(r=1, g=1, b=1, h=1, s=1, l=1, a=0) { // smart
		r = this._max(r);
		g = this._max(g);
		b = this._max(b);
		h = this._max(h);
		s = this._max(s);
		l = this._max(l);
		a = this._max(a, 0);
		if(h) {
			h = this.h + (-180 * h) + (Math.random() * 360 * h);
			h = h < 0 ? (h + (Math.ceil(-h / 360)*360)) % 360 : h > 360 ? h % 360 : h;
			this.h = Math.round(h);
		}
		if(s) this.s = Math.round(this._rnd(s,this.s,100));
		if(l) this.l = Math.round(this._rnd(l,this.l,100));
		this._from_hsl();
		if(r) this.r = Math.round(this._rnd(r,this.r,255));
		if(g) this.g = Math.round(this._rnd(g,this.g,255));
		if(b) this.b = Math.round(this._rnd(b,this.b,255));
		if(a) this.a = this._rnd(a,this.a,1);
		this._to_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
	
	/*
	// Calculate color ratio for readable text on any background
	*/
	ratio(color, level = false, scale = 1) { // smart
		// https://webaim.org/resources/contrastchecker/
		// https://medium.muz.li/the-science-of-color-contrast-an-expert-designers-guide-33e84c41d156
		// https://www.w3.org/TR/WCAG20/#contrast-ratiodef
		if(typeof(color) !== 'undefined' && color.__proto__.constructor.name === 'ddBasecolor') {
			// current contrast ration
			var bgr = (this._luminance(color.r,color.g,color.b) + 0.05);
			var txt = (this._luminance(this.r,this.g,this.b) + 0.05);
			var ratio = txt > bgr ? txt / bgr : bgr / txt;
			var lum = this.l;
			level = (''+level).toLowerCase();
			if(level === 'aa' || level === 'aaa' || level === 'aa18' || level === 'aaa18') {
				level = level === 'aaa' ? 7 : level === 'aa' || level === 'aaa18' ? 4.5 : 3;
				var start = txt < bgr ? 100 : 0;
				var end = txt > bgr ? 100 : 0;
				var step = txt > bgr ? 1 : -1;
				var safe, passed = false;
				var f = -1;
				var l = -1;
				while(start != end + step) {
					this.l = start;
					this._from_hsl();
					txt = (this._luminance(this.r,this.g,this.b) + 0.05);
					ratio = txt > bgr ? txt / bgr : bgr / txt;
					safe = ratio >= level ? true : false;
					if(start == lum) passed = true;
					if(safe && (f == -1 || l != start-step)) f = start;
					if(safe) l = start;
					start += step;
				}
				if((lum > f && lum <= l) || (lum < f && lum >= l)) f = lum;
				var max = Math.max(f, l);
				var min = Math.min(f, l);
				var contrast = Math.round(f + (l - f) * scale);
				this.l = contrast;
				this._from_hsl();
				if(this._cmyk) this._to_cmyk();
				return this._resetbasecolor();
			} else {
				return ratio;
			}
		}
	}
	
	/*
	// Get or set rgb as string or object
	*/
	rgb(r,g,b,a=1) { // g/s
		if(r === 'object' || r === 'obj') {
			return {r:this.r,g:this.g,b:this.b,a:this.a}
		} else if(typeof(r) !== 'undefined') {
			this.r = Math.round(this._max(r, 0, 255));
			this.g = Math.round(this._max(g, 0, 255));
			this.b = Math.round(this._max(b, 0, 255));
			this.a = this._max(a, 1);
			this._to_hsl();
			if(this._cmyk) this._to_cmyk();
			return this._resetbasecolor();
		} else {
			return 'rgb('+this.r+','+this.g+','+this.b+')';
		}
	}
	
	/*
	// Get or set rgb as string or object, including alpha channel
	*/
	rgba(r,g,b,a=1) { // g/s
		if(r === 'object' || r === 'obj') {
			return this.rgb(r,g,b,a);
		} else {
			return 'rgba('+this.r+','+this.g+','+this.b+','+this.a.toFixed(1)+')';
		}
	}
	
	/*
	// Simple color rotation
	*/
	rotate(h = 180) { // general
		if(isNaN(h) || h === false) return this.h;
		if(h > -1 && h < 1) h *= 360;
		while(h >= 360) h -= 360;
		while(h <= -360) h += 360;
		h = this.h + h;
		this.h = (h < 0 ? (h + (Math.ceil(-h / 360)*360)) % 360 : h > 360 ? h % 360 : h);
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
	
	/*
	// Saturate color by percentage
	*/
	saturate(s = 1) { // general
		s = this._max(s, 1);
		this.s = this.s + Math.round((100 - this.s) * s);
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
	
	/*
	// Get or set saturation
	*/
	saturation(s = false) { // g/s
		if(isNaN(s) || s === false) return this.s;
		s = this._max(s, 0, 100);
		this.s = Math.round(s);
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
	
	/*
	// Make color transparent by percentage
	*/
	transparent(t = 1) { // general
		t = this._max(t, 1);
		this.a = this.a - this.a * t;
		return this._resetbasecolor();
	}
	
	/*
	// Vivid color by percentage
	*/
	vivid(c = 1) { // general
		c = this._max(c, 1);
		this.s = Math.round(this.s + ((100 - this.s) * c));
		this.l = Math.round(this.l + ((50 - this.l) * c));
		this._from_hsl();
		if(this._cmyk) this._to_cmyk();
		return this._resetbasecolor();
	}
}