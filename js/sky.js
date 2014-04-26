(function (window) {
	function Sky(data) {
		this.initialize(data);
	}

	var p = Sky.prototype = new createjs.Container();

	p.height;
	p.bg;

	p.container_initialize = p.initialize;

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

	window.Sky = Sky;
})(window);