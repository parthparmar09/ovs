const router = require('express').Router();
const {getElectionData , adminLogin} = require('../controllers/admin')

router.route('/getElectionData').get(getElectionData);
router.route('/adminLogin').post(adminLogin)


module.exports = router