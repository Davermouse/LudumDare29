(function (window) {
	function Noise(data) {
		this.initialize(data);
	}

	var p = Noise.prototype = new createjs.Container();

	p.depth;
	p.speed;

	p.bg;
	p.blocks = [];

	p.container_initialize = p.initialize;

	p.initialize = function (data) {
		this.container_initialize();

		this.depth = data.depth;
		this.speed = data.speed;
		this.make(data);
	}

	p.make = function (data) {
		var bg = new createjs.Shape();

		bg.graphics.beginFill(data.backgroundColor)
	               .rect(0,0, Globals.stageWidth, Globals.stageHeight - 100);

		this.addChild(bg);

		var hBlocks = 10;
		var vBlocks = 10;
		var dX = Globals.stageWidth / (hBlocks + 1);
		var dY = (Globals.stageHeight - 100) / (vBlocks + 1);

		for (var h = -1 ; h < hBlocks + 1; h++) {
			for (var v = 0 ; v < vBlocks; v++) {
				if (Math.random() > 0.6) continue;

				var block = new createjs.Shape();
				block.rotation = (Math.random() - 0.5) * 30;
				block.alpha = (Math.random() * 0.6) + 0.2;

				var size = Globals.blockSize * (1.5 + Math.random() * 1) * ((v / vBlocks) + 0.8);

				block.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255))
			                  .rect(-(size/2), -(size/2), size, size);
	

				block.x = (dX * (h + 1)) + (Math.random() - 0.5) * dX / 2;
				block.y = (dY * (v + 1)) + (Math.random() - 0.5) * dY / 2;

				this.addChild(block);

				this.blocks.push(block);
			}
		}
	}

	p.tick = function (e) {
		for (var i = this.blocks.length - 1; i >= 0; i--) {
			var block = this.blocks[i];

			block.x += (this.speed + ((Math.random() - 0.5) * (this.speed * 2)));
			block.y += ((Math.random() - 0.5) * 1);

			block.rotation += (Math.random() - 0.5);

			if (block.rotation < -15) block.rotation = -15;
			if (block.rotation > 15) block.rotation = 15;

			block.alpha += (Math.random() - 0.5) * 0.05;
			if (block.alpha < 0.3) block.alpha = 0.3;
			if (block.alpha > 1) block.alpha = 1;

			if (block.y < 20) block.y = 20;

			if (block.x > Globals.stageWidth + 50) {
				block.x = -50;
			}

			if (block.x < -20)
				block.x = Globals.stageWidth + 20;
		};
	}

	window.Noise = Noise;
})(window);