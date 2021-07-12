const newPlayer = (pos, hp, atk, def, name, id) => {
    return {
        pos,
        hp,
        atk,
        def,
        playerName: name,
        playerId: id
    };
};

const getPlayer = (players, id) => {
    for (let i = 0; i < players.length; i++) {
        if (players[i].playerId == id)
            return i;
    }
    return -1;
};

module.exports = {
    newPlayer,
    getPlayer
}