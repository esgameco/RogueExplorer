class GameMap {
    constructor({map, pos}, rsc_mng) {
        this.gameMap = map;
        this.playerPos = pos;
        this.rsc_mng = rsc_mng;
        this.imgMap = this.createImageMap(this.gameMap);
    }

    // Creates a 2-d array of images based on the text map
    createImageMap(gameMap) {
        let currMap = new Array(gameMap.length).fill().map(() => new Array(gameMap[0].length));
        for (let i = 0; i < gameMap.length; i++) {
            for (let j = 0; j < gameMap[i].length; j++) {
                currMap[i][j] = gameMap[i][j].map((char) => this.rsc_mng.getTile(char));
            }
        }
        return currMap;
    }

    draw(ctx) {
        // Draw Map
        for (let i = 0; i < this.imgMap.length; i++) {
            for (let j = 0; j < this.imgMap[i].length; j++) {
                this.imgMap[i][j].forEach(img => {
                    this.drawImage(ctx, img, i*32, j*32);
                });
            }
        }

        // Draw Player
        this.drawImage(ctx, this.rsc_mng.getTile('@'), this.playerPos[0]*32, this.playerPos[1]*32)
    }

    drawImage(ctx, img, x, y) {
        if (img.complete)
            ctx.drawImage(img, x, y);
        else
            img.addEventListener('load', () => { 
                ctx.drawImage(img, x, y);
            });
    }
}

export default GameMap;