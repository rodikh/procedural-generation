/**
 * Created by rodik on 18/08/2017.
 */

export const BiomeTypes = {
    "empty": {
        name: "empty",
        code: 0,
        color: "black",
        probability: 0
    },
    "Desert": {
        name: "Desert",
        code: 2,
        color: "orange",
        probability: 5
    },
    "Sea": {
        name: "Sea",
        code: 3,
        color: "blue",
        probability: 10
    },
    "Plains": {
        name: "Plains",
        code: 1,
        color: "green",
        probability: 20
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
    }

    addTiles(tiles) {
        if (Array.isArray(tiles)) {
            this.tiles = this.tiles.concat(tiles);
            tiles.forEach(tile=>{
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