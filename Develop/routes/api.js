const router = require("express").Router();
const db = require("../models/workout");

router.post("/api/workouts", (req, res) => {
  db.create({})
    .then(dbWorkout => { res.json(dbWorkout); })
    .catch(err => { res.status(400).json(err); });
});


router.get("/api/workouts", (req, res) => {
  //console.log(err)

  db.aggregate([{
    $addFields: {
      totalDuration: { $sum: '$exercises.duration' }
    }
  }])
    .then(dbWorkout => { res.json(dbWorkout); })
    .catch(err => { res.status(400).json(err); });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
  db.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    ///{new:true, runValidators: true}
  )
    .then(dbWorkout => { res.json(dbWorkout); })
    .catch(err => { res.status(400).json(err); });
});

router.get("api/workouts/range", (req, res) => {
  db.aggregate([{
    $addFields: {
      totalDuration: { $sum: '$exercises.duration' },
    },
  },])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {console.log(dbWorkouts); res.json(dbWorkouts); })
    .catch(err => { res.status(400).json(err); });
});

module.exports = router;