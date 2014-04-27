(function (window) {
	function Flot(data) {
		this.data = data;

		this.initialize();		
	}

	var p = Flot.prototype = new createjs.Container();

	p.container_initialize = p.initialize;
	p.dR;

	p.initialize = function () {
		this.container_initialize();

		this.make();
	}

	p.make = function () {
		var shape = new createjs.Shape();
		shape.graphics.beginFill(this.data.color)
		              .drawRect(0,0, this.data.width, this.data.height);

		this.addChild(shape);

		this.isFixed = true;
      	this.regX = this.data.width / 2;
      	this.regY = this.data.height / 2;

		this.rotation = Math.random() * 90;
	}

	p.tick = function () {
		
	}

	p.getPoints = function () {
		return [
			this.localToGlobal(0, 0),
			this.localToGlobal(this.data.width, 0),
			this.localToGlobal(this.data.width, this.data.height),
			this.localToGlobal(0, this.data.height)
		];
	}

	window.Flot = Flot;
})(window);