(function (window) {
	function Obstacle(data) {
		this.initialize(data);
	}

	var p = Obstacle.prototype = new createjs.Container();

	p.container_initialize = p.initialize;
	p.main;

	p.initialize = function (data) {
		this.container_initialize();

		this.data = data;

		this.make();
	}

	p.make = function () {
		this.main = new createjs.Shape();

		this.main.graphics.beginFill(this.data.color)
						  .drawRect(0, 0, this.data.width, this.data.height);

		this.main.rotation = this.data.rotation;

		this.addChild(this.main);

		this.x = this.data.x;
		this.y = this.data.y;
	}

	p.tick = function () {
		
	}

	window.Obstacle = Obstacle;
})(window);