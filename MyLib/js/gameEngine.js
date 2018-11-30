
const player = {
    image: null,
    pos:{x:128,y:192},
    moveHor: 0,
    moveVer:0,
    prevHor:1,
    stateAnimation:"idle",
    health:100,
    score:0,
    moveHorizontal: function (dir) {
        if (physicsManager.RayCastHorizontal())
            player.pos.x += dir * 5;
        else {
            if (player.pos.x >= 441) player.pos.x = 440;
            if (player.pos.x <= 37) player.pos.x = 38;
        }
    },
    moveVertical:function (dir) {
        if(physicsManager.RayCastVertical())
            player.pos.y += dir*5;
        else {
            if (player.pos.y >= 311) player.pos.y = 310;
            if (player.pos.y <= 37) player.pos.y = 38;
        }
    },
    attackEnemy:function () {
        if(this.stateAnimation==="attack") {
            for(var n=0;n<enemies.length;n++) {
                audioManager.Hit2();
                if (physicsManager.getDistanceOfObjectsX(player, enemies[n]) <= 32 && physicsManager.getDistanceOfObjectsY(player,enemies[n]) <= 32) {
                    this.stateAnimation = "attack";

                    enemies[n].health--;
                    //console.log(enemy.health);
                    //document.getElementById("health").innerText = "Health: "+player.health;
                }
            }
        }
    },
    MergePlayerWithArena:function(){
        for(var i=0;i<mapLL.length;i++){
            for(var j=0;j<mapLL[i].length;j++){
                if(mapLL[i][j] === 5)
                    mapLL[i][j]=0;
            }
        }
        var x = Math.floor(this.pos.x/32);
        var y = Math.floor(this.pos.y/32);
        mapLL[y][x]= 5;

    }
};

const enemy = {
    image: null,
    pos:{x:canvas.width-50,y:canvas.height/2-20},
    stateAnimation:"run",
    countAnimRun:0,
    countAnimAttck:0,
    countAnimDeath:0,
    health:5,
};
mapManager._loadMap("../MyLib/jsonStorage/mapTileset.json"); // çàãðóçèòü êàðòó
//mapManager.drawMapWithGrass();
mapManager.draw(ctx);
audioManager.Back();
/*
if(localStorage.getItem("map")!==null)
    mapManager.mapData = JSON.parse(localStorage.getItem("map"));
else mapManager.mapData = mapManager.loadMap("../MyLib/jsonStorage/MyMap.json");
*/
function update(time = 0) {

    if(player.health<=0){
        alert("You lost the game!");
        window.location = "../views/loginPage.html";
    }
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    dropCounterForAnimation += deltaTime;
    dropCounterForEnemyAttack += deltaTime;
    player.MergePlayerWithArena();
    if(dropCounterForEnemyAttack>dropIntervalAttackEnemy){
        for (var l=0;l<enemies.length;l++)
        enemies[l].Attack();
        player.attackEnemy();
        dropCounterForEnemyAttack=0;
    }

    if (dropCounter > dropInterval) {
        for (var l=0;l<enemies.length;l++)
        enemies[l].Move();

        if(player.moveHor!==0) {
            player.moveHorizontal(player.moveHor);
        }
        if(player.moveVer!==0){
            player.moveVertical(player.moveVer);
        }
        dropCounter=0;

    }
    if(dropCounterForAnimation>dropIntervalAnimate) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        mapManager.drawMapWithGrass();
        mapManager.draw(ctx);
        for (var l=0;l<enemies.length;l++) {
            enemies[l].Animation();
            ctx.putImageData(enemies[l].image, enemies[l].pos.x, enemies[l].pos.y);
        }
        if(player.stateAnimation==="run") {
            if(runCountAnimation<1)
                runCountAnimation++;
            else runCountAnimation=0;
            if(player.moveHor===1)
            player.image = tileDataRightRun[runCountAnimation+5];
            else if(player.moveHor===-1) player.image = tileDataLeftRun[runCountAnimation+5];

            if(player.moveVer===1 ) {
                if(player.moveHor===1)
                player.image = tileDataRightRun[runCountAnimation + 5];
                else player.image = tileDataLeftRun[runCountAnimation + 5];
            }
            else if(player.moveVer===-1) {
                if(player.moveHor===1)
                    player.image = tileDataRightRun[runCountAnimation + 5];
                else player.image = tileDataLeftRun[runCountAnimation + 5];

            }

            ctx.putImageData(player.image, player.pos.x, player.pos.y);
            dropIntervalAnimate=100;
        }
        if(player.stateAnimation==="idle") {
            if(idleCountAnimation<4)
                idleCountAnimation++;
            else idleCountAnimation=0;
            if(player.prevHor===1)
            player.image = tileDataRightIdle[idleCountAnimation];
            else if(player.prevHor===-1)player.image = tileDataLeftIdle[idleCountAnimation];
            ctx.putImageData(player.image, player.pos.x, player.pos.y);
            dropIntervalAnimate=100;
        }
        if(player.stateAnimation==="attack") {

            if(attackCountAnimation<6)
                attackCountAnimation++;
            else attackCountAnimation=0;
            if(player.prevHor===1)
            player.image = tileDataRightAttack[attackCountAnimation];
            else if(player.prevHor===-1) player.image = tileDataLeftAttack[attackCountAnimation];
            ctx.putImageData(player.image, player.pos.x, player.pos.y);
            dropIntervalAnimate=100;
        }


        dropCounterForAnimation=0;
    }

    requestAnimationFrame(update);
}
