const District = require('../models/district');
const Assembly = require('../models/assembly');

const addDistrict = () => {
  const newDistrict = new District({
    district: "Ahmedabad", 
    zones: [
      "645cbc001ecb2633f7e577f6",
      "645cbc001ecb2633f7e577f7",
      "645cbc001ecb2633f7e577f8",
      "645cbc001ecb2633f7e577f5",
      "645cbc001ecb2633f7e577f4"
    ]
  });
  
  newDistrict.save()
  .then((district) => {
    console.log(district);
  })
  .catch((error) => {
    console.log(error);
  });
}


const addAss = () => {
  const newAss = new Assembly({
    state: "Gujarat",
    districts: ["645d017108afa1c1ba617b02"],
    parties: [
      "645cf566b1563c1900ebb08c",
      "645cf566b1563c1900ebb08d",
      "645cf566b1563c1900ebb08e",
    ],
    seats: 192,
  });

  newAss
    .save()
    .then((district) => {
      console.log(district);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = addDistrict;