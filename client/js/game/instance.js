import GameMap from './map.js';
import UI from './ui.js';
import ResourceManager from '../helper/resources.js';

import Player from './player.js';
import Enemy from './enemy.js';

class GameInstance {
    // TODO: Check if the =new thing works
    constructor(canvas, ctx, socket, rscMng=new ResourceManager(), ui=new UI()) {
        // Constants
        this.MIN_SCALE = 0.7;
        this.MAX_SCALE = 2;

        // Socket ID
        this.socket = socket;

        // Canvas objects
        this.canvas = canvas;
        this.ctx = ctx;

        // Helper classes
        this.rscMng = rscMng;
        this.ui = ui;
        // TODO: Add chat

        // Camera state
        this.tileScale = 1; // Zoom amount
        this.mapPos = [0, 0];

        // Game state
        this.gameMap = new GameMap(rscMng);
        this.players = {};
        this.enemies = {};
        this.items = {};
    }

    changeScale(amt) {
        let newScale = this.tileScale + amt;

        console.log(this.MAX_SCALE)
        if (newScale >= this.MAX_SCALE)
            newScale = this.MAX_SCALE;
        else if (newScale <= this.MIN_SCALE)
            newScale = this.MIN_SCALE;
        this.tileScale = newScale;
    }

    // Update instance using data object
    update({map, players, enemies, items}) {
        // console.log(map, players, enemies, items)
        if (map)
            this.gameMap.update(map);
        if (players)
            this.players = Object.fromEntries(Object.entries(players).map(([k, v]) => [k, new Player(v)]));
        if (enemies)
            this.enemies = Object.fromEntries(Object.entries(enemies).map(([k, v]) => [k, new Enemy(v)]));
        if (items)
            this.items = 0;
    }

    draw() {
        // Clear screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw to screen
        this.gameMap.draw(this.ctx, this.mapPos, this.tileScale, this.players, this.enemies);
        this.ui.display(this);
    }
}

export default GameInstance;