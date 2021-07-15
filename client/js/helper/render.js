// Draws image onto context-- either instantly if loaded, or on load
const drawImage = (ctx, img, x, y, scale=1) => {
    if (img.complete) {
        ctx.drawImage(img, x, y, img.width*scale, img.height*scale);
    }
    else
        img.addEventListener('load', () => { 
            ctx.drawImage(img, x, y, img.width*scale, img.height*scale);
        });
};

// TODO: Allow for origin vector
// Draws tile to context based on the tile position
const drawTile = (ctx, img, tileX, tileY, scale=1) => {
    drawImage(ctx, img, tileX*img.width*scale, tileY*img.height*scale, scale);
};

export default {
    drawImage,
    drawTile
};