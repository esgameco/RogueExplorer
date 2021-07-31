import Render from '../helper/render.js';

class GameMap {
    constructor(rscMng, mapPos=[0,0], gameMap={}) {
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

    // Draws the game map to the screen
    draw(ctx, mapPos, scale, players, enemies) {
        const width = this.imgMap.length;
        const height = this.imgMap[0].length;

        // Draw Map
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.imgMap[i][j].forEach(img => {
                    this.drawTile(ctx, mapPos, scale, img, i, height-j-1);
                });
            }
        }

        // // Draw Players
        // Object.keys(players).forEach((id) => {
        //     const player = players[id];
        //     Render.drawTile(ctx, this.rscMng.getTile('@'), player.pos[0], (height-player.pos[1]-1), scale);
        // });

        // // TODO: Generalize
        // // Draw Enemies
        // Object.keys(enemies).forEach((id) => {
        //     const enemy = enemies[id];
        //     Render.drawTile(ctx, this.rscMng.getTile(enemy.symbol), enemy.pos[0], (height-enemy.pos[1]-1), scale);
        // });

        this.drawEntities(ctx, mapPos, scale, players, height);
        this.drawEntities(ctx, mapPos, scale, enemies, height);
    }

    drawEntities(ctx, mapPos, scale, entities, height) {
        Object.keys(entities).forEach((id) => {
            const entity = entities[id];
            Render.drawTile(ctx, this.rscMng.getTile(entity.symbol), entity.pos[0]+mapPos[0], (height-entity.pos[1]-1)+mapPos[1], scale);
        });
    }

    drawTile(ctx, mapPos, scale, img, x, y) {
        Render.drawTile(ctx, img, x+mapPos[0], y+mapPos[1], scale);
    }

    // Returns the size of the game map
    getSize() {
        return [this.gameMap.length, this.gameMap[0].length];
    }
}

export default GameMap;