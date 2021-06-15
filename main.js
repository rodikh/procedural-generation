/**
 * Created by rodik on 18/08/2017.
 */

import RNG from "./src/rng.js";
import {Map} from "./src/map.js";
import {Procedural} from "./src/procedural.js";

export let map;
export let proc;

function startSim(seed) {
    RNG.initWithSeed(seed);
    map = new Map({x: 30, y: 30});
    proc = new Procedural(map);
}

document.querySelector('#seed-form').onsubmit = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    let seed = document.querySelector('#input-seed').value;
    let shouldTimeout = document.querySelector('#shouldTimeout').checked;
    let timeout = 0;
    if (shouldTimeout) {
        timeout = document.querySelector('#timeout').value;
        console.log('checked', timeout);
    }
    startSim(seed, timeout);
};

startSim(new Date().getTime());
