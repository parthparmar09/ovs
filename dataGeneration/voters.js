const { faker } = require("@faker-js/faker");
const Voter = require("../models/voter");

const generateVoters = async (total) => {
  try {
    const voters = [];
    for (let i = 0; i < total; i++) {
      const voter = new Voter({
        aadhar_number: faker.datatype.number({
          min: 100000000000,
          max: 899999999999,
        }),
        zone: faker.helpers.arrayElement([
          "645cbc001ecb2633f7e577f6",
          "645cbc001ecb2633f7e577f7",
          "645cbc001ecb2633f7e577f8",
          "645cbc001ecb2633f7e577f5",
          "645cbc001ecb2633f7e577f4",
        ]),
        assembly: "646201f999d928eaa8a95b3a",
        personal_info: {
          name: faker.name.firstName() + " " + faker.name.lastName(),
          gender: faker.helpers.arrayElement(["Male", "Female"]),
          date_of_birth: faker.date.between("1950-01-01", "2003-12-31"),
          phone: faker.datatype.number({ min: 9000000000, max: 9999999999 }),
          residential_info: {
            address: faker.address.streetAddress(),
            district: "Ahmedabad",
            state: "Gujarat",
            country: "India",
            zipcode: faker.datatype.number({ min: 380000, max: 390000 }),
            area: faker.helpers.arrayElement(["Urban", "Rural"]),
          },
        },
      });
      voters.push(voter);
    }

    const result = await Voter.insertMany(voters);
    console.log(`Inserted ${result.length} voters`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = generateVoters;

// "645cbc001ecb2633f7e577f4" -- "645cfd80824fffe0420e13ec","645cfd80824fffe0420e13ed","645cfd80824fffe0420e13ee"
// "645cbc001ecb2633f7e577f5" -- "645cfd80824fffe0420e13e9","645cfd80824fffe0420e13eb","645cfd80824fffe0420e13ea"
// "645cbc001ecb2633f7e577f6" -- "645cfd80824fffe0420e13e0","645cfd80824fffe0420e13e2","645cfd80824fffe0420e13e1"
// "645cbc001ecb2633f7e577f7" -- "645cfd80824fffe0420e13e5","645cfd80824fffe0420e13e4","645cfd80824fffe0420e13e3"
// "645cbc001ecb2633f7e577f8" -- "645cfd80824fffe0420e13e6","645cfd80824fffe0420e13e7","645cfd80824fffe0420e13e8"
// const voters = [
//   {
//     aadhar_number: 234639156160,

//     zone: "645cbc001ecb2633f7e577f4",
//     assembly: "646201f999d928eaa8a95b3a",
//     personal_info: {
//       name: "Parth Parmar",
//       gender: "Male",
//       date_of_birth: "2002/10/06",
//       phone: 9081257471,
//       residential_info: {
//         address: "Gita Mandir 1",
//         district: "Ahmedabad",
//         state: "Gujarat",
//         country: "India",
//         zipcode: 387877,
//         area: "Urban",
//       },
//     },
//   },
//   {
//     aadhar_number:710831705694 ,

//     zone: "645cbc001ecb2633f7e577f4",
//     assembly: "646201f999d928eaa8a95b3a",
//     personal_info: {
//       name: "Abhishek Sondarva",
//       gender: "Male",
//       date_of_birth: "2002/04/07",
//       phone: 9586004403,
//       residential_info: {
//         address: "Maninagar 3",
//         district: "Ahmedabad",
//         state: "Gujarat",
//         country: "India",
//         zipcode: 387879,
//         area: "Urban",
//       },
//     },
//   },

// ];