const express = require('express');
const router = express.Router();
const Favourite = require("../../models/Favourite")
const auth = require("../../middleware/auth")

// GET /api/favourites/:userId
router.get("/:userId", (req, res) => {
  Favourite.find({ userId: req.params.userId }, (err, data) => {
    if (err)
      res.send(err);
    res.send(data);
  })
})

// POST /api/favourites/:userId - add a favourite
router.post("/:userId", auth, (req, res) => {
  const newFavourite = new Favourite({
    itineraryId: req.body.itineraryId,
    userId: req.params.userId
  });
  newFavourite.save().then(favourite => res.send(favourite))
})

// DELETE /api/favourites/:favouriteId - delete a favourite
router.delete("/:userId/:favouriteId", (req, res) => {
  Favourite.deleteOne({ _id: req.params.favouriteId, userId: req.params.userId })
    .then(() => res.json({ success: true }))
    .catch(() => res.status(404).json({ success: false }))
})

module.exports = router


