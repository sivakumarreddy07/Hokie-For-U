const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const userRoutes = require("./routes/userRoutes")
const User = require("./models/user")
var nodemailer = require("nodemailer")
const app = express()

app.use(cors())
app.use(express.json())

app.post('/forgot-password', (req, res) => {
    const {email} = req.body;
    console.log(req.body)
    User.findOne({email: email})
    .then(user => {
        console.log(user)
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({email: user.email,id: user._id}, config.get("JWT_SECRET"), {expiresIn: "1h"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'hokieforu@gmail.com',
              pass: 'Enter your password'
            }
          });
          
          var mailOptions = {
            from: 'hokieforu@gmail.com',
            to: user.email,
            subject: 'HokieForU: Reset Password Link',
            html: `http://localhost:3000/hokieforu/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
})

app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    console.log(id,token,password)

    jwt.verify(token, config.get("JWT_SECRET"), (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 12)
            .then(hash => {
                User.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})

app.use("/users", userRoutes)

const PORT = process.env.PORT || 8000;
const MONGOOSE_URL = "Enter your MongoDB connection string"


mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
}))
.catch(err=>{
    console.log(err)
})


