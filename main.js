/**
 * Created by rodik on 18/08/2017.
 */

import {BiomeTypes, Biome} from "./biomes.js";
import {point} from "./utils.js";
import {Map} from "./map.js";
import {Procedural} from "./procedural.js";

let map = new Map({x:20,y:15});
let proc = new Procedural(map);

// let proc = new Procedural(1,1);