const drawImage = (ctx, img, x, y) => {
    if (img.complete) {
        ctx.drawImage(img, x, y);
    }
    else
        img.addEventListener('load', () => { 
            ctx.drawImage(img, x, y);
        });
};

export default {
    drawImage
};