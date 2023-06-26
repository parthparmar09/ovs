const { faker } = require("@faker-js/faker");
const Candidate = require("../models/candidate");

const party = [
  "645cf566b1563c1900ebb08c",
  "645cf566b1563c1900ebb08d",
  "645cf566b1563c1900ebb08e",
];

const zone = [
  "645cbc001ecb2633f7e577f6",
  "645cbc001ecb2633f7e577f7",
  "645cbc001ecb2633f7e577f8",
  "645cbc001ecb2633f7e577f5",
  "645cbc001ecb2633f7e577f4",
];

async function createFakeCandidates() {
  try {
    const candidates = [];

    for (const zoneId of zone) {
      for (const partyId of party) {
        const candidate = new Candidate({
          name: faker.name.firstName() + " " + faker.name.lastName(),
          party: partyId,
          zone: zoneId,
          votes: 0,
          age: faker.datatype.number({ min: 25, max: 65 }),
          education: faker.helpers.arrayElement([
            "High School",
            "Bachelor",
            "Master",
            "Doctorate",
          ]),
          profession: faker.name.jobTitle(),
          prior_experience: faker.helpers.arrayElement([
            "Political",
            "Business",
            "Military",
            "Social Work",
          ]),
          campaign_promises: [
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence(),
          ],
        });

        candidates.push(candidate);
      }
    }

    await Candidate.insertMany(candidates);
    console.log(`Created ${candidates.length} fake candidates.`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = createFakeCandidates;
