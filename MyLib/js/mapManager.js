
let grass;
let bochka;
var mapManager={
    mapData: null,
    tLayer: null,
    xCount: 0,
    yCount: 0,
    tSize: {x: 32, y: 32},
    mapSize: {x: 32, y: 32},
    tilesets: [],
    imgLoadCount: 0,
    imgLoaded: false,
    jsonLoaded: false,
    loadMap:function (path) {
        if(mapManager.mapData==null) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    mapManager.mapData = JSON.parse(request.responseText);
                    //if(localStorage.getItem("map")===null)
                    localStorage.setItem('map',JSON.stringify(mapManager.mapData));

                }
            };
            request.open("GET", path, true);
            request.send();
        }

    },
    _loadMap:function (path) {
        if(mapManager.mapData==null) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === 4 && request.status === 200) {
                    mapManager.parseMap(request.responseText);
                    //if(localStorage.getItem("map")===null)
                    //localStorage.setItem('map',JSON.stringify(mapManager.mapData));

                }
            };
            request.open("GET", path, true);
            request.send();
        }

    },
    parseMap:function(tilesJSON) {
        this.mapData = JSON.parse(tilesJSON);
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.tSize.x = this.mapData.tilewidth;
        this.tSize.y = this.mapData.tileheight;
        this.mapSize.x = this.xCount * this.tSize.x;

        this.mapSize.y = this.yCount * this.tSize.y;

        for (var i = 0; i < this.mapData.tilesets.length; i++) {
            var img = new Image();

            img.onload = function () {
                mapManager.imgLoadCount++;
                if (mapManager.imgLoadCount ===
                    mapManager.mapData.tilesets.length) {
                    mapManager.imgLoaded = true;
                }
            };
            img.src = this.mapData.tilesets[i].image;

            var t = this.mapData.tilesets[i];
            var ts = {
                firstgid: t.firstgid,

                image: img,
                name: t.name,
                xCount: Math.floor(t.imagewidth / mapManager.tSize.x),

                yCount: Math.floor(t.imageheight / mapManager.tSize.y)

            };
            this.tilesets.push(ts);
        }
        this.jsonLoaded = true;
    },
    draw : function(ctx) {
        if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
            setTimeout(function () {
                mapManager.draw(ctx);
            }, 100);
        } else {
            if (this.tLayer === null)
                for (var id = 0; id < this.mapData.layers.length; id++) {

                    var layer = this.mapData.layers[id];
                    if (layer.type === "tilelayer") {
                        this.tLayer = layer;
                        break;
                    }
                }
            for (var i = 0; i < this.tLayer.data.length; i++) {

                if (this.tLayer.data[i] !== 0) {
                    //console.log(this.tLayer.data[i]);
                    var tile = this.getTile(this.tLayer.data[i]);

                    var pX = (i % this.xCount) * this.tSize.x;

                    var pY = Math.floor(i / this.xCount) * this.tSize.y;
                    mapLL[pY/32][pX/32]=this.tLayer.data[i];
                    ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x,
                        this.tSize.y, pX, pY, this.tSize.x, this.tSize.y);
                }
            }
        }
    },
    getTile : function (tileIndex) {
        var tile = {
            img: null,
            px: 0, py: 0
        };
        //console.log(this.getTileset(tileIndex)+"-"+tileIndex);
        var tileset = this.getTileset(tileIndex);
        tile.img = tileset.image;
        var id = tileIndex - tileset.firstgid;

        var x = id % tileset.xCount;

        var y = Math.floor(id / tileset.xCount);

        tile.px = x * mapManager.tSize.x;
        tile.py = y * mapManager.tSize.y;
        return tile;
    },
    getTileset:function(tileIndex) {
        for (var i = mapManager.tilesets.length - 1; i >= 0; i--)

            if (mapManager.tilesets[i].firstgid <= tileIndex) {

                return mapManager.tilesets[i];
            }
        return null;
    },
    drawMapWithGrass:function () {
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 25; j++) {
                ctx.putImageData(grass, j * 32, i * 32);
            }
        }
    }
};

