const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/quizmanager', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => {
	console.log('Successfully Connected to the Database!');
});

mongoose.set('useCreateIndex', true);

const userRouter = require("./routes/User");
const quizzesRouter = require("./routes/Quizzes");

app.use("/user", userRouter);
app.use("/quiz", quizzesRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});