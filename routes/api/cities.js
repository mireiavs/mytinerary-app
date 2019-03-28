const express = require('express');
const router = express.Router();
const City = require("../../models/City")


// GET /api/cities
router.get("/", (req, res) => {
  City.find({}, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);
  })})


// POST /api/cities
router.post("/", (req, res) => {
  const newCity = new City({
    name: req.body.name,
    country: req.body.country
  });
  newCity.save().then(city => res.send(city))
})


// DELETE /api/cities/:id
router.delete("/:id", (req, res) => {
  City.findById(req.params.id)
  .then(city => city.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}))
})

module.exports = router