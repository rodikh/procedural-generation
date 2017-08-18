/**
 * Created by rodik on 18/08/2017.
 */

export function point(x,y) {
    return {x,y};
}

export function distance(pos1, pos2) {
    return Math.abs(pos2.x-pos1.x) + Math.abs(pos2.y-pos1.y);
}

export function weightedRandomItemFromObject(obj) {
    let arr = Object.keys(obj).map(key=>obj[key]);
    return weightedRandomItem(arr);
}

// export function weightedRandomItem(arr) {
//     let total = arr.reduce((prev, cur)=> {
//         return prev + cur.probability
//     }, 0);
//     let rand = randomInt(0, total);
//     let sum = 0;
//     return arr.find(el=> {
//         sum += el.probability;
//         return sum >= rand;
//     })
// }

function weightedRandomItem(input) {
    let tempArr = [];
    input.forEach(item=>{
        for( let i=0; i<item.probability; i++ ) {
            tempArr.push(item);
        }
    });
    // Probability Fun
    return tempArr[Math.floor(Math.random() * tempArr.length)];
}


export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export function matrix(m, n) {
    let result = [];
    for(let i = 0; i < n; i++) {
        result.push(new Array(m).fill(0))
    }
    return result;
}