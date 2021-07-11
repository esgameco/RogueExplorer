// Generates a map with walls surrounding the edges
const generateMap = (width, height) => {
    let gameMap = new Array(width);
    
    for (let i = 0; i < width; i++) {
        gameMap[i] = new Array(height);
        for (let j = 0; j < height; j++) {
            gameMap[i][j] = new Array();
            if ((i == 0 || i == width-1) || (j == 0 || j == height-1))
                gameMap[i][j].push('#');
            else
                gameMap[i][j].push('.');
        }
    }

    return gameMap;
};

module.exports = {
    generateMap
}