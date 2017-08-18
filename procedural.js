/**
 * Created by rodik on 18/08/2017.
 */

import {BiomeTypes, Biome} from "./biomes.js";
import {weightedRandomItemFromObject, distance} from "./utils.js";
import {generateRandomPoints} from "./voronoi.js";

export class Procedural {
    constructor(map) {
        this.map = map;
        this.generateBiomeCores();
    }

    generateBiomeCores() {
        this.biomes = [];
        const mapSize = this.map.width * this.map.height;
        const avgBiomeSize = 30;
        const biomeCount = mapSize / avgBiomeSize;

        generateRandomPoints(this.map.width, this.map.height, biomeCount).forEach(biomePos => {
            let biome = {
                pos: biomePos,
                ...weightedRandomItemFromObject(BiomeTypes)
            };
            this.biomes.push(biome);

            this.map.setTile(biomePos, biome.code);
        });

        this.map.draw(this.biomes);
        console.log('biomes', this.biomes);

        this.expandBiomeCores();
        this.map.draw(this.biomes);
        this.map.console();

    }

    expandBiomeCores() {
        this.map.iterate((val, pos) => {
            if (val !== 0) {
                return val;
            }
            let sorted = [...this.biomes].sort((a,b)=>distance(pos, a.pos) - distance(pos, b.pos));
            let closest = sorted[0];
            return closest.code;
        });
    }
}