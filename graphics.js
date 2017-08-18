/**
 * Created by rodik on 18/08/2017.
 */
import {BiomeTypes, BiomeCodes, Biome} from "./biomes.js";

export function drawMap(tableData, biomes) {
    var table = document.querySelector('#map');
    table.innerHTML = '';

    var tableBody = document.createElement('tbody');

    var row = document.createElement('tr');
    var cell = document.createElement('th');
    cell.appendChild(document.createTextNode('X'));
    row.appendChild(cell);

    tableData[0].forEach(function(cellData, index) {
        var cell = document.createElement('th');
        cell.appendChild(document.createTextNode(index));
        row.appendChild(cell);

    });
    tableBody.appendChild(row);

    tableData.forEach(function(rowData, indexY) {
        var row = document.createElement('tr');

        var cell = document.createElement('th');
        cell.appendChild(document.createTextNode(indexY+':'));
        row.appendChild(cell);

        rowData.forEach(function(cellData, indexX) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            if (biomes.find((item)=>item.pos.x===indexX && item.pos.y===indexY)) {
                cell.style = 'color:'+BiomeCodes[cellData].color+'; font-weight:bold;';
            } else {
                cell.style = 'color:'+BiomeCodes[cellData].color;
            }
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
}