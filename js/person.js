(function (window) {
	function Person(data, screen) {
		this.initialize(data, screen);
	}

	var p = Person.prototype = new createjs.Container();

	var skinTones = [ '#FFDFC4', '#F0D5BE', '#EECEB3','#E1B899','#E5C298','#FFDCB2',
'#E5B887',
'#E5A073',
'#E79E6D',
'#DB9065',
'#CE967C',
'#C67856',
'#BA6C49',
'#A57257',
'#F0C8C9',
'#DDA8A0',
'#B97C6D',
'#A8756C',
'#AD6452',
'#5C3836',
'#CB8442',
'#BD723C',
'#704139',
'#A3866A',
'#870400',
'#710101',
'#430000',
'#5B0001',
'#302E2E',
'#000000'
	];

	p.depth;
	p.height;

	p.baseSpeed;

	p.head;
	p.bTop;
	p.bBottom;

	p.headColor;
	p.bTopColor;
	p.bBottomColor;

	p.dX;
	p.dY;

	p.container_initialize = p.initialize;

	p.initialize = function (data, screen) {
		this.container_initialize();

		this.screen = screen;
		this.depth = 0;
		this.dX = 0;
		this.dY = 0;

		if (!data) {
			this.randomise();
		} else {
			this.width = Globals.blockSize;
			this.headHeight = Globals.blockSize;
			this.bTopHeight = Globals.blockSize;
			this.bBottomHeight = Globals.blockSize;
		}

		this.height = this.headHeight + this.bTopHeight + this.bBottomHeight;

		this.head = new createjs.Shape();
		this.bTop = new createjs.Shape();
		this.bBottom = new createjs.Shape();

		this.addChild(this.head);
		this.addChild(this.bTop);
		this.addChild(this.bBottom);

		this.make();
	}

	p.randomise = function () {
		this.width = (0.5 + Math.random()) * Globals.blockSize;

		var headProp = 0.3 + Math.random() * 0.06;
		var tBProp = 0.25 + Math.random() * 0.08;
		var bBProp = 1 - headProp - tBProp;

		this.height = (0.8 + Math.random() * 0.4) * 3 * Globals.blockSize;
		this.headHeight = headProp * this.height;
		this.bTopHeight = tBProp * this.height;
		this.bBottomHeight = bBProp * this.height;

		this.headColor =  skinTones[Math.floor(Math.random() * skinTones.length)];

		var bodyHue = Math.random()*360;
		this.bTopColor = createjs.Graphics.getHSL(bodyHue,70,70);
		this.bBottomColor = createjs.Graphics.getHSL(bodyHue, 50, 70);

		this.baseSpeed = 1 + Math.random() * 3;
	}

	p.make = function () {
		var depthPixels = this.depth * Globals.blockSize;

		var drawnbBottomHeight = this.bBottomHeight - depthPixels;
		if (drawnbBottomHeight < 0) { drawnbBottomHeight = 0; }

		var drawnbTopHeight = this.bTopHeight - (depthPixels - this.bBottomHeight);
		if (drawnbTopHeight > this.bTopHeight) drawnbTopHeight = this.bTopHeight;
		if (drawnbTopHeight < 0) drawnbTopHeight = 0;

		var drawnHeadHeight = this.headHeight - (depthPixels - this.bBottomHeight - this.bTopHeight);
		if (drawnHeadHeight > this.headHeight) drawnHeadHeight = this.headHeight;
		if (drawnHeadHeight < 0) drawnHeadHeight = 0;

		this.head.graphics
				 .c()
				 .beginFill(this.headColor)
				 .rect(0, 0, this.width, drawnHeadHeight);

		this.bTop.graphics
				 .c()
				 .beginFill(this.bTopColor)
				 .rect(0, this.headHeight, this.width, drawnbTopHeight);

		this.bBottom.graphics
		            .c()
					.beginFill(this.bBottomColor)
					.rect(0, this.headHeight + this.bTopHeight, this.width, drawnbBottomHeight);
	}

	p.tick = function () {
		var distanceFromShore = this.y + this.height - this.screen.sky.height - this.screen.land.height;

		if (distanceFromShore > 0) {
			this.dX += this.screen.noise.speed;

			var currentDepth = (distanceFromShore / Globals.blockSize) * this.screen.noise.depth;

			this.depth = currentDepth;
		} else {
			this.depth = 0;
		}

		this.make();

		this.y += this.dY;
		this.x += this.dX;

		for (var objectIndex in this.screen.objects) {
			var object = this.screen.objects[objectIndex];

			var topLeft = this.localToLocal(0, 0, object);
			var topRight = this.localToLocal(this.width, 0, object);
			var bottomLeft = this.localToLocal(0, this.height, object);
			var bottomRight = this.localToLocal(this.width, this.height, object);

			if (object.hitTest(topLeft.x, topLeft.y) ||
				object.hitTest(topRight.x, topRight.y) ||
				object.hitTest(bottomLeft.x, bottomLeft.y) ||
				object.hitTest(bottomRight.x, bottomRight.y)) {
				this.x -= this.dX;
				this.y -= this.dY;
			}
		}

		if (this.y < this.screen.sky.height - this.height + 5) {
			this.y = this.screen.sky.height - this.height + 5;
		}
	}

	window.Person = Person;

})(window);