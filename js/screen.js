(function (window) {
	function Screen(data) {
		this.initialize(data);
	}

	var p = Screen.prototype = new createjs.Container();

	p.data;
	p.sky;
	p.land;
	p.noise;

	p.people;

	p.container_initialize = p.initialize;

	p.initialize = function (data) {
		this.container_initialize();

		this.make(data);
	}

	p.make = function (data) {		
		this.data = data;

		this.sky = new Sky(data.sky);
		this.addChild(this.sky);

		this.land = new Land(data.land);
		this.land.y = data.sky.height;

		this.addChild(this.land);

		this.noise = new Noise(data.noise);
		this.noise.x = 0;
		this.noise.y = data.sky.height + data.land.height;		

		this.addChild(this.noise);

		this.people = [];

		for (var i = 0; i < data.numPeople * 0.6 ; i++) {
			var person = new Person();
			person.x = Math.random() * Globals.stageWidth;
			person.y = data.sky.height + Math.random() * data.land.height - person.height;

			this.people.push(person);
			this.addChild(person);
		}
	}

	p.tick = function (e) {
		this.noise.tick(e);

		for (var i = this.people.length - 1; i >= 0; i--) {
			var person = this.people[i];
			var pDx = person.baseSpeed;

			person.tick(e);			
			
			person.y += (Math.random() - 0.5) * person.baseSpeed ;

			if (person.y < this.sky.height - person.height) {
				person.y = this.sky.height - person.height;
			}

			var distanceFromShore = person.y + person.height - this.sky.height - this.land.height;

			if (distanceFromShore > 0) {
				var currentDepth = (distanceFromShore / Globals.blockSize) * this.noise.depth;

				person.depth = currentDepth;
				pDx += this.noise.speed;
			} else {
				person.depth = 0;
			}

			person.x += pDx;


			if (person.x > Globals.stageWidth) {
				this.people.splice(i, 1);
				this.removeChild(person);
			}
		};

		if (this.people.length < this.data.numPeople && Math.random() > 0.9) {
			this.spawnPerson();
		}
	}

	p.spawnPerson = function (fromAnywhere) {
		var person = new Person();
		if (fromAnywhere) {
			person.x = Math.random() * Globals.stageWidth;
		} else {
			person.x = -50;
		}

		person.y = this.sky.height + (Math.random() * this.land.height + 20) - person.height;

		this.people.push(person);
		this.addChild(person);
	}

	window.Screen = Screen;
})(window);