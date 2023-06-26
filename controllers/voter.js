const TempUser = require("../models/tempUser");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const Party = require("../models/party");
const Zone = require("../models/zone");
const Election = require("../models/election");
const Assembly = require("../models/assembly");
const createErr = require("../error/error");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJwt = (a_no) => {
  return jwt.sign({ a_no }, process.env.SECRET_JWT_KEY);
};

const verifyJwt = (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) {
    console.log("1");
    return next(createErr(StatusCodes.BAD_REQUEST, "token not found "));
  }
  if (!token.startsWith("Bearer")) {
    console.log("2");
    return next(createErr(StatusCodes.NOT_ACCEPTABLE, "invalid token "));
  }

  token = token.split(" ")[1];
  const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
  if (!payload) {
    console.log("3");

    return next(createErr(StatusCodes.NOT_ACCEPTABLE, "invalid token "));
  }
  req.a_no = payload.a_no;
  next();
};

const findUser = async (req, res, next) => {
  try {
    const { aadhar_number } = req.body;
    if (!aadhar_number) {
      return next(
        createErr(StatusCodes.NOT_ACCEPTABLE, "aadhar number can't be empty")
      );
    }
    const voter = await Voter.findOne({ aadhar_number });
    if (!voter) {
      return next(createErr(StatusCodes.NOT_FOUND, "user not found"));
    }
    req.target_number = voter.personal_info.phone;
    next();
  } catch (error) {
    console.error(error);
    return next(
      createErr(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "something went wrong , try again"
      )
    );
  }
};

const storeTempUser = async (req, res, next) => {
  try {
    const { aadhar_number } = req.body;
    const otp = req.otp;
    const tempUser = await TempUser.findOneAndUpdate(
      { aadhar_number },
      { aadhar_number, otp, expireAt: Date.now() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    if (!tempUser) {
      return next(
        createErr(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "something went wrong , try again"
        )
      );
    }
    res.status(200).json({ success: true, msg: "OTP has been sent" });
  } catch (error) {
    return next(createErr(error.status, error.message));
  }
};

const tryLogin = async (req, res, next) => {
  try {
    const { aadhar_number, otp } = req.body;
    const tempUser = await TempUser.findOneAndDelete({ aadhar_number, otp });
    if (!tempUser) {
      return next(
        createErr(StatusCodes.NOT_ACCEPTABLE, "Aadhar or OTP is invalid")
      );
    }

    const voter = await Voter.findOne({ aadhar_number });
    const token = createJwt(aadhar_number);
    res.status(StatusCodes.OK).json({ success: true, token, data: voter });
  } catch (error) {
    return next(createErr(error.status, error.message));
  }
};

const checkElection = async (req,res,next) => {
    try {
        const voter = await Voter.findOne({aadhar_number : req.a_no}).populate({path : 'zone' , select : 'name'})
        if (!voter) {
            return next(createErr(StatusCodes.BAD_REQUEST, "something went wrong , try again"));
        }

        const election = await Election.findOne({state : voter.assembly}).select('assembly startDate endDate').populate({path : 'state' , select : 'name'})
        if(election.endDate < Date.now() || election.startDate > Date.now()){
            return res.status(StatusCodes.NOT_FOUND).json({success : false , msg : "There are no elections going on for your zone"})
        }
        req.election = election
        next()

    
    } catch (error) {
        console.error(error)
        return next(createErr(StatusCodes.INTERNAL_SERVER_ERROR, "something went wrong , try again"))
    }
}

const getMyElection = async (req, res, next) => {
  try {
    const voter = await Voter.findOne({aadhar_number : req.a_no}).populate({path : 'zone' , select : 'name'})
    if (!voter) {
        return next(createErr(StatusCodes.BAD_REQUEST, "something went wrong , try again"));
    }

    const candidates = await Candidate.find({zone : voter.zone}).select('-votes').populate({path : 'party' , select : 'name'})
    if(!candidates){
        return next(createErr(StatusCodes.INTERNAL_SERVER_ERROR, "something went wrong , try again"));
    }

    res.status(StatusCodes.OK).json({success : true ,election : req.election , zone : voter.zone , candidates})

  } catch (error) {
    console.error(error)
    return next(createErr(StatusCodes.INTERNAL_SERVER_ERROR, "something went wrong , try again"))
  }
};


const placeVote = async (req,res,next) => {
    try {
      const aadhar_number = req.a_no;
      const {otp , candidate_id } = req.body;
      const tempUser = await TempUser.findOneAndDelete({ aadhar_number, otp });
      if (!tempUser) {
        return next(
          createErr(StatusCodes.NOT_ACCEPTABLE, "OTP is invalid")
        );
      }

      const voter = await Voter.findOne({aadhar_number})
      if(voter.voted){
        return next(createErr(StatusCodes.NOT_IMPLEMENTED , "You already placed a vote"))
      }

      const candidate = await Candidate.findById(candidate_id)
      candidate.votes++;
      candidate.save();

      voter.voted = true;
      voter.save();

      res.status(StatusCodes.OK).json({success : true , msg : 'your vote has been placed successfully'})

    } catch (error) {
        console.error(error)
        return next(createErr(StatusCodes.INTERNAL_SERVER_ERROR, "something went wrong , try again"))
    }
}

module.exports = {
  findUser,
  storeTempUser,
  tryLogin,
  verifyJwt,
  checkElection,
  getMyElection,
  placeVote
};
