import Render from '../helper/render.js';

class UI {
    // TODO: Create UI functionality
    // Draws UI to context
    display(instance) {
        const { ctx, socket } = instance;
        const player = instance.players[socket.id];
        Render.drawBox(ctx, {
            NAME: player.name,
            POS: player.pos,
            HP: player.hp,
            ATK: player.atk,
            DEF: player.def,
            XP: player.xp
        }, {x:20, y:20, w:200, h:150}, {boxColor: 'white', textColor: 'black'});
    }
}

export default UI;