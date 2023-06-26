const createErr = require("../error/error");

require("dotenv").config();
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

const sendSMS = (req, res, next) => {
  const otp = Math.floor(1000 + (9999 - 1000) * Math.random());
  client.messages
    .create({
      body: `From OVS:\nYour OTP is ${otp}, Valid for 5 minutes\nThank You.`,
      from: "+13158175258",
      to: `+91${req.target_number}`,
    })
    .then((message) => {
      req.otp = otp;
      next();
    })
    .catch((err) => next(createErr(err.status, err.message)));
};

module.exports = sendSMS;