import Render from '../helper/render.js';

class GameMap {
    constructor(rscMng, gameMap={}) {
        this.rscMng = rscMng;
        this.gameMap = gameMap;
        this.imgMap = [[]];
    }

    // Updates map data and creates image map
    update(mapData) {
        // Only updates if the map is different
        if (mapData != this.gameMap) {
            this.gameMap = mapData;
            this.imgMap = this.createImageMap(this.gameMap);
        }
    }

    // TODO: Dereference when I know what I need
    // Compiles separate entities into the map, to be rendered
    compile(gameData) {
        
    }

    // Creates a 2-d array of images based on the text map
    createImageMap(gameMap) {
        let imgMap = new Array(gameMap.length).fill().map(() => new Array(gameMap[0].length));
        for (let i = 0; i < gameMap.length; i++) {
            for (let j = 0; j < gameMap[i].length; j++) {
                imgMap[i][j] = gameMap[i][j].map((char) => this.rscMng.getTile(char));
            }
        }
        return imgMap;
    }

    // TODO: Compile separate pieces before drawing
    // Draws the game map to the screen
    draw(ctx, scale, players) {
        const width = this.imgMap.length;
        const height = this.imgMap[0].length;

        // Draw Map
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.imgMap[i][j].forEach(img => {
                    Render.drawTile(ctx, img, i, (height-j-1), scale);
                });
            }
        }

        // Draw Players
        Object.keys(players).forEach((id) => {
            const player = players[id];
            Render.drawTile(ctx, this.rscMng.getTile('@'), player.pos[0], (height-player.pos[1]-1), scale);
        });
    }

    // Returns the size of the game map
    getSize() {
        return [this.gameMap.length, this.gameMap[0].length];
    }
}

export default GameMap;