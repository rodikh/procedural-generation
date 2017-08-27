/**
 * Created by rodik on 18/08/2017.
 */

import RNG from "./rng.js";
import nouns from "./data/nouns.js";
import adjectives from "./data/adjectives.js";

const BiomeNaming = {
    "Desert": {
        'island': ['Isle', 'Island'],
        'small': ['Sandbox'],
        'medium': ['Sands'],
        'large': ['Desert', 'Wastelands']
    },
    "Sea": {
        'oasis': ['Mirage', 'Oasis'],
        'small': ['Pond', 'Puddle', '$noun\'s Pool'],
        'medium': ['Lake $noun', '$noun Bay'],
        'large': ['Ocean', 'Sea']
    },
    "Plains": {
        // todo: prefer features (island) over size feature
        'island': ['Isle', 'Island'],
        'small': ['Garden'],
        'medium': ['Plains'],
        'large': ['Grasslands']
    },
    "Mountains": {
        'small': ['Hills', 'Crags'],
        'medium': ['Mountain', 'Mt. $noun' , 'Har'],
        'large': ['Heights']
    }
};

export default class BiomeCustomizer {
    static discoverFeatures(biome, map) {
        for (let feature in BiomeFeatures) {
            if (BiomeFeatures.hasOwnProperty(feature)) {
                BiomeFeatures[feature](biome, map);
            }
        }
    }

    static generateBiomeName(biome) {
        let featureTemplate;
        let feature = biome.features[RNG.nextIntForKey('biome-customizer', 0, biome.features.length)];
        if (feature) {
            let nameArr = BiomeNaming[biome.type][feature];
            if (nameArr) {
                featureTemplate = nameArr[RNG.nextIntForKey('biome-customizer', 0, nameArr.length)]
            }
        }

        if (featureTemplate) {

            let str = adjectives[RNG.nextIntForKey('biome-customizer',0,adjectives.length)] + ' ' + featureTemplate;
            // let str = adjectives[RNG.nextIntForKey('biome-customizer',0,adjectives.length)] + ' ' + featureTemplate + ' of the ' +
            //     nouns[RNG.nextIntForKey('biome-customizer',0,nouns.length-1)];

            str = str.replace(/\$noun/g, function(txt){return nouns[RNG.nextIntForKey('biome-customizer',0,nouns.length)]});
            str = str.replace(/\$adj/g, function(txt){return adjectives[RNG.nextIntForKey('biome-customizer',0,adjectives.length)]});

            str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            return str;
        }

        return false;
    }
}

const BiomeFeatures = {
    biomeSize: (biome, map) => {
        let tileCount = biome.tiles.length;
        let biomeSizeRatio = tileCount / map.proceduralSettings.avgBiomeSize;
        if (biomeSizeRatio < 1) {
            biome.features.push('small');
        } else if (biomeSizeRatio > 1 && biomeSizeRatio < 1.7) {
            biome.features.push('medium');
        } else {
            biome.features.push('large');
        }
    },
    island: (biome, map) => {
        if (biome.type !== 'Sea' && Object.keys(biome.neighbors).length === 1 && biome.neighbors[Object.keys(biome.neighbors)[0]].type === 'Sea') {
            if (biome.features.indexOf('small') !==-1 || biome.features.indexOf('medium') !==-1 ) {
                biome.features.push('island');
            }
        }
    },
    oasis:(biome, map) => {
        if (biome.type === 'Sea' && Object.keys(biome.neighbors).length === 1 && biome.neighbors[Object.keys(biome.neighbors)[0]].type === 'Desert') {
            if (biome.features.indexOf('small') !==-1){
                biome.features.push('oasis');
            }
        }
    }
};