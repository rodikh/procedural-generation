/**
 * Created by rodik on 18/08/2017.
 */
import {BiomeTypes, BiomeCodes, Biome} from "./biomes.js";
import {matrix} from "./utils.js";
import {drawMap} from "./graphics.js";

/**
 * @class Map
 */
export class Map {
    constructor(size) {
        this.width = size.x;
        this.height = size.y;
        this.map = matrix(this.width, this.height, {code: 0, biome: null});
        this.biomes = [];
    }

    getTile(x, y) {
        if (typeof x === "object") {
            return this.map[x.y][x.x];
        }
        return this.map[y][x];
    }

    console() {
        let colors = [];

        let coloredMap = this.map.map(arr => {
            let innerColors = [];
            colors.push(innerColors);
            return arr.map(item => {
                innerColors.push('color: ' + BiomeCodes[item].color);
                return '%c' + item;
            });
        });
        coloredMap.forEach((item, index) => {
            let prefix = index;
            console.log(prefix + ':\t' + item.join('\t'), ...colors[index]);
        });
    }

    draw() {
        drawMap(this.map, this.biomes);
    }

    setTileBiome(pos, biome) {
        this.map[pos.y][pos.x] = {
            ...this.map[pos.y][pos.x],
            biome: biome,
            code: biome.code
        };
        biome.addTiles(this.map[pos.y][pos.x]);
    }

    /**
     * @param {Map~iterationCallback} fn - iterate over every cell of the map
     */
    iterate(fn) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                fn(this.getTile(x,y), {x, y});
            }
        }
    }


    /**
     * @param {{x,y}} pos
     * @param {boolean} [half]
     * @param {Map~iterationCallback} fn - iterate over every cell of the map
     */
    iterateTileNeighbors(pos, half = false, fn) {
        if (typeof half === 'function') {
            fn = half;
        }
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                if ((x === 0 && y === 0) || (half && x + y >= 0 && y >= 0)) {           // not self and only half if flagged
                    continue;
                }
                let ny = y + pos.y, nx = x + pos.x;

                if ((ny > 0 && ny < this.height) && (nx > 0 && nx < this.width)) { //bounds check
                    fn(this.getTile(nx,ny), {x: nx, y: ny});
                }
            }
        }
    }

    /**
     * @callback Map~iterationCallback
     * @param {Object} val
     * @param {{x:number,y:number}} pos
     */
}