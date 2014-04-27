
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

var playerSpeed = 5;

var stage;
var bg;
var player;

var initialScreenIndex = 0;

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
		backgroundColor: 'darkblue',
		flotCount: 2
	},
	objects: [/*
		{
			type: 'obstacle',
			x: 0.8 * Globals.stageWidth,
			y: 430,
			width: 60,
			height: 60,
			rotation: 20,
			color: 'rgb(60,60,60)'
		},
		{
			type: 'obstacle',
			x: 0.2 * Globals.stageWidth,
			y: 455,
			width: 30,
			height: 40,
			rotation: 70,
			color: 'gray'
		},
		{
			type: 'obstacle',
			x: 0.5 * Globals.stageWidth,
			y: 420,
			width: 20,
			height: 20,
			rotation: 39,
			color: 'gray'
		},*/
		{
			type: 'text',
			x: 50,
			y: 50,
			text: "Beneath its surface",
			color: 'white'
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
		backgroundColor: 'rgb(17,0, 97)'
	},
	objects: [
			{
			type: 'text',
			x: 50,
			y: 50,
			text: "Beneath its surface",
			color: 'rgb(200,200,200)'
		},
		{
			type: 'text',
			x: 70,
			y: 90,
			text: "Lay the Idea",
			color: 'white'
		}/*,{
			type: 'obstacle',
			x: 0.5 * Globals.stageWidth,
			y: 420,
			width: 60,
			height: 60,
			rotation: 25,
			color: 'rgb(60,60,60)'
		},{
			type: 'obstacle',
			x: 0.2 * Globals.stageWidth,
			y: 400,
			width: 80,
			height: 70,
			rotation: 36,
			color: 'darkgray'
		}*/
	],
	numPeople: 15,
	basePersonSpeed: 1.2
},
{
	sky: {
		color: 'rgb(0, 108, 192)',
		height: 180
	},
	land: {
		color: 'rgb(60,60,0)',
		height: 175
	},
	noise: {
		speed: -1.5,
		depth: 0.3,
		backgroundColor: 'rgb(14,0, 85)',
		flotCount: 3
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
		height: 170
	},
	land: {
		color: '#5B5B33',
		height: 155
	},
	noise: {
		speed: -1.9,
		depth: 0.3,
		backgroundColor: 'rgb(10,0, 70)',
		flotCount: 3
	},
	objects: [
	{
		type: 'text',
		x: 70,
		y: 70,
		text: 'Expressed through novel gameplay',
		color: 'white'
	},
	{
		type: 'text',
		x: 50,
		y: 40,
		text: "The Idea",
		color: 'lightgray'
	}
	],
	numPeople: 10,
	basePersonSpeed: 1.4
},
{
	sky: {
		color: '#6BCDFF',
		height: 140
	},
	land: {
		color: '#5B5B33',
		height: 110
	},
	noise: {
		speed: -2.3,
		depth: 0.3,
		backgroundColor: 'rgb(6, 0, 55)',
		flotCount: 5
	},
	objects: [
	{
		type: 'text',
		x: 70,
		y: 70,
		text: 'Displayed through beautiful graphics',
		color: 'white'
	},
	{
		type: 'text',
		x: 50,
		y: 40,
		text: "The Idea",
		color: 'gray'
	}
	],
	numPeople: 8,
	basePersonSpeed: 1.4
},
{
	sky: {
		color: '#FFCE93',
		height: 130
	},
	land: {
		color: '#A0A05B',
		height: 90
	},
	noise: {
		speed: -2.8,
		depth: 0.3,
		backgroundColor: 'rgb(6, 0, 40)',
		flotCount: 4
	},
	objects: [
	{
		type: 'text',
		x: 70,
		y: 70,
		text: 'Audible through great sound',
		color: 'white'
	},
	{
		type: 'text',
		x: 50,
		y: 40,
		text: "The Idea",
		color: 'gray'
	}
	],
	numPeople: 6,
	basePersonSpeed: 1.4	
},
{
	sky: {
		color: '#FF743D',
		height: 115
	},
	land: {
		color: '#BCBC6B',
		height: 65
	},
	noise: {
		speed: -3.5,
		depth: 0.3,
		backgroundColor: 'rgb(3, 0, 35)',
		flotCount: 6
	},
	numPeople: 4,
	basePersonSpeed: 1.4	
},
{
	sky: {
		color: '#FF743D',
		height: 105
	},
	land: {
		color: '#BCBC6B',
		height: 55
	},
	noise: {
		speed: -4,
		depth: 0.3,
		backgroundColor: 'rgb(3, 0, 35)',
		flotCount: 7
	},
	objects: [
	{
		type: 'obstacle',
		x: 85,
		y: 100,
		rotation: 0,
		width: 50,
		height: 50,
		color: 'AC2D2D'
	},
		{
		type: 'obstacle',
		x: 140,
		y: 135,
		rotation: 0,
		width: 20,
		height: 20,
		color: 'c13131'
	},
		{
		type: 'obstacle',
		x: 180,
		y: 95,
		rotation: 0,
		width: 50,
		height: 50,
		color: '952020'
	},
		{
		type: 'obstacle',
		x: 250,
		y: 113,
		rotation: 0,
		width: 40,
		height: 40,
		color: '892525'
	},
		{
		type: 'obstacle',
		x: 304,
		y: 102,
		rotation: 0,
		width: 43,
		height: 43,
		color: '961919'
	},
		{
		type: 'obstacle',
		x: 360,
		y: 115,
		rotation: 0,
		width: 23,
		height: 23,
		color: 'AC2D2D'
	},
	
		{
		type: 'obstacle',
		x: 390,
		y: 105,
		rotation: 0,
		width: 45,
		height: 45,
		color: 'AC2D2D'
	},
	{
		type: 'text',
		x: 50,
		y: 30,
		color: 'white',
		text: 'But the real struggle'
	}
	],
	numPeople: 3,
	basePersonSpeed: 1.4	
},
{
	sky: {
		color: '#FF743D',
		height: 105
	},
	land: {
		color: '#BCBC6B',
		height: 45
	},
	noise: {
		speed: -5,
		depth: 0.1,
		backgroundColor: 'rgb(3, 0, 35)',
		flotCount: 10
	},
	objects: [
	],
	numPeople: 4,
	basePersonSpeed: 1.4	
},
{
	sky: {
		color: '#FF743D',
		height: 105
	},
	land: {
		color: '#BCBC6B',
		height: 30
	},
	noise: {
		speed: -7,
		depth: 0.1,
		backgroundColor: 'rgb(3, 0, 35)',
		flotCount: 14
	},
	objects: [
	{
		type: 'obstacle',
		x: 520,
		y: 100,
		rotation: 0,
		width: 30,
		height: 30,
		color: 'AC2D2D'
	},
	{
		type: 'obstacle',
		x: 570,
		y: 85,
		rotation: 0,
		width: 45,
		height: 45,
		color: 'AC2D2D'
	},
	{
		type: 'text',
		x: 50,
		y: 40,
		color: 'white',
		text: 'Is that initial idea'
	}
	],
	numPeople: 4,
	basePersonSpeed: 1.4	
},
{
	sky: {
		color: '#FF743D',
		height: 105
	},
	land: {
		color: '#BCBC6B',
		height: 5
	},
	noise: {
		speed: -7,
		depth: 0.1,
		backgroundColor: 'rgb(3, 0, 35)',
		flotCount: 18
	},
	objects: [
	{
		type: 'text',
		x: 50,
		y: 40,
		color: 'white',
		text: "This isn't that game"
	}
	],
	numPeople: 2,
	basePersonSpeed: 1.4	
},
{
	noise: {
		speed: -10,
		depth: 0.01,
		backgroundColor: 'rgb(1, 0, 15)'
	},
	objects: [
	{
		type: 'text',
		x: 300,
		y: 230,
		color: 'white',
		text: 'The End'
	}
	],
	numPeople: 0
}
];

function go() {
	document.onkeydown = keyDownHandler;
	document.onkeyup = keyUpHandler;

	stage = new createjs.Stage('theCanvas');
	player = new Person();

	gotoScreen(initialScreenIndex);

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

	currentScreen.objects.push(player);
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

	if (player.x > Globals.stageWidth) {
		if (currentScreenIndex + 1 < this.screens.length) {
			gotoScreen(currentScreenIndex + 1, 10, player.y);	
		} else {
			player.x = Globals.stageWidth;
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