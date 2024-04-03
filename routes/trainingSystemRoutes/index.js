const express = require('express');
const router = express.Router();

const learningDoc_route = require("./learningDoc_route");
const mark_route = require("./mark_route");
const student_route = require("./student_route");
const subject_route = require("./subject_route");
const teacher_route = require("./teacher_route");
const trainingClass_route = require("./trainingClass_route");
const trainingCourse_route = require("./trainingCourse_route");

router.use("/learningDoc", learningDoc_route);
router.use("/mark", mark_route);
router.use("/student", student_route);
router.use("/subject", subject_route);
router.use("/teacher", teacher_route);
router.use("/trainingClass", trainingClass_route);
router.use("/trainingCourse", trainingCourse_route);


module.exports = router;