const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const config = require("config")
const multer = require("multer")
const emailController = require("../controllers/emailController")
const path = require("path")
const { v4: uuidv4 } = require('uuid')
const User = require("../models/user")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
})

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

                const result = await User.create({ verified: "true", email, firstName, lastName, profilePicture: picture, userId })

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
        const profilePicture ='';
        try {
            if (email === "" || password === "" || phoneNumber === "" || phoneNumber.length !== 10 || firstName === "" || lastName === "" && password === confirmPassword && password.length >= 4)
                return res.status(400).json({ message: "Invalid field!" })

            const existingUser = await User.findOne({ email })

            if (existingUser)
                return res.status(400).json({ message: "Email already exists!" })

            const hashedPassword = await bcrypt.hash(password, 12)

            const result = await User.create({ email, password: hashedPassword, firstName, lastName, phoneNumber, userId, profilePicture })

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

    try {
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
            return res.send({ Status: "Entered email doesn't exist" });
        }
        const token = jwt.sign({ email: user.email, id: user._id }, config.get("JWT_SECRET"), { expiresIn: "1h" })

        const resetLink = `http://localhost:3000/hokieforu/reset-password/${user._id}/${token}`;
        const subject = 'HokieForU: Reset Password Link';

        await emailController.sendNotificationMail(user.email, subject, resetLink);
        return res.send({ Status: "Success" });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ Status: "Error" });
    }
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

const getUserDetailsController = async (req, res) => {
    const { userEmail } = req.body;
    try {
        const userDetails = await User.findOne({ email: userEmail });
        res.status(200).json(userDetails)

    } catch (error) {
        res.status(400).send("Error fetching User Details");
    }

}

const updateUserDetailsController = async (req, res) => {
    const { phoneNumber, firstName, lastName, email } = req.body;
    let profilePicture = '';
    if(req.file){
        profilePicture = req.file.filename;
    }
   
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.phoneNumber = phoneNumber;
        user.lastName = lastName;
        user.firstName = firstName;
        if(req.file){
            user.profilePicture = profilePicture;
        }
        const updatedUser = await user.save();
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(400).send("Error fetching User Details");
    }

}

module.exports = {
    signinController,
    signupController,
    forgotPasswordController,
    resetPasswordController,
    getUserDetailsController,
    updateUserDetailsController,
    upload
}