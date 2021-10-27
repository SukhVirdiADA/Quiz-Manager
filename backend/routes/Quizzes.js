const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Quiz = require("../models/Quiz");

//add a quiz endpoint
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

//get all quizzes endpoint
userRouter.get("/", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Quiz.find().then((quizzes) => res.json(quizzes)).catch((err) => res.status(400).json({
		message: {
			messageBody: "ERROR:" + err,
			messageError: true
		},
	}));
});

//return a single quiz by using the quiz ID
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

//delete a single quiz by using the quiz ID
userRouter.delete("/:id", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Quiz.findByIdAndDelete(req.params.id).then((quiz) => res.json("Quiz deleted!")).catch((err) => res.status(400).json({
		message: {
			messageBody: "ERROR:" + err,
			messageError: true
		},
	}));
});

//find a quiz by ID and update quiz.
userRouter.post("/update/:id", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	Quiz.findById(req.params.id).then((quiz) => {
		quiz.quizTitle = req.body.quizTitle;
		quiz.quizQuestion = req.body.quizQuestion;
		quiz.answers = req.body.answers;
		quiz.correctAnswer = req.body.correctAnswer;
		quiz.save().then(() => res.json("Quiz updated!")).catch((err) => res.status(400).json({
			message: {
				messageBody: "ERROR:" + err,
				messageError: true
			},
		}));
	}).catch((err) => res.status(400).json({
		message: {
			messageBody: "ERROR:" + err,
			messageError: true
		},
	}));
});

module.exports = userRouter;