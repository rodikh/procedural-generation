/**
 * Created by rodik on 18/08/2017.
 */
import {BiomeTypes, BiomeCodes, Biome} from "./biomes.js";
import {matrix} from "./utils.js";
import {drawMap} from "./graphics.js";

export class Map {
    constructor (size) {
        this.width = size.x;
        this.height = size.y;
        this.map = matrix(this.width, this.height);
    }

    console () {
        let colors = [];
        console.log('biomeCodes', BiomeCodes);

        let coloredMap = this.map.map(arr=>{
            let innerColors = [];
            colors.push(innerColors);
            return arr.map(item=>{
                innerColors.push('color: '+BiomeCodes[item].color);
                return '%c'+item;
            });
        });
        coloredMap.forEach((item, index)=>{
            let prefix = index;
            console.log(prefix+':\t'+ item.join('\t'), ...colors[index]);
        });
    }

    draw (biomes) {
        drawMap(this.map, biomes);
    }

    setTile (pos, code) {
        this.map[pos.y][pos.x] = code;
    }

    iterate(fn) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.map[y][x] = fn(this.map[y][x], {x,y});
            }
        }
    }
}

