(function (window) {
	function Screen(data) {
		this.initialize(data);
	}

	var p = Screen.prototype = new createjs.Container();

	p.sky;
	p.land;
	p.noise;

	p.container_initialize = p.initialize;

	p.initialize = function (data) {
		this.container_initialize();

		this.make(data);
	}

	p.make = function (data) {		
		this.sky = new Sky(data.sky);
		this.addChild(this.sky);

		this.land = new Land(data.land);
		this.land.y = data.sky.height;

		this.addChild(this.land);

		this.noise = new Noise(data.noise);
		this.noise.x = 0;
		this.noise.y = data.sky.height + data.land.height;

		stage.addChild(this.noise);
	}

	p.tick = function (e) {
		this.noise.tick(e);
	}

	window.Screen = Screen;
})(window);