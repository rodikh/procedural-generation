/**
 * Created by rodik on 18/08/2017.
 */

import {BiomeTypes, Biome} from "./biomes.js";
import BiomeCustomizer from './biome-customizer.js';

import {distance} from "./utils.js";
import {generateRandomPoints} from "./voronoi.js";
import RNG from "./rng.js";

export const ProceduralSettings = {
    avgBiomeSize: 30
};

export class Procedural {
    constructor(map) {
        this.map = map;
        map.proceduralSettings = ProceduralSettings;
        this.generateBiomeCores();
        this.expandBiomeCores();
        this.mergeBiomes();
        this.personalizeBiomes();
        console.log('biomes', this.biomes, this.map);
        this.map.draw();
    }

    generateBiomeCores() {
        this.biomes = [];
        const mapSize = this.map.width * this.map.height;
        const biomeCount = mapSize / ProceduralSettings.avgBiomeSize;

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
            // let distances = sorted.map(item=> distance(pos,item.pos));  // uncomment for debug
            this.map.setTileBiome(pos, sorted[0]);
        });
        this.map.draw();
    }

    mergeBiomes() {
        this.map.iterate((val, {x, y}) => {
            this.map.iterateTileNeighbors({x,y},true,(nextTile, {x:nx, y:ny}) => {
                if (nx!==x && ny!==y) {     // no diagonal checking
                    return;
                }

                if (nextTile.biome.code === val.biome.code && nextTile.biome.id !== val.biome.id) {   // different biomes with same type
                    let tiles = nextTile.biome.tiles;
                    let delIndex = this.biomes.findIndex(biome => biome.id === nextTile.biome.id);
                    this.biomes.splice(delIndex, 1);
                    val.biome.addTiles(tiles);
                }
            });
        });

        // // find neighbors
        this.map.iterate((val, pos) => {
            this.map.iterateTileNeighbors(pos,false,(nextTile) => {
                if (nextTile.biome !== val.biome) {
                    val.biome.neighbors[nextTile.biome.id] = nextTile.biome;
                    nextTile.biome.neighbors[val.biome.id] = val.biome;
                }
            });
        });
    }

    personalizeBiomes() {
        this.biomes.forEach(biome=>{
            BiomeCustomizer.discoverFeatures(biome,this.map);
            biome.name = BiomeCustomizer.generateBiomeName(biome);
        });
    }
}