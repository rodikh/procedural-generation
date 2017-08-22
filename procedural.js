/**
 * Created by rodik on 18/08/2017.
 */

import {BiomeTypes, Biome} from "./biomes.js";
import {distance} from "./utils.js";
import {generateRandomPoints} from "./voronoi.js";
import RNG from "./rng.js";

export class Procedural {
    constructor(map) {
        this.map = map;
        this.generateBiomeCores();
        this.expandBiomeCores();
        this.mergeBiomes();
        console.log('biomes', this.biomes, this.map);
    }

    generateBiomeCores() {
        this.biomes = [];
        const mapSize = this.map.width * this.map.height;
        const avgBiomeSize = 30;
        const biomeCount = mapSize / avgBiomeSize;

        generateRandomPoints(this.map.width, this.map.height, biomeCount, 'world-generation').forEach((biomePos, index) => {
            let biome = {
                id: index,
                pos: biomePos,
                ...RNG.weightedRandomItemFromObject(BiomeTypes, 'world-generation')
            };
            this.biomes.push(biome);

            this.map.setTileBiome(biomePos, biome);
        });

        this.map.draw(this.biomes);
    }

    expandBiomeCores() {
        this.map.iterate((val, pos) => {
            if (val.biome) {
                return val;
            }
            let sorted = [...this.biomes].sort((a,b)=>distance(pos, a.pos) - distance(pos, b.pos));
            this.map.setTileBiome(pos,sorted[0]);
        });
        this.map.draw();
    }

    mergeBiomes() {

    }

    // mergeBiomesRecursive() {
    //     if ()
    // }
}