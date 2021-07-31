const newPlayer = (players, pos, hp, atk, def, xp, items, name, id) => {
    players[id] = {
        pos,
        hp,
        atk,
        def,
        xp,
        items,
        name,
    };
};

const removePlayer = (players, id) => {
    delete players[id];
}

const playerExists = (players, id) => {
    return players[id] != null;
}

module.exports = {
    newPlayer,
    removePlayer,
    playerExists,
}