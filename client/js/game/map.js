import Render from '../helper/render.js';

class GameMap {
    constructor(rsc_mng, gameMap={}) {
        this.rsc_mng = rsc_mng;
        this.gameMap = gameMap;
        this.imgMap = [[0]];
        // this.imgMap = this.createImageMap(this.gameMap);
    }

    update(mapData) {
        this.gameMap = mapData;
        this.imgMap = this.createImageMap(this.gameMap);
    }

    // TODO: Dereference when I know what I need
    // Compiles separate entities into the map, to be rendered
    compile(gameData) {
        
    }

    // // TODO: Rename to something better or make something else do this
    // // Recreates image map
    // scale() {
    //     this.imgMap = this.createImageMap(this.gameMap);
    // }

    // Creates a 2-d array of images based on the text map
    createImageMap(gameMap) {
        let imgMap = new Array(gameMap.length).fill().map(() => new Array(gameMap[0].length));
        for (let i = 0; i < gameMap.length; i++) {
            for (let j = 0; j < gameMap[i].length; j++) {
                imgMap[i][j] = gameMap[i][j].map((char) => this.rsc_mng.getTile(char));
            }
        }
        return imgMap;
    }

    // TODO: Compile separate pieces before drawing
    // Draws the map
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
            Render.drawTile(ctx, this.rsc_mng.getTile('@'), player.pos[0], (height-player.pos[1]-1), scale);
        });
    }

    getSize() {
        return [this.gameMap.length, this.gameMap[0].length];
    }
}

export default GameMap;