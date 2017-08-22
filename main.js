/**
 * Created by rodik on 18/08/2017.
 */

import RNG from "./rng.js";
import {Map} from "./map.js";
import {Procedural} from "./procedural.js";

RNG.initWithSeed('rodik4');
export let map = new Map({x:20,y:15});
export let proc = new Procedural(map);
