const faker = require('@faker-js/faker');
const Zone = require('../models/zone');

const generateZones = async (dist) => {
  const zones = [];
  const district = dist;
  for (let i = 1; i <= 5; i++) {
    const zone = new Zone({
      name: i,
      district,
    });
    zones.push(zone);
  }
  await Zone.insertMany(zones);
  console.log('Zones generated!');
}

module.exports =  generateZones;
