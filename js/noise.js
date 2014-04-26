(function (window) {
	function Noise() {
		this.initialize();
	}

	var p = Noise.prototype = new createjs.Container();

	p.bg;
	p.blocks = [];

	p.container_initialize = p.initialize;

	p.initialize = function () {
		this.container_initialize();

		this.make();
	}

	p.make = function () {
		var bg = new createjs.Shape();

		bg.graphics.beginFill('rgb(145, 145, 145)')
	               .rect(0,0, Globals.stageWidth, Globals.stageHeight - 100);

		this.addChild(bg);

		var hBlocks = 10;
		var vBlocks = 10;
		var dX = Globals.stageWidth / (hBlocks + 1);
		var dY = (Globals.stageHeight - 100) / (vBlocks + 1);

		for (var h = -3 ; h < hBlocks; h++) {
			for (var v = 0 ; v < vBlocks; v++) {
				if (Math.random() > 0.7) continue;

				var block = new createjs.Shape();
				block.rotation = (Math.random() - 0.5) * 30;
				block.alpha = (Math.random() * 0.6) + 0.4;

				var size = Globals.blockSize * (1.5 + Math.random() * 1);

				block.graphics.beginFill('gray')
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

			block.x += (1 + ((Math.random() - 0.5) * 2));
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
		};
	}

	window.Noise = Noise;
})(window);