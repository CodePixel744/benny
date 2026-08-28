'use strict';

/**
 * Data source for all Ben 10 aliens.
 *
 * Each alien has:
 *  - id:       unique numeric identifier
 *  - name:     the alien's display name
 *  - species:  what kind of creature it is
 *  - debut:    the season the alien first appeared (1-based)
 *  - powers:   an array of the alien's abilities
 *  - isClassic: whether the alien is from the original Omnitrix set
 */

const ALIENS = [
  {
    id: 1,
    name: 'Heatblast',
    species: 'Pyronite',
    debut: 1,
    powers: ['fire manipulation', 'flight'],
    isClassic: true,
  },
  {
    id: 2,
    name: 'Wildmutt',
    species: 'Vulpimancer',
    debut: 1,
    powers: ['enhanced senses', 'natural armor'],
    isClassic: true,
  },
  {
    id: 3,
    name: 'Diamondhead',
    species: 'Petrosapien',
    debut: 1,
    powers: ['crystal projection', 'super strength'],
    isClassic: true,
  },
  {
    id: 4,
    name: 'XLR8',
    species: 'Kineceleran',
    debut: 1,
    powers: ['super speed'],
    isClassic: true,
  },
  {
    id: 5,
    name: 'Upgrade',
    species: 'Galvanic Mechamorph',
    debut: 1,
    powers: ['technology merging', 'shape shifting'],
    isClassic: true,
  },
  {
    id: 6,
    name: 'Four Arms',
    species: 'Tetramand',
    debut: 1,
    powers: ['super strength', 'four arms'],
    isClassic: true,
  },
  {
    id: 7,
    name: 'Ripjaws',
    species: 'Piscciss Volann',
    debut: 1,
    powers: ['aquatic breathing', 'strong jaws'],
    isClassic: true,
  },
  {
    id: 8,
    name: 'Grey Matter',
    species: 'Galvan',
    debut: 1,
    powers: ['genius intellect', 'small size'],
    isClassic: true,
  },
  {
    id: 9,
    name: 'Stinkfly',
    species: 'Lepidopterran',
    debut: 1,
    powers: ['flight', 'mucus projectiles'],
    isClassic: true,
  },
  {
    id: 10,
    name: 'Ghostfreak',
    species: 'Ectonurite',
    debut: 1,
    powers: ['intangibility', 'possession', 'flight'],
    isClassic: true,
  },
  {
    id: 11,
    name: 'Cannonbolt',
    species: 'Arburian Pelarota',
    debut: 2,
    powers: ['rolling', 'crushing', 'ball form'],
    isClassic: false,
  },
  {
    id: 12,
    name: 'Way Big',
    species: 'To\'kustar',
    debut: 2,
    powers: ['cosmic ray projection', 'giant size'],
    isClassic: false,
  },
  {
    id: 13,
    name: 'Ditto',
    species: 'Splixson',
    debut: 2,
    powers: ['self duplication'],
    isClassic: false,
  },
  {
    id: 14,
    name: 'Echo Echo',
    species: 'Sonorosian',
    debut: 3,
    powers: ['sonic screams', 'self duplication'],
    isClassic: false,
  },
  {
    id: 15,
    name: 'Big Chill',
    species: 'Necrofriggian',
    debut: 3,
    powers: ['ice breath', 'intangibility', 'flight'],
    isClassic: false,
  },
  {
    id: 16,
    name: 'Swampfire',
    species: 'Methanosian',
    debut: 3,
    powers: ['fire manipulation', 'regeneration', 'vine control'],
    isClassic: false,
  },
];

module.exports = ALIENS;
