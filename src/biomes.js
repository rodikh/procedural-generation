/**
 * Created by rodik on 18/08/2017.
 */
export const BiomeTypes = {
    "empty": {
        type: "empty",
        code: 0,
        color: "black",
        probability: 0
    },
    "Desert": {
        type: "Desert",
        code: 2,
        color: "orange",
        probability: 5
    },
    "Sea": {
        type: "Sea",
        code: 3,
        color: "blue",
        probability: 20
    },
    "Plains": {
        type: "Plains",
        code: 1,
        color: "green",
        probability: 40
    },
    "Mountains": {
        type:'Mountains',
        code: 4,
        color: "gray",
        probability: 5
    }
};

export let BiomeCodes = {};
Object.keys(BiomeTypes).forEach(key => {
    BiomeCodes[BiomeTypes[key].code] = BiomeTypes[key]
});


export class Biome {
    constructor(id, pos, biomeType) {
        this.id = id;
        this.pos = pos;
        Object.keys(biomeType).forEach(key => {
            this[key] = biomeType[key];
        });

        this.tiles = [];
        this.neighbors = {};
        this.features = [];

        // this.sortedTiles ={
        //     x: [],
        //     y: []
        // }
    }

    addTiles(tiles) {
        if (Array.isArray(tiles)) {
            this.tiles = this.tiles.concat(tiles);
            tiles.forEach(tile => {
                tile.biome = this;
                tile.code = this.code;
            });
        } else {
            this.tiles.push(tiles);
            tiles.biome = this;
            tiles.code = this.code;
        }
    }
}