const newEnemy = (enemies, symbol, pos, hp, atk, def, dropXp, dropItems, name, id) => {
    enemies[id] = {
        symbol,
        pos,
        hp,
        atk,
        def,
        dropXp,
        dropItems,
        name,
    };
};

module.exports = {
    newEnemy
}