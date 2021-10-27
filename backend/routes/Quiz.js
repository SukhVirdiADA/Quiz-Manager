const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Quiz = require("../models/Quiz");

userRouter.post("/add", passport.authenticate("jwt", {
	session: false
}), (req, res) => {

	const quizTitle = req.body.quizTitle;
	const quizQuestion = req.body.quizQuestion;
	const answers = req.body.answers;
	const correctAnswer = req.body.correctAnswer;
	const newQuiz = new Quiz({
		quizTitle,
		quizQuestion,
		answers,
		correctAnswer,
	});
	
	newQuiz.save().then(() => res.json("Quiz Added!")).catch((err) => res.status(400).json({
		message: {
			messageBody: "ERROR:" + err,
			messageError: true
		},
	}));
});

userRouter.get("/", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Quiz.find().then((quiz) => res.json(quiz)).catch((err) => res.status(400).json({
		message: {
			messageBody: "ERROR:" + err,
			messageError: true
		},
	}));
});

userRouter.get("/:id", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Quiz.findById(req.params.id).then((quiz) => res.json(quiz)).catch((err) => res.status(400).json({
		message: {
			messageBody: "ERROR:" + err,
			messageError: true
		},
	}));
});

module.exports = userRouter;