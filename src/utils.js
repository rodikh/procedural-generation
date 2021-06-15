/**
 * Created by rodik on 18/08/2017.
 */

export function Point(x,y) {
    return {x,y};
}

export function distance(pos1, pos2) {
    const a = pos1.x - pos2.x;
    const b = pos1.y - pos2.y;
    return Math.sqrt(a * a + b * b);
}

export function matrix(m, n, fill) {
    let result = [];
    for(let i = 0; i < n; i++) {
        result.push(new Array(m).fill(fill))
    }
    return result;
}