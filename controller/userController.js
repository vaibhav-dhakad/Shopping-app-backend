const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const { createToken } = require("../config/jwt.config");
const User = db.users;

// SIGNING UP
const signUp = async(req, res) => {

    const hashed_passcode = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        name: req.body.name,

        email: req.body.email,
        password: hashed_passcode,
    });
    // console.log(user, "values");
    const data = { user: { id: user.id } };
    // console.log(data.user.id);
    const token = await createToken(data);

    res.status(200).json({ user, token });
};
// LOGIN
const login = async(req, res) => {
    try {
        const email = "vaibhav@gmail.com";
        const password = "1212";

        const user = await User.findOne({
            where: { email: email },
        });
        if (user) {
            const passcode_matched = await bcrypt.compare(password, user.password);
            if (passcode_matched) {
                const data = { user: { id: user.user_id } };

                const token = await createToken(data);

                res.status(200).json({ user, token });

            } else {
                res.send("invalid password");
            }
        } else {
            res.send("no user exist");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
};
module.exports = { signUp, login };