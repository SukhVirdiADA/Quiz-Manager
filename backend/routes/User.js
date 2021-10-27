const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const signToken = (userId) => {
	return JWT.sign({
		iss: "sukh",
		sub: userId,
	}, "SukhVirdi", {
		expiresIn: "1h"
	});
};

userRouter.get("/", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	User.find().then((users) => res.json(users)).catch((err) => res.status(400).json({
		message: {
			messageBody: "ERROR:" + err,
			messageError: true
		},
	}));
});

userRouter.post("/login", passport.authenticate("local", {
	session: false
}), (req, res) => {
	if(req.isAuthenticated()) {
		const {
			_id, username, role
		} = req.user;
		const token = signToken(_id);
		res.cookie("access_token", token, {
			httpOnly: true,
			sameSite: true
		});
		res.status(200).json({
			isAuthenticated: true,
			user: {
				username, role
			}
		});
	}
});

userRouter.get("/logout", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	res.clearCookie("access_token");
	res.json({
		user: {
			username: "",
			role: ""
		},
		session: true
	});
});

userRouter.get("/authenticated", passport.authenticate("jwt", {
	session: false
}), (req, res) => {
	const {
		username, role
	} = req.user;
	res.status(200).json({
		isAuthenticated: true,
		user: {
			username, role
		}
	});
});

module.exports = userRouter;