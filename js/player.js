(function (window) {
	function Player() {
		this.initialize();
	}

	var p = Player.prototype = new createjs.Container();

	p.height;

	p.vX;
	p.vY;

	p.head;
	p.bTop;
	p.bBottom;

	p.container_initialize = p.initialize;

	p.initialize = function () {
		this.container_initialize();

		this.head = new createjs.Shape();
		this.bTop = new createjs.Shape();
		this.bBottom = new createjs.Shape();

		this.addChild(this.head);
		this.addChild(this.bTop);
		this.addChild(this.bBottom);

		this.make();

		this.vX = 0;
		this.vY = 0;

		this.height = 3 * Globals.blockSize;
	}

	p.make = function () {
		this.head.graphics.beginFill('pink').rect(0,0,Globals.blockSize,Globals.blockSize);
		this.bTop.graphics.beginFill('green').rect(0,Globals.blockSize,Globals.blockSize,Globals.blockSize);
		this.bBottom.graphics.beginFill('rgb(2, 100, 2)').rect(0,2 * Globals.blockSize,Globals.blockSize,Globals.blockSize);
	}

	p.tick = function () {

	}

	window.Player = Player;

})(window);