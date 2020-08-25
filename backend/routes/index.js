const router = require("express").Router();
let Exercise = require("../models/exercise.model");
let List = require("../models/list.model");
let Activity = require("../models/activity.model");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Working" });
});

router.get("/exercise", (req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json("Error" + err));
});
router.get("/exercise/list", (req, res) => {
  List.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(400).json("Error" + err));
});
router.post("/exercise/add", (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/exercise/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/exercise/delete/:id", (req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/exercise/update/:id", (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.post("/add-activity", (req, res, next) => {
  const username = req.body.username;
  const requiredAct = Number(req.body.requiredAct);
  const activity = Number(req.body.activity);
  const userDate = req.body.userDate;
  const weight = Number(req.body.weight);

  const newActivity = new Activity({
    username,
    requiredAct,
    activity,
    userDate,
    weight
  });

  newActivity
    .save()
    .then(() => res.json("Activity added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/show-activity/:userDate", (req, res) => {
  Activity.find({ userDate: req.params.userDate })
    .then(activity => {
      if (activity) res.json(activity);
    })
    .catch(err => res.status(400).json("Error: " + err));
});
router.post("/activity-added/:userDate", (req, res) => {
  console.log("REqbody", req.body.cal);
  Activity.findOneAndUpdate(
    { userDate: req.params.userDate },
    { $set: { activity: req.body.cal } },
    { new: true }
  )
    .then(activity => {
      res.json(activity);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// router.post("/activity-added/:userDate", (req, res) => {
//   console.log(req.body);
//   Activity.find(
//     { userDate: req.params.userDate }
//   )
//     .then(activity => {
//       res.json(activity);
//     })
//     .catch(err => res.status(400).json("Error: " + err));
// });
module.exports = router;
