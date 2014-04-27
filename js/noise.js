(function (window) {
	function Noise(data, screen)
	{
		this.screen = screen;		
		this.data = data;
		this.initialize(data);
	}

	var p = Noise.prototype = new createjs.Container();

	p.depth;
	p.speed;

	p.bg;
	p.blocks = [];
	p.flots = [];

	p.flotSpawnTime;

	p.container_initialize = p.initialize;

	p.initialize = function (data) {
		this.container_initialize();

		this.height = Globals.stageHeight;

		if (this.screen.data.sky) this.height -= this.screen.data.sky.height;
		if (this.screen.data.land) this.height -= this.screen.data.land.height;
		
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
		var vBlocks = Math.floor(this.height / 20);
		var dX = Globals.stageWidth / (hBlocks + 1);
		var dY = this.height / (vBlocks + 1);

		for (var h = -1 ; h < hBlocks + 1; h++) {
			for (var v = 0 ; v < vBlocks; v++) {
				if (Math.random() > 0.6) continue;

				var block = new createjs.Shape();
				block.rotation = (Math.random() - 0.5) * 30;
				block.alpha = (Math.random() * 0.4) + 0.1;

				var size = Globals.blockSize * (1.5 + Math.random() * 1) * ((v / vBlocks) + 0.8);

				block.graphics.beginFill(createjs.Graphics.getRGB(255, 255, 255))
			                  .rect(-(size/2), -(size/2), size, size);
	

				block.x = (dX * (h + 1)) + (Math.random() - 0.5) * dX / 2;
				block.y = (dY * (v + 1)) + (Math.random() - 0.5) * dY / 2;

				this.addChild(block);

				this.blocks.push(block);
			}
		}

		for (var i = 0; i < this.data.flotCount / 2; i++) {
			this.spawnFlot(true);
		}

		this.flotSpawnTime = createjs.Ticker.getTime() + (Math.abs(this.data.speed) * (5000 + Math.random() * 5000));
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
			if (block.alpha > 0.6) block.alpha = 0.6;

			if (block.y < 20) block.y = 20;

			if (block.x > Globals.stageWidth + 50) {
				block.x = -50;
			}

			if (block.x < -20)
				block.x = Globals.stageWidth + 20;
		};

		for (var i = this.flots.length - 1; i >= 0; i--) {
			var flot = this.flots[i];

			flot.x += this.speed * 2;
			flot.rotation += flot.dTheta;

			if (flot.x < -100 ||
				flot.x > Globals.stageWidth + 100) {
				this.flots.splice(i, 1);
				this.removeChild(flot);

				var sI = createjs.indexOf(this.screen.objects, flot);
				this.screen.objects.splice(sI, 1);

				console.log('remove flot, object count: ' + this.screen.objects.length);
			}
		};

		if (this.flots.length < this.data.flotCount &&
			createjs.Ticker.getTime() > this.flotSpawnTime) {
			this.spawnFlot(false);

			this.flotSpawnTime = createjs.Ticker.getTime() + ((5000 + Math.random() * 10000) / Math.abs(this.data.speed));
		}
	}

	p.spawnFlot = function (anywhere) {
		var flot = new Flot({ width: 50, height: 50, color: 'brown' }, this.screen);

		if (anywhere) {
			flot.x = Math.random() * Globals.stageWidth;
		} else {
			if (this.speed < 0) 
				flot.x = Globals.stageWidth + 50;
			else 
				flot.x = -50;
		}

		flot.y = 25 + Math.random() * (this.height - 50);
		flot.dTheta = Math.random() * 0.1;

		this.flots.push(flot);
		this.addChild(flot);
		this.screen.objects.push(flot);	
		console.log('added flot, object count: ' + this.screen.objects.length);
	}

	window.Noise = Noise;
})(window);