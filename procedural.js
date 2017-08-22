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
        this.map.draw();
    }

    generateBiomeCores() {
        this.biomes = [];
        const mapSize = this.map.width * this.map.height;
        const avgBiomeSize = 30;
        const biomeCount = mapSize / avgBiomeSize;

        generateRandomPoints(this.map.width, this.map.height, biomeCount, 'world-generation').forEach((biomePos, index) => {
            let biome = new Biome(
                index,
                biomePos,
                RNG.weightedRandomItemFromObject(BiomeTypes, 'world-generation')
            );
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
            let sorted = [...this.biomes].sort((a, b) => distance(pos, a.pos) - distance(pos, b.pos));
            this.map.setTileBiome(pos, sorted[0]);
        });
        this.map.draw();
    }

    mergeBiomes() {
        this.map.iterate((val, {x, y}) => {
            let nextY = (y + 1 < this.map.height) ? this.map.getTile(x, y + 1) : null;
            let nextX = (x + 1 < this.map.width) ? this.map.getTile(x + 1, y) : null;
            if (nextX && nextX.biome.code === val.biome.code && nextX.biome.id !== val.biome.id) {
                let tiles = nextX.biome.tiles;
                let delIndex = this.biomes.findIndex(biome => biome.id === nextX.biome.id);
                this.biomes.splice(delIndex, 1);
                val.biome.addTiles(tiles);
            }
            if (nextY && nextY.biome.code === val.biome.code && nextY.biome.id !== val.biome.id) {
                let tiles = nextY.biome.tiles;
                let delIndex = this.biomes.findIndex(biome => biome.id === nextY.biome.id);
                this.biomes.splice(delIndex, 1);
                val.biome.addTiles(tiles);
            }
        });
    }
}