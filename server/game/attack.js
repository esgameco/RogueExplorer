// Attacks enemy or player
const attack = ({enemies, players}, playerId, id) => {
    let player = players[playerId];
    let otherType = (enemies[id]) ? enemies : players;
    let other = otherType[id];

    other.hp -= player.atk - other.def;
    player.hp -= other.atk - player.def;

    console.log('Player HP:', player.hp);
    console.log('Other HP:', other.hp);

    if (player.hp <= 0)
        delete players[playerId];
    if (other.hp <= 0)
        delete otherType[id];
}

module.exports = {
    attack
};