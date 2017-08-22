/**
 * Created by rodik on 18/08/2017.
 */

export function Point(x,y) {
    return {x,y};
}

export function distance(pos1, pos2) {
    return Math.abs(pos2.x-pos1.x) + Math.abs(pos2.y-pos1.y);
}

export function matrix(m, n, fill) {
    let result = [];
    for(let i = 0; i < n; i++) {
        result.push(new Array(m).fill(fill))
    }
    return result;
}