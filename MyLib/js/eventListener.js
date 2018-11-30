
document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === "ArrowLeft") {
        player.moveHor=-1;
        player.stateAnimation = "run";
    }
    if (keyName === "ArrowRight") {
        player.moveHor=1;
        player.stateAnimation = "run";
    }
    if (keyName === "ArrowUp") {
        player.moveVer=-1;
        player.stateAnimation = "run";
    }
    if (keyName === "ArrowDown") {
        player.moveVer=1;
        player.stateAnimation = "run";
    }

    if (keyName === " ") {

        player.stateAnimation = "attack";
    }
});
document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    if (keyName === "ArrowLeft") {
        player.moveHor=0;
        player.prevHor = -1;
        player.stateAnimation = "idle";
    }
    if (keyName === "ArrowRight") {
        player.moveHor=0;
        player.prevHor = 1;
        player.stateAnimation = "idle";
    }
    if (keyName === "ArrowUp") {
        player.moveVer=0;
        player.stateAnimation = "idle";
    }
    if (keyName === "ArrowDown") {
        player.moveVer=0;
        player.stateAnimation = "idle";
    }
    if (keyName === " ") {
        attackCountAnimation=0;
        player.stateAnimation = "idle";
    }
});