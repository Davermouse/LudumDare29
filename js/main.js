
var KEYCODE_ENTER = 13;		//usefull keycode
var KEYCODE_SPACE = 32;		//usefull keycode
var KEYCODE_UP = 38;		//usefull keycode
var KEYCODE_DOWN = 40;
var KEYCODE_LEFT = 37;		//usefull keycode
var KEYCODE_RIGHT = 39;		//usefull keycode
var KEYCODE_W = 87;			//usefull keycode
var KEYCODE_S = 83;
var KEYCODE_A = 65;			//usefull keycode
var KEYCODE_D = 68;			//usefull keycode

window.Globals = {
	blockSize: 10,
	stageWidth: 640,
	stageHeight: 480
}

var inputState = {
	leftDown: false,
	rightDown: false,
	upDown: false,
	downDown: false
};

var playerSpeed = 20;

var stage;
var bg;
var player;

var currentScreen;
var currentScreenIndex = 0;

var noise;
var land;

var screens = [
{
	sky: {
		color: 'rgb(0, 143, 255)',
		height: 200
	},
	land: {
		color: 'rgb(0,60,0)',
		height: 180
	},
	noise: {
		depth: 0.2,
		speed: -1,
		backgroundColor: 'darkblue'
	},
	objects: [
		{
			type: 'obstacle',
			x: 0.8 * Globals.stageWidth,
			y: 430,
			width: 60,
			height: 60,
			rotation: 20,
			color: 'gray'
		},
		{
			type: 'obstacle',
			x: 0.2 * Globals.stageWidth,
			y: 455,
			width: 30,
			height: 40,
			rotation: 70,
			color: 'gray'
		}
	],
	player: {
		startX: 50,
		startY: 80
	},
	numPeople: 18,
	basePersonSpeed: 1
},
{
	sky: {
		color: 'rgb(0, 121, 216)',
		height: 190
	},
	land: {
		color: 'rgb(48, 60, 0)',
		height: 160
	},
	noise: {
		speed: -1.2,
		depth: 0.3,
		backgroundColor: 'rgb(145, 145, 145)'
	},
	numPeople: 15,
	basePersonSpeed: 1.2
},
{
	sky: {
		color: 'rgb(0, 108, 192)',
		height: 170
	},
	land: {
		color: 'rgb(60,60,0)',
		height: 150
	},
	noise: {
		speed: -1.5,
		depth: 0.3,
		backgroundColor: 'rgb(145, 145, 145)'
	},
	objects: [
		{
			x: 0.8 * Globals.StageWidth,
			y: 400,
			color: 'gray'
		}
	],
	numPeople: 12,
	basePersonSpeed: 1.4
},
{
	sky: {
		color: '#005699',
		height: 160
	},
	land: {
		color: '#5B5B33',
		height: 130
	},
	noise: {
		speed: -1.9,
		depth: 0.3,
		backgroundColor: 'rgb(145, 145, 145)'
	},
	numPeople: 10,
	basePersonSpeed: 1.4
},
{
	sky: {
		color: '#005699',
		height: 140
	},
	land: {
		color: '#5B5B33',
		height: 110
	},
	noise: {
		speed: -2.3,
		depth: 0.3,
		backgroundColor: 'rgb(145, 145, 145)'
	},
	numPeople: 8,
	basePersonSpeed: 1.4
},
{
	sky: {
		color: '#005699',
		height: 140
	},
	land: {
		color: '#5B5B33',
		height: 110
	},
	noise: {
		speed: -2.3,
		depth: 0.3,
		backgroundColor: 'rgb(145, 145, 145)'
	},
	numPeople: 8,
	basePersonSpeed: 1.4	
}
];

function go() {
	document.onkeydown = keyDownHandler;
	document.onkeyup = keyUpHandler;

	stage = new createjs.Stage('theCanvas');
	player = new Person();

	buildScreen(screens[0]);

	stage.update();

	createjs.Ticker.addEventListener('tick', tick);
}

function buildScreen(screenData) {
	if (currentScreen) {
		stage.removeChild(currentScreen);
	}

	currentScreen = new Screen(screenData);
	stage.addChild(currentScreen);

	if (player) {
		stage.removeChild(player);
	}

	if (screenData.player) {
		player.x = screenData.player.startX;
		player.y = screenData.player.startY;
	}
	player.screen = currentScreen;

	stage.addChild(player);
}

function gotoScreen(index, playerX, playerY) {
	currentScreenIndex = index;
	this.buildScreen(screens[index]);

	if (playerX) {
		player.x = playerX;
		player.y = playerY;
	}
}

function tick(e) {
	player.dX = 0;
	player.dY = 0;

	if (inputState.leftDown) {
		player.dX -= playerSpeed;
	} else if (inputState.rightDown) {
		player.dX += playerSpeed;
	}

	if (inputState.upDown) {
		player.dY -= playerSpeed;
	} else if (inputState.downDown) {
		player.dY += playerSpeed;
	}

	player.tick();

	if (player.x < 10) {
		if (currentScreenIndex == 0)
			player.x = 10;
		else 
			gotoScreen(currentScreenIndex - 1, Globals.stageWidth - 10, player.y);
	}

	if (player.x > Globals.stageWidth) gotoScreen(currentScreenIndex + 1, 10, player.y);

	for (var objectIndex in currentScreen.objects) {
		var object = currentScreen.objects[objectIndex];

		var collides = false;

		var topLeft = player.localToLocal(0, 0, object);
		var topRight = player.localToLocal(player.width, 0, object);
		var bottomLeft = player.localToLocal(0, player.height, object);
		var bottomRight = player.localToLocal(player.width, player.height, object);

		if (object.hitTest(topLeft.x, topLeft.y) ||
			object.hitTest(topRight.x, topRight.y) ||
			object.hitTest(bottomLeft.x, bottomLeft.y) ||
			object.hitTest(bottomRight.x, bottomRight.y)) {
			player.x -= pdX;
			player.y -= pdY;
		}
	}


	currentScreen.tick(e);

	stage.update(e);
}

function keyDownHandler(e) {
	if (!e) { var e = window.event; }
	switch (e.keyCode) {
		case KEYCODE_LEFT:
		case KEYCODE_A:
			inputState.leftDown = true;
		break;
		case KEYCODE_RIGHT:
		case KEYCODE_D:
			inputState.rightDown = true;
		break;	
		case KEYCODE_UP:
		case KEYCODE_W:
			inputState.upDown = true;
		break;
		case KEYCODE_DOWN:
		case KEYCODE_S:
			inputState.downDown = true;
		break;
	}
}

function keyUpHandler(e) {
if (!e) { var e = window.event; }
	switch (e.keyCode) {
		case KEYCODE_LEFT:
		case KEYCODE_A:
			inputState.leftDown = false;
		break;
		case KEYCODE_RIGHT:
		case KEYCODE_D:
			inputState.rightDown = false;
		break;	
		case KEYCODE_UP:
		case KEYCODE_W:
			inputState.upDown = false;
		break;
		case KEYCODE_DOWN:
		case KEYCODE_S:
			inputState.downDown = false;
		break;
	}
}