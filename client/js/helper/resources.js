class ResourceManager {
    constructor() {
        this.resources = {};
    }

    // Returns resource if it exists, otherwise downloads resource
    getResource(rsc) {
        if (this.resources[rsc])
            return this.resources[rsc];
        else {
            let img = new Image();
            img.src = `/images/${rsc}.png`;
            this.resources[rsc] = img;
            return img;
        }
    }
}

export default ResourceManager;