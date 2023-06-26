const router = require('express').Router();
const {  findUser,
    storeTempUser,
    tryLogin,
    verifyJwt,
    checkElection,
    getMyElection,
    placeVote} = require('../controllers/voter');
const sendSMS = require('../sendSMS/sms');



router.route('/getOtp').post(findUser , sendSMS , storeTempUser)
router.route('/tryLogin').post(tryLogin)
router.route('/getMyElection').get(verifyJwt ,checkElection, getMyElection)
router.route('/placeVote').post(verifyJwt ,placeVote)

module.exports = router