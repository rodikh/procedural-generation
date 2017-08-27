/**
 * Created by rodik on 18/08/2017.
 */

import RNG from "./rng.js";
import {Map} from "./map.js";
import {Procedural} from "./procedural.js";

RNG.initWithSeed(new Date().getTime());
// RNG.initWithSeed(1503864909229);
export let map = new Map({x:30,y:30});
export let proc = new Procedural(map);
