const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
	quizTitle: {
		type: String,
		required: true
	},
	quizQuestion: {
		type: String,
		required: true
	},
	answers: {
		type: Array,
		required: true
	},
	correctAnswer: {
		type: String,
		required: true
	},
	addedAt: {
		type: Date,
		default: Date.now
	},
});
module.exports = mongoose.model("Quiz", QuizSchema);