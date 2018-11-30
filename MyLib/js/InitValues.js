const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

document.getElementById("name").innerText = "Player: "+ localStorage["nickname"];
document.getElementById("score").innerText = "Score: 0";
document.getElementById("level").innerText = "Level: 1";

document.getElementById("health").innerText = "Health: 100";

let runCountAnimation=0,idleCountAnimation=0,attackCountAnimation=0;
var envTileSet=new Image();
var playerTileSet = new Image();
var enemyTileSetRight = new Image();
var enemyTileSetLeft = new Image();
let dropCounter = 0;
let dropCounterForAnimation = 0;
let dropCounterForEnemyAttack =0;
let dropInterval = 100;
let dropIntervalAnimate = 100;
let dropIntervalAttackEnemy = 800;
let lastTime = 0;
var tileEnemyDataRightRun = [];
var tileEnemyDataRightAttack = [];
var tileEnemyDataRightDeath = [];
var tileEnemyDataLeftRun = [];
var tileEnemyDataLeftAttack = [];
var tileEnemyDataLeftDeath = [];
var tileDataRightIdle = [];
var tileDataLeftIdle = [];
var tileDataRightRun = [];
var tileDataLeftRun = [];
var tileDataRightAttack = [];
var tileDataLeftAttack = [];
var tileDataRightDeath = [];
var tileDataLeftDeath = [];
var enemies=[];
var mapLL=new Array(canvas.height/32);
for(var i=0;i<mapLL.length;i++){
    mapLL[i] = new Array(canvas.width/32);
}
for(var i=0;i<mapLL.length;i++){
    for(var j=0;j<mapLL[i].length;j++){
        mapLL[i][j] = 0;
    }
}

