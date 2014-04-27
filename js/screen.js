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

		this.objects = [];

		if (data.sky) {
			this.sky = new Sky(data.sky);
			this.addChild(this.sky);
		}

		if (data.land) {
			this.land = new Land(data.land);
			this.land.y = data.sky.height;

			this.addChild(this.land);
		}

		if (data.noise) {
			this.noise = new Noise(data.noise, this);
			this.noise.x = 0;
			this.noise.y = 0 + (data.sky ? data.sky.height : 0) + (data.land ?  data.land.height: 0);		

			this.addChild(this.noise);
		}

		this.people = [];

		for (var i = 0; i < data.numPeople * 0.6 ; i++) {
			this.spawnPerson(true);
		}

		data.objects = data.objects || [];

		for (var i = 0 ; i < data.objects.length ; i++) {
			var objectData = data.objects[i];

			if (objectData.type == 'rockfield') {
				var field = new RockField(objectData, this);

			}

			if (objectData.type == 'obstacle') {
				var obstacle = new Obstacle(objectData);

				this.objects.push(obstacle);
				this.addChild(obstacle);
			} else if (objectData.type == 'text') {
				var text = new createjs.Text(objectData.text, "24px Quantico", objectData.color);

				text.x = objectData.x;
				text.y = objectData.y;
				this.addChild(text);
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

			if (person.x > Globals.stageWidth || person.x < -50) {
				this.people.splice(i, 1);				
				this.removeChild(person);

				var o = createjs.indexOf(this.objects, person);
				this.objects.splice(o, 1);
			}
		};

		if (this.people.length < this.data.numPeople && Math.random() > 0.9) {
			this.spawnPerson();
		}

		for (var i = this.objects.length - 1; i >= 0; i--) {
			var objectA = this.objects[i];
			var objectAPts = objectA.getPoints();

			var axis1 = {x: objectAPts[0].x - objectAPts[1].x,
						 y: objectAPts[0].y - objectAPts[1].y};

			var axis2 = {x: objectAPts[1].x - objectAPts[2].x,
						 y: objectAPts[1].y - objectAPts[2].y};

			var axis1ARange = rangeOfMagsOnAxis([objectAPts[0], objectAPts[1]], axis1);
			var axis2ARange = rangeOfMagsOnAxis([objectAPts[1], objectAPts[2]], axis2);

			for (var j = i - 1 ; j >= 0 ; j--) {
				var objectB = this.objects[j];
				var objectBPts = objectB.getPoints();

				var axis1BRange = rangeOfMagsOnAxis(objectBPts, axis1);

				if (rangesOverlap(axis1ARange, axis1BRange)) {
					var axis2BRange = rangeOfMagsOnAxis(objectBPts, axis2);

					if (rangesOverlap(axis2ARange, axis2BRange)) {
						var axis3 = {
							x: objectBPts[0].x - objectBPts[1].x,
							y: objectBPts[0].y - objectBPts[1].y
						};

						var axis3ARange = rangeOfMagsOnAxis(objectAPts, axis3);
						var axis3BRange = rangeOfMagsOnAxis([objectBPts[0], objectBPts[1]], axis3);

						if (rangesOverlap(axis3ARange, axis3BRange)) {
							var axis4 = {
								x: objectBPts[1].x - objectBPts[2].x,
								y: objectBPts[1].y - objectBPts[2].y
							};

							var axis4ARange = rangeOfMagsOnAxis(objectAPts, axis4);
							var axis4BRange = rangeOfMagsOnAxis([objectBPts[1], objectBPts[2]], axis4);

							if (rangesOverlap(axis4ARange, axis4BRange)) {
								var centerA = {
									x: objectAPts[0].x + objectAPts[2].x - (objectAPts[0].x / 2),
									y: objectAPts[0].y + objectAPts[2].y - (objectAPts[0].y / 2)
								}

								var centerB = {
									x: objectBPts[0].x + objectBPts[2].x - (objectBPts[0].x / 2),
									y: objectBPts[0].y + objectBPts[2].y - (objectBPts[0].y / 2)
								}

								var d = {
									x: centerA.x - centerB.x,
									y: centerA.y - centerB.y
								};

								var obstacle = null;
								var person = null;
								if (objectA instanceof Obstacle &&
									objectB instanceof Person) {
									obstacle = objectA;
									person = objectB;
								}

								if (objectB instanceof Obstacle &&
									objectA instanceof Person) {
									obstacle = objectB;
									person = objectA;
								}

								if (person != null) {
									person.x -= person.dX;
									person.y += 0.1 - person.dY;
								} else {
									if (!objectA.isFixed) {
										objectA.x += d.x * 0.1;
										objectA.y += d.y * 0.1;
									}

									if (!objectB.isFixed) {
										objectB.x -= d.x * 0.1;
										objectB.y -= d.y * 0.1;
									}
								}
/*
								if (objectA instanceof Person &&
									objectB instanceof Person) {
									var dX = (objectA.dX - objectB.dX) / 2;
									var dY = (objectA.dY - objectB.dY) / 2;

									objectA.x -= dX; objectA.y -= dY;
									objectB.x += dX; objectB.y += dY;
								} else if (objectA instanceof Person) {
									objectA.x -= objectA.dX;
									objectA.y -= objectA.dY;
								} else if (objectB instanceof Person) {
									objectB.x -= objectB.dX;
									objectB.y -= objectB.dY;
								}*/
							}
						}
					}
				}
			}
		};
	}

	function pointMagOnAxis(point, axis) {
		var mul = (point.x * axis.x + point.y * axis.y) / (axis.x * axis.x + axis.y * axis.y);

		return mul * axis.x * axis.x + mul * axis.y * axis.y;		
	}

	function rangeOfMagsOnAxis(points, axis) {
		var max = -9999999;
		var min = 9999999;

		for (var i = 0; i < points.length; i++) {
			var mag = pointMagOnAxis(points[i], axis);

			if (mag > max) max = mag;
			if (mag < min) min = mag;
		};

		return {min :min, max: max};
	}

	function rangesOverlap(range1, range2) {
		return range1.min < range2.max &&
			   range1.max > range2.min;
	}

	p.spawnPerson = function (fromAnywhere) {
		var person = new Person(null, this);
		if (fromAnywhere) {
			do {
				person.x = Math.random() * Globals.stageWidth;
			} while (person.collides())

		} else {
			person.x = -50;
		}

		person.y = this.sky.height + (Math.random() * this.land.height + 20) - person.height;

		this.people.push(person);
		this.objects.push(person);
		this.addChild(person);
	}

	window.Screen = Screen;
})(window);