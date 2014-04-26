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

	p.objects;

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
			this.spawnPerson(true);
		}

		this.objects = [];
		data.objects = data.objects || [];

		for (var i = 0 ; i < data.objects.length ; i++) {
			var objectData = data.objects[i];

			if (objectData.type == 'obstacle') {
				var obstacle = new Obstacle(objectData);

				this.objects.push(obstacle);
				this.addChild(obstacle);
			}
		}
	}

	p.tick = function (e) {
		this.noise.tick(e);

		for (var i = this.people.length - 1; i >= 0; i--) {
			var person = this.people[i];

			person.dX = person.baseSpeed
			person.dY = (Math.random() - 0.5) * person.baseSpeed;
			
			person.tick(e);

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
		var person = new Person(null, this);
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