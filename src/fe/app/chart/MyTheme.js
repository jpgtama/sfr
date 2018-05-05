define(["dojox/charting/Theme", "dojox/gfx/gradutils", "dojox/charting/themes/common"], function(Theme, gradutils, themes){
	// created by Tom Trenka

	var g = Theme.generateGradient,
		defaultFill = {type: "linear", space: "shape", x1: 0, y1: 0, x2: 0, y2: 100};

	themes.MyTheme = new Theme({
		chart: {
			fill:	   {
				type: "linear",
				x1: 0, x2: 0, y1: 0, y2: 100,
				colors: [
					{ offset: 0, color: "#02214a" },
					{ offset: 1, color: "#02214a" }
				]
			},
			stroke:    {color: "#b5bcc7"}
		},
		plotarea: {
			fill:	   {
				type: "linear",
				x1: 0, x2: 0, y1: 0, y2: 100,
				colors: [
					{ offset: 0, color: "#02214a" },
					{ offset: 1, color: "#02214a" }
				]
			}
		},
		axis:{
			stroke:	{ // the axis itself
				color: "#888c76",
				width: 1
			},
			tick: {	// used as a foundation for all ticks
				color:     "#5f6771",
				position:  "center",
				font:      "normal normal normal 7pt Verdana, Arial, sans-serif",	// labels on axis
				fontColor: "#888c76"								// color of labels
			}
		},
		series: {
			stroke:  {width: 2.5, color: "#fff"},
			outline: null,
			font: "normal normal normal 7pt Verdana, Arial, sans-serif",
			fontColor: "#131313"
		},
		marker: {
			stroke:  {width: 1.25, color: "#131313"},
			outline: {width: 1.25, color: "#131313"},
			font: "normal normal normal 8pt Verdana, Arial, sans-serif",
			fontColor: "#131313"
		},
		seriesThemes: [
			{fill: g(defaultFill, "#5b85fc", "#5b85fc")},
			{fill: g(defaultFill, "#613e04", "#996106")},
			{fill: g(defaultFill, "#0e3961", "#155896")},
			{fill: g(defaultFill, "#55aafa", "#3f7fba")},
			{fill: g(defaultFill, "#ad7b2a", "#db9b35")}
		],
		markerThemes: [
			{fill: "#5b85fc", stroke: {color: "#5b85fc"}},
			{fill: "#613e04", stroke: {color: "#fff"}},
			{fill: "#0e3961", stroke: {color: "#fff"}},
			{fill: "#55aafa", stroke: {color: "#fff"}},
			{fill: "#ad7b2a", stroke: {color: "#fff"}}
		]
	});

	themes.MyTheme.next = function(elementType, mixin, doPost){
		var isLine = elementType == "line",
			s, theme;
		if(isLine || elementType == "area"){
			// custom processing for lines: substitute colors
			s = this.seriesThemes[this._current % this.seriesThemes.length];
			var m = this.markerThemes[this._current % this.markerThemes.length];
			s.fill.space = "plot";
			if(isLine){
				s.stroke  = { width: 4, color: s.fill.colors[0].color};
			}
			m.outline = { width: 1.25, color: m.fill };
			theme = Theme.prototype.next.apply(this, arguments);
			// cleanup
			delete s.outline;
			delete s.stroke;
			s.fill.space = "shape";
			return theme;
		}else if(elementType == "candlestick"){
			s = this.seriesThemes[this._current % this.seriesThemes.length];
			s.fill.space = "plot";
			s.stroke  = { width: 1, color: s.fill.colors[0].color};
			theme = Theme.prototype.next.apply(this, arguments);
			return theme;
		}
		return Theme.prototype.next.apply(this, arguments);
	};

	themes.MyTheme.post = function(theme, elementType){
		theme = Theme.prototype.post.apply(this, arguments);
		if((elementType == "slice" || elementType == "circle") && theme.series.fill && theme.series.fill.type == "radial"){
			theme.series.fill = gradutils.reverse(theme.series.fill);
		}
		return theme;
	};

	return themes.MyTheme;
});
