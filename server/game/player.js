const newPlayer = (hp, atk, def, name, id) => {
    return {
        hp,
        atk,
        def,
        name,
        id
    }
}

module.exports = {
    newPlayer
}