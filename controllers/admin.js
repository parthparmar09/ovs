const Election = require("../models/election");
const createErr = require("../error/error");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const getElectionData = async (req, res, next) => {
  try {
    if (req.body.admin_token != process.env.ADMIN_TOKEN) {
      return next(
        createErr(
          StatusCodes.UNAUTHORIZED,
          "invalid token , try logging in again"
        )
      );
    }
    const election = await Election.findById(req.body.el_id)
      .populate({ path: "state", select: "state seats" })
      .populate({ path: "results.zone", select: "name district" })
      .populate({ path: "results.candidates", select: "name party votes" })
      .populate({ path: "results.candidates.party", select: "name" });

    if (!election) {
      return next(createErr(StatusCodes.NOT_FOUND, "no election data found"));
    }

    res.status(200).json({ success: true, data: election });
  } catch (error) {
    return next(
      createErr(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "something went wrong , try again"
      )
    );
  }
};

const adminLogin = (req, res, next) => {
  const { admin_id, admin_key } = req.body;

  if (admin_id != process.env.ADMIN_ID || admin_key != process.env.ADMIN_KEY) {
    return next(createErr(StatusCodes.UNAUTHORIZED, "invalid admin id or key"));
  }
  res
    .status(StatusCodes.ACCEPTED)
    .json({ success: true, admin_token: process.env.ADMIN_TOKEN });
};

module.exports = { getElectionData, adminLogin };
