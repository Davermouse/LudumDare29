(function (window) {
	function Land(data) {
		this.initialize(data);
	}

	var p = Land.prototype = new createjs.Container();

	p.container_initialize = p.initialize;

	p.height;
	p.bg;

	p.initialize = function (data) {
		this.container_initialize();
		this.height = data.height;

		this.make(data);

	}

	p.make = function (data) {
		this.bg = new createjs.Shape();
		this.bg.graphics.beginFill(data.color).rect(0, 0, 1, 1);
		this.bg.scaleX = Globals.stageWidth;
		this.bg.scaleY = data.height;

		this.addChild(this.bg);
	}

	p.tick = function () {
		
	}

	window.Land = Land;
})(window);