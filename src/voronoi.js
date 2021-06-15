/**
 * Created by rodik on 18/08/2017.
 */
import {Point} from "./utils.js";
import RNG from "./rng.js";

export function generateRandomPoints(width, height, numOfPoints, randomizerKey = 'generateRandomPoints') {
    if (width*height < numOfPoints) {
        throw 'Cannot generate non-overlapping random points, width*height is too small for amount of requested points';
    }

    let points = [];
    while(points.length < numOfPoints) {
        let pt = Point(RNG.nextIntForKey(randomizerKey, 0, width), RNG.nextIntForKey(randomizerKey, 0, height));
        if (points.findIndex(el => el.x === pt.x && el.y === pt.y) !== -1) {
            console.log('exists', pt);
        } else {
            points.push(pt);
        }
    }
    return points;
}

