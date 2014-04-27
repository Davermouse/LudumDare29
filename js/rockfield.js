(function (window) {
	function RockField(data, screen) {
		this.data = data;
		this.screen = screen;

		this.initialize();
	}

	var p = RockField.prototype = new createjs.Container();

	p.container_initialize = p.initialize;

	p.initialize = function () {
		this.container_initialize();


		this.make();

	}

	p.make = function () {
		var dX = this.data.width / this.data.numRocks;

		for (var i = 0 ; i < this.data.numRocks ; i++) {
			var rockSize = this.data.minSize + Math.random() * (this.data.maxSize - this.data.minSize);

			var obstacle = new Obstacle({
				x: this.data.x + dX * i,
				y: this.data.y + this.data.height - rockSize + (Math.random() - 0.5) * this.data.heightRange,
				rotation: 0,
				width: rockSize,
				height: rockSize,
				color: 'AC2D2D'
			});

			this.screen.objects.push(obstacle);
			this.screen.addChild(obstacle);
		}
	}

	p.tick = function () {
		
	}

	window.RockField = RockField;
})(window);