const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const config = require("config")
var nodemailer = require("nodemailer")
const {v4 : uuidv4} = require('uuid')
const User = require("../models/user")


const signinController = async (req, res) => {
    if (req.body.googleAccessToken) {
        // gogole-auth
        const { googleAccessToken } = req.body;

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;

                const existingUser = await User.findOne({ email })

                if (!existingUser)
                    return res.status(404).json({ message: "Email doesn't exist!" })

                const token = jwt.sign({
                    email: existingUser.email,
                    id: existingUser._id
                }, config.get("JWT_SECRET"), { expiresIn: "1h" })

                res
                    .status(200)
                    .json({ result: existingUser, token })

            })
            .catch(err => {
                res
                    .status(400)
                    .json({ message: "Invalid access token!" })
            })
    } else {
        // normal-auth
        const { email, password } = req.body;
        if (email === "" || password === "")
            return res.status(400).json({ message: "Invalid field!" });
        try {
            const existingUser = await User.findOne({ email })

            if (!existingUser)
                return res.status(404).json({ message: "Email doesn't exist!" })

            const isPasswordOk = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordOk)
                return res.status(400).json({ message: "Invalid credintials!" })

            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, config.get("JWT_SECRET"), { expiresIn: "1h" })

            res
                .status(200)
                .json({ result: existingUser, token })
        } catch (err) {
            res
                .status(500)
                .json({ message: "Something went wrong!" })
        }
    }

}

const signupController = async (req, res) => {
    if (req.body.googleAccessToken) {
        const { googleAccessToken } = req.body;

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;
                const userId = uuidv4();

                const existingUser = await User.findOne({ email })

                if (existingUser)
                    return res.status(400).json({ message: "Email already exists!" })

                const result = await User.create({ verified: "true", email, firstName, lastName, profilePicture: picture, userId})

                const token = jwt.sign({
                    email: result.email,
                    id: result._id
                }, config.get("JWT_SECRET"), { expiresIn: "1h" })

                res
                    .status(200)
                    .json({ result, token })
            })
            .catch(err => {
                res
                    .status(400)
                    .json({ message: "Invalid access token!" })
            })

    } else {
        // normal form signup
        const { email, password, phoneNumber, confirmPassword, firstName, lastName } = req.body;
        const userId = uuidv4();

        try {
            if (email === "" || password === "" || phoneNumber === "" || phoneNumber.length !== 10 || firstName === "" || lastName === "" && password === confirmPassword && password.length >= 4)
                return res.status(400).json({ message: "Invalid field!" })

            const existingUser = await User.findOne({ email })

            if (existingUser)
                return res.status(400).json({ message: "Email already exists!" })

            const hashedPassword = await bcrypt.hash(password, 12)

            const result = await User.create({ email, password: hashedPassword, firstName, lastName, phoneNumber, userId})

            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, config.get("JWT_SECRET"), { expiresIn: "1h" })

            res
                .status(200)
                .json({ result, token })
        } catch (err) {
            res
                .status(500)
                .json({ message: "Something went wrong!" })
        }

    }
}

const forgotPasswordController = async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    User.findOne({ email: email })
        .then(user => {
            console.log(user)
            if (!user) {
                return res.send({ Status: "Entered email doesn't exist" })
            }
            const token = jwt.sign({ email: user.email, id: user._id }, config.get("JWT_SECRET"), { expiresIn: "1h" })
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hokieforu@gmail.com',
                    pass: 'xvzfoiujoxbfikpw'
                }
            });

            var mailOptions = {
                from: 'hokieforu@gmail.com',
                to: user.email,
                subject: 'HokieForU: Reset Password Link',
                html: `http://localhost:3000/hokieforu/reset-password/${user._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    return res.send({ Status: "Success" })
                }
            });
        })
}

const resetPasswordController = async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body

    console.log(id, token, password)

    jwt.verify(token, config.get("JWT_SECRET"), (err, decoded) => {
        if (err) {
            return res.json({ Status: "Error with token" })
        } else {
            bcrypt.hash(password, 12)
                .then(hash => {
                    User.findByIdAndUpdate({ _id: id }, { password: hash })
                        .then(u => res.send({ Status: "Success" }))
                        .catch(err => res.send({ Status: err }))
                })
                .catch(err => res.send({ Status: err }))
        }
    })
}

module.exports = {
    signinController,
    signupController,
    forgotPasswordController,
    resetPasswordController
}