
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
		color: 'blue',
		height: 100
	},
	land: {
		color: 'rgb(0,60,0)',
		height: 70
	},
	noise: {
		backgroundColor: 'rgb(145, 145, 145)'
	},
	player: {
		startX: 50,
		startY: 80
	}
},
{
	sky: {
		color: 'pink',
		height: 100
	},
	land: {
		color: 'rgb(0,60,0)',
		height: 70
	},
	noise: {
		backgroundColor: 'rgb(145, 145, 145)'
	},
	player: {
		startX: 20,
		startY: 120
	}
}
];

function go() {
	document.onkeydown = keyDownHandler;
	document.onkeyup = keyUpHandler;

	stage = new createjs.Stage('theCanvas');

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

	/*
	
	bg = new createjs.Shape();
	bg.graphics.beginFill('blue').rect(0, 0, 1, 1);
	bg.scaleX = Globals.stageWidth;
	bg.scaleY = Globals.stageHeight;

	stage.addChild(bg);

	land = new createjs.Container();
	var landBg = new createjs.Shape();
	landBg.graphics.beginFill('rgb(0, 60, 0)')
	      .rect(0, 0,  Globals.stageWidth, 50);
	land.addChild(landBg);

	land.x = 0;
	land.y = 60;

	stage.addChild(land);

	noise = new Noise;
	noise.x = 0;
	noise.y = 100;

	stage.addChild(noise);
*/
	if (player) {
		stage.removeChild(player);
	}

	player = new Player();

	player.x = screenData.player.startX;
	player.y = screenData.player.startY;

	stage.addChild(player);
}

function gotoNextScreen() {
	currentScreenIndex++;
	this.buildScreen(screens[currentScreenIndex]);
}

function tick(e) {
	if (inputState.leftDown) {
		player.x -= 2;
	} else if (inputState.rightDown) {
		player.x += 2;
	}

	if (inputState.upDown) {
		player.y -= 2;
	} else if (inputState.downDown) {
		player.y += 2;
	}

	if (player.y < currentScreen.sky.height - player.height) {
		player.y = currentScreen.sky.height - player.height;
	}

	if (player.x < 0) player.x = 0;
	if (player.x > Globals.stageWidth) gotoNextScreen();

	player.tick();
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