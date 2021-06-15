/**
 * Created by rodik on 18/08/2017.
 */

import RNGCore from '../lib/rng-js.js';

class RNG {
    constructor() {
        this.hash = {};
        this.seed = null;
    }

    initWithSeed(seed) {
        this.seed = seed;
        this.hash = {};
        console.log('Randomizer seeded with:', seed);
        document.querySelector('#input-seed').value = seed;
    }

    nextIntForKey(key, min, max) {
        if (!this.hash.hasOwnProperty(key)) {
            this.hash[key] = this.createRandomizerWithKey(key);
        }

        return this.hash[key].random(min, max);
    }

    nextForKey(key) {
        if (!this.hash.hasOwnProperty(key)) {
            this.hash[key] = this.createRandomizerWithKey(key);
        }

        return this.hash[key].uniform();
    }

    weightedRandomItemFromObject(obj, randomizerKey) {
        let arr = Object.keys(obj).map(key => obj[key]);
        return this.weightedRandomItem(arr, randomizerKey);
    }

    weightedRandomItem(input, key, probabilityKey = "probability") {
        let tempArr = [];
        input.forEach(item => {
            for (let i = 0; i < item[probabilityKey]; i++) {
                tempArr.push(item);
            }
        });

        return tempArr[this.nextIntForKey(key, 0, tempArr.length)];
    }


    createRandomizerWithKey(key) {
        if (!this.seed) {
            throw 'Trying to use Randomizer before seeding';
        }
        let compositeSeed = this.seed + ":" + key;
        console.log('Created composite randomizer seed:', compositeSeed);
        return new RNGCore(compositeSeed);
    }
}

export default new RNG();