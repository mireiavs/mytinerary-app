const express = require('express');
const router = express.Router();
const Activity = require("../../models/Activity")


// GET /api/activities/:itineraryId
router.get("/:itineraryId", (req, res) => {
  Activity.find({ itineraryId: req.params.itineraryId }, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);
  })})


// POST /api/activities/:itineraryId
  router.post("/:itineraryId", (req, res) => {
    const newActivity = new Activity({
      itineraryId: req.body.itineraryId,
      img: req.body.img,
      caption: req.body.caption
    });
    newActivity.save().then(activity => res.send(activity))
  })

// UPDATE /api/activities/:itineraryId/:activityId
  router.put("/:itineraryId/:activityId", (req, res) => {
    const updatedActivity = {
      itineraryId: req.body.itineraryId,
      img: req.body.img,
      caption: req.body.caption
    }
    Activity.findOneAndUpdate({ _id: req.params.activityId }, updatedActivity)
      .then(activity => res.json({ success: true }))
      .catch(() => res.status(404).json({ success: false }))
  })
  
  // DELETE /api/itineraries/:cityid/:itineraryId
  router.delete("/:itineraryId/:activityId", (req, res) => {
    Activity.deleteOne({ _id: req.params.activityId })
      .then(activity => res.json({ success: true }))
      .catch(err => res.status(404).json({ success: false }))
  })



  module.exports = router


  