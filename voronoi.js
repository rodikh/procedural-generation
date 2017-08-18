/**
 * Created by rodik on 18/08/2017.
 */
import {point, randomInt} from "./utils.js";

export function generateRandomPoints(width, height, numOfPoints) {
    let points = [];
    for (let i = 0; i < numOfPoints; i++) {
        points.push(point(randomInt(0,width-1), randomInt(0,height-1)))
    }
    return points;
}

