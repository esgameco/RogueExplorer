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

module.exports = {
    newPlayer,
    removePlayer
}