const express = require('express');
const router = express.Router();
const {body, query} = require('express-validator')
const rideController = require('../controllers/ride.controllers.js')
const authMiddleware = require('../middlewares/auth.middlewares.js') 
const userModel = require('../models/user.models');
const rideModel = require('../models/ride.models.js')

router.post('/create', 
    body('pickup').isString().isLength({min: 3}).withMessage("Invalid pickup address"),
    body('destination').isLength({min: 3}).withMessage("Invalid pickup address"),
    authMiddleware.authUser,
    rideController.createRide
)

router.get('/get-fare',
query('pickup').isString().isLength({min: 3}).withMessage("Invalid pickup address"),
query('destination').isLength({min: 3}).withMessage("Invalid pickup address"),
authMiddleware.authUser,
  rideController.createFare)


router.get('/get-rides-information', rideController.getRidesInformation)

router.get('/get-user-information', async(req, res) =>{
  try{
      const {id} = req.query;
      const user = await userModel.findOne({_id : id});
      res.send(user.fullname);
  }
  catch(err)
  {
    throw new err;
  }
})

router.post('/set-status',
  body('status').isString().isIn(['pending', 'accepted','ongoing', 'completed', 'cancelled']).withMessage("Invalid status"),
   async (req, res) =>{
    const {status, id} = req.body;

    try{
      const updateStatus = await rideModel.updateOne({user: id}, {status});
      res.send(updateStatus);
    }
    catch(err)
    {
      res.status(500).send({err: err.message});
    }
})

router.post('/get-status', async (req, res) =>{
  const {id} = req.body;

  try{
    const user = await rideModel.findOne({user : id});
    res.send(user?.status);
  }
  catch(err)
  {
    res.status(500).send({err: err.message});
  }
})


module.exports = router;