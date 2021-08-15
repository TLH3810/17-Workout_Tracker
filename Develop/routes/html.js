const router = require("express").Router();
const path = require("path");


  // Called when "Countinue Workout" or "new Workout" is clicked in index.html
  router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  // Not quite sure what this is used for yet ....
  router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  module.exports= router;