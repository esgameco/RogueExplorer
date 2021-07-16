const move = require('./move');
const enemy = require('./enemy');

// Generates a map with walls surrounding the edges
const generateMap = (width, height) => {
    let gameMap = new Array(width);

    for (let i = 0; i < width; i++) {
        gameMap[i] = new Array(height);
        for (let j = 0; j < height; j++) {
            gameMap[i][j] = new Array();
            if ((i == 0 || i == width-1) || (j == 0 || j == height-1))
                gameMap[i][j].push('#');
            else {
                gameMap[i][j].push('.');
                // if (Math.random() < 0.01)
                //     gameMap[i][j].push('d');
            }
        }
    }

    return gameMap;
};

const generateEnemies = (map, num) => {
    const width = map.length;
    const height = map[0].length;
    let newPos = [];

    let enemies = {};

    for (let i = 0; i < num; i++) {
        newPos = [Math.floor(Math.random()*width), Math.floor(Math.random()*height)];
        if (move.checkOnlyGround(map, newPos))
            enemy.newEnemy(enemies, 'd', newPos, 10, 5, 3, 8, {}, 'Dog', i);
    }

    return enemies;
};

module.exports = {
    generateMap,
    generateEnemies
}