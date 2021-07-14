// Gets the actual distance between two vectors
const getDistance = (v1, v2) => {
    return Math.sqrt((v2[0]-v1[0])*(v2[0]-v1[0])+(v2[1]-v1[1])*(v2[1]-v1[1]));
};

// Checks whether vector is within rectangle
const inRect = (r, v) => {
    // TODO: Make this work
    return v[0] > r[0][0] && v[0] < r[1][0] && v[1] > r[0][1] && v[1] < r[1][1];
};

module.exports = {
    getDistance,
    inRect
};