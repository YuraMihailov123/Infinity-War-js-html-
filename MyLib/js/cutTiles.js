envTileSet.src="../MyLib/images/JapaneseVillage.png";
envTileSet.onload = function() {
    ctx.drawImage(envTileSet, 0, 0);

    for(i=0;i<32;i+=32) {
        for (j = 0; j < 96; j += 32) {
            if (j === 64) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                grass = myImageData;
            }
        }
    }

    mapManager.drawMapWithGrass();
    enemyTileSetRight.src="../MyLib/images/Gladiator-Sprite Sheet.png";
};


enemyTileSetRight.onload = function() {
    ctx.drawImage(enemyTileSetRight, 0, 0);

    for(i=0;i<256;i+=32) {
        for (j = 0; j < 160; j += 32) {
            if (j === 32) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileEnemyDataRightRun.push(myImageData);
            }
            if (j === 64) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileEnemyDataRightAttack.push(myImageData);
            }

            if (j === 128) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileEnemyDataRightDeath.push(myImageData);
            }
        }
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    mapManager.drawMapWithGrass();
    enemyTileSetLeft.src="../MyLib/images/Gladiator-Sprite Sheet-Left.png";
};

enemyTileSetLeft.onload = function() {
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(enemyTileSetLeft, 0, 0);

    for(i=0;i<256;i+=32){
        for(j=0;j<160;j+=32){
            if(j===32) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileEnemyDataLeftRun.push(myImageData);
            }
            if(j===64) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileEnemyDataLeftAttack.push(myImageData);
            }

            if(j===128) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileEnemyDataLeftDeath.push(myImageData);
            }
        }
    }
    //for(var i=0;i<tileEnemyDataLeftAttack.length;i++)
    //ctx.putImageData(tileEnemyDataLeftAttack[0],200+15*i,200)
    ctx.clearRect(0,0,canvas.width,canvas.height);
    mapManager.drawMapWithGrass();

    playerTileSet.src = "../MyLib/images/Dwarf Sprite Sheet.png";
};

playerTileSet.onload = function() {
    ctx.drawImage(playerTileSet, 0, 0);

    for(i=0;i<320;i+=32){
        for(j=0;j<320;j+=32){
            if(j===0) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                //ImageDataRightIdle[i]=ctx.createImageData(myImageData);
                //ImageDataRightIdle[i].data=myImageData.data;
                tileDataRightIdle.push(myImageData);
            }
            if(j===32) {
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileDataRightRun.push(myImageData);
            }
            if(j===64){
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileDataRightAttack.push(myImageData);
            }
            if(j===128){
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileDataRightDeath.push(myImageData);
            }
            if(j===160){
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileDataLeftIdle.push(myImageData);
            }
            if(j===192){
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileDataLeftRun.push(myImageData);
            }
            if(j===224){
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileDataLeftAttack.push(myImageData);
            }
            if(j===288){
                var myImageData = ctx.getImageData(i, j, 32, 32);
                tileDataLeftDeath.push(myImageData);
            }
        }
    }
    player.image = tileDataRightIdle[0];

    for (var k=0;k<(player.score+1);k++){
        var o = JSON.parse(JSON.stringify(enemy));
        o.pos.x+=k*33;
        o.pos.y+=k*10;
        o.number=k;
        o.Move = function (){
            if(this.health>0) {

                var goX=false;
                var goY=false;
                for (var p=0;p<(player.score+1);p++) {
                    //go=true;

                    /*if (p !== k && (getDistanceOfObjectsX(this,enemies[p])>32)){ //|| getDistanceOfObjectsY(this,enemies[p])>=32)) {
                        goX = true;
                    }else if (p !== k && (getDistanceOfObjectsX(this,enemies[p])<=32)){
                        goX = false;
                    }
                    if (p !== k && (getDistanceOfObjectsY(this,enemies[p])>32)){ //|| getDistanceOfObjectsY(this,enemies[p])>=32)) {
                        goY = true;
                    }else if (p !== k && (getDistanceOfObjectsY(this,enemies[p])<=32)){
                        goY = false;
                    }
                    console.log(goY,goX);
                    */
                }
                if (this.pos.x - player.pos.x > 32 ) {
                    this.pos.x -= 3;
                    this.stateAnimation = "run";
                }

                if (this.pos.x - player.pos.x < -32 ) {
                    this.pos.x += 3;
                    this.stateAnimation = "run";
                }
                if (this.pos.y - player.pos.y > 32 ) {
                    this.pos.y -= 3;
                    this.stateAnimation = "run";
                }
                if (this.pos.y - player.pos.y < -32) {
                    this.pos.y += 3;
                    this.stateAnimation = "run";
                }
            }
        };
        o.Animation = function(){
            if (this.health <= 0) {
                audioManager.Death();
                player.score++;
                document.getElementById("score").innerText = "Score: "+player.score;
                document.getElementById("level").innerText = "Level: "+(player.score+1);
                this.pos.x=canvas.width-50;
                this.pos.y=canvas.height/2-20;
                this.health = 5;
                this.stateAnimation = "run";
                //enemies.splice(this.number);

            }
            if(this.health>0) {
                if (this.stateAnimation === "attack") {
                    if (this.countAnimAttck < 6)
                        this.countAnimAttck++;
                    else {
                        this.countAnimAttck = 0;
                    }
                    if (this.pos.x - player.pos.x > 0)
                        this.image = tileEnemyDataLeftAttack[this.countAnimAttck];
                    else this.image = tileEnemyDataRightAttack[this.countAnimAttck];
                }
                if (this.stateAnimation === "run") {
                    this.countAnimAttck=0;
                    if (this.countAnimRun < 1)
                        this.countAnimRun++;
                    else {
                        this.countAnimRun = 0;
                    }
                    if (this.pos.x - player.pos.x > 0)
                        this.image = tileEnemyDataLeftRun[this.countAnimRun + 5];
                    else this.image = tileEnemyDataRightRun[this.countAnimRun + 5];
                }

            }
        };
        o.Attack = function ()
        {
            if(this.health>0) {
                if (Math.abs(this.pos.x - player.pos.x) <= 32 && Math.abs(this.pos.y - player.pos.y) <= 32) {
                    this.stateAnimation = "attack";
                    audioManager.Hit1();
                    player.health--;
                    document.getElementById("health").innerText = "Health: " + player.health;
                }
            }
        };

        enemies.push(o);
        //console.log(o);
    }
    for(var a=0;a<enemies.length;a++) {
        enemies[a].image = tileEnemyDataLeftRun[0];
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    update();
};
