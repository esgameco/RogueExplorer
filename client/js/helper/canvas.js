const inCanvas = (rect, v) => {
    return v[0] > rect.left && v[0] < rect.right && v[1] > rect.top && v[1] < rect.bottom;
};

const canvasMousePos = (canvasRect, mousePos) => {
    return [mousePos[0]-canvasRect.left, mousePos[1]-canvasRect.top];
};

export default {
    inCanvas,
    canvasMousePos
};