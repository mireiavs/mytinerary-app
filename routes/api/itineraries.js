const express = require('express');
const router = express.Router();
const Itinerary = require("../../models/Itinerary")


// GET /api/itineraries
router.get("/:id", (req, res) => {
  Itinerary.find({ cityName: req.params.id }, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);
  })})

  module.exports = router