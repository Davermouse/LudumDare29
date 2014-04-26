(function (window) {
	function Person(data) {
		this.initialize(data);
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

	p.container_initialize = p.initialize;

	p.initialize = function (data) {
		this.container_initialize();

		this.depth = 0;

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
		this.make();
	}

	window.Person = Person;

})(window);