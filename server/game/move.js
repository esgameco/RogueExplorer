// Checks if wall exists at position on map
const checkWall = (gameMap, pos) => {
    console.log(gameMap[pos[0]][pos[1]])
    return tileExists(gameMap[pos[0]][pos[1]], '#');
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
const movePlayer = (gameMap, direction, pos) => {
    const prevPos = pos;
    let checkPos = [];

    if (direction == 'l')
        checkPos = [prevPos[0]-1, prevPos[1]];
    else if (direction == 'r') 
        checkPos = [prevPos[0]+1, prevPos[1]];
    else if (direction == 'd')
        checkPos = [prevPos[0], prevPos[1]-1];
    else if (direction == 'u')
        checkPos = [prevPos[0], prevPos[1]+1];

    if (!checkWall(gameMap, checkPos)) {
        console.log(checkWall(gameMap, checkPos))
        pos = checkPos;
    }

    return pos;
};

// // Gets tile at position
// const getTile = (gameMap, pos) => {
//     return gameMap[pos[0]][pos[1]];
// }

module.exports = {
    checkWall,
    movePlayer
}