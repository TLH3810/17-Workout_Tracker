const router = require("express").Router();
const db = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then(dbWorkout => {res.json(dbWorkout);})
    .catch(err => {res.status(400).json(err);});
});


router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([{
    $addFields:{
      totalDuration:{$sum:'$exercises.duration'}
    }
  }])
  .then(dbWorkout => {res.json(dbWorkout);})
  .catch(err => {res.status(400).json(err);});
});

router.put("/api/workouts/:id", ({body, params}, res) => {
    db.Workout.findByIDAndUpdate(
        params.id,
        {$push: {exercises, body}},
        ///{new:true, runValidators: true}
    )
    .then(dbWorkout => {res.json(dbWorkout);})
    .catch(err => {res.status(400).json(err);});
  });

module.exports = router;