import GameMap from './map.js';
import UI from './ui.js';
import ResourceManager from '../helper/resources.js';

import Player from './player.js';

class GameInstance {
    // TODO: Check if the =new thing works
    constructor(canvas, ctx, rscMng=new ResourceManager(), ui=new UI()) {
        // Canvas objects
        this.canvas = canvas;
        this.ctx = ctx;

        // Helper classes
        this.rscMng = rscMng;
        this.ui = ui;
        // TODO: Add chat

        // Camera state
        this.tileScale = 1; // Zoom amount

        // Game state
        this.gameMap = new GameMap(rscMng);
        this.players = {};
        this.enemies = {};
        this.items = {};
    }

    // Update instance using data object
    update({map, players, enemies, items}) {
        // console.log(map, players, enemies, items)
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

        // Draw to screen
        this.gameMap.draw(this.ctx, this.tileScale, this.players);
        this.ui.display(this);
    }
}

export default GameInstance;