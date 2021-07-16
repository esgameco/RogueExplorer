const vector = require('./utils/vector');

// Checks if wall exists at position on map
const checkWall = (gameMap, pos) => {
    return tileExists(gameMap[pos[0]][pos[1]], '#');
};

const checkOnlyGround = (gameMap, pos) => {
    return gameMap[pos[0]][pos[1]].length == 1 && gameMap[pos[0]][pos[1]][0] == '.';
};

// Checks if a specific tile exists within the whole tile
const tileExists = (tile, wanted) => {
    for (let i = 0; i < tile.length; i++) {
        if (tile[i] == wanted) {
            return true;
        }
    }
    return false;
};

// TODO: Change parameter names to something better
// const movePlayer = (gameMap, direction, pos) => {
//     const prevPos = pos;
//     let checkPos = [];

//     if (direction == 'l')
//         checkPos = [prevPos[0]-1, prevPos[1]];
//     else if (direction == 'r') 
//         checkPos = [prevPos[0]+1, prevPos[1]];
//     else if (direction == 'd')
//         checkPos = [prevPos[0], prevPos[1]-1];
//     else if (direction == 'u')
//         checkPos = [prevPos[0], prevPos[1]+1];

//     if (!checkWall(gameMap, checkPos)) {
//         pos = checkPos;
//     }

//     return pos;
// };

// Returns the new position of a player
const movePlayer = (gameMap, newPos, pos, mov=5) => {
    if (inMap(gameMap, newPos) && 
        !checkWall(gameMap, newPos) && 
        Math.abs(vector.getDistance(pos, newPos)) < mov)
        return newPos;
    return pos;
};

// Gets whether position is within the game map
const inMap = (gameMap, pos) => {
    return vector.inRect([[0, 0], [gameMap.length, gameMap[0].length]], pos);
};

// // Gets tile at position
// const getTile = (gameMap, pos) => {
//     return gameMap[pos[0]][pos[1]];
// }

module.exports = {
    checkWall,
    checkOnlyGround,
    movePlayer
}