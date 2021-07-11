class ResourceManager {
    constructor() {
        this.resources = {};
        this.tileMapping = {
            '#': 'dc-dngn/wall/brick_brown0',
            '.': 'dc-dngn/floor/dirt0',
            '@': 'player/base/dwarf_m',
            'd': 'dc-mon/elf',
        }
    }

    // Helper function for getting resources based on tiles
    getTile(tile) {
        return this.getResource(this.convertToResource(tile));
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

    convertToResource(tile) {
        return this.tileMapping[tile];
    }
}

export default ResourceManager;