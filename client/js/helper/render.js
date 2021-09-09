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

// Draws a UI box with text
const drawBox = (ctx, textData, {x, y, w, h}, {boxColor, textColor}, font='20px Georgia') => {
    ctx.fillStyle = boxColor;
    ctx.fillRect(x, y, w, h);

    ctx.font = font;
    ctx.fillStyle = textColor;
    // TODO: Draw all text in textData 
    Object.keys(textData).forEach((key, i) => {
        ctx.fillText(`${key}: ${textData[key]}`, x+20, y+30+(i*20));
    });
};

export default {
    drawImage,
    drawTile,
    drawBox
};