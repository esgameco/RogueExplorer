const newPlayer = (players, pos, hp, atk, def, name, id) => {
    players[id] = {
        pos,
        hp,
        atk,
        def,
        name,
    };
};

const removePlayer = (players, id) => {
    delete players[id];
}

module.exports = {
    newPlayer,
    removePlayer
}