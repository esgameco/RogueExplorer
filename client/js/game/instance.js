import GameMap from './map.js';
import UI from './ui.js';

import Player from './player.js';

class GameInstance {
    constructor(canvas, ctx, rscMng) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.rscMng = rscMng;
        this.ui = new UI();
        this.tileScale = 1; // Scales the tiles
        this.gameMap = new GameMap(rscMng);
        this.players = {};
        this.enemies = {};
        this.items = {};
    }

    // Update instance
    update({map, players, enemies, items}) {
        console.log(map, players, enemies, items)
        if (map)
            this.gameMap.update(map);
        if (players)
            this.players = Object.fromEntries(Object.entries(players).map(([k, v]) => [k, new Player(v)]));;
        if (enemies)
            this.enemies = 0;
        if (items)
            this.items = 0;
    }

    draw() {
        // Clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.gameMap.draw(this.ctx, this.tileScale, this.players);
        this.ui.display(this);
    }
}

export default GameInstance;