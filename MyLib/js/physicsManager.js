var physicsManager={
    getDistanceOfObjectsX:function(obj1,obj2) {
        return (Math.abs(obj1.pos.x-obj2.pos.x));
    },
    getDistanceOfObjectsY:function(obj1,obj2) {
        return (Math.abs(obj1.pos.y-obj2.pos.y));
    },
    RayCastHorizontal:function(){
        return player.pos.x > 37 && player.pos.x < 441;

    },
    RayCastVertical:function () {
        return player.pos.y > 37 && player.pos.y < 311;

    }
};