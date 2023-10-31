const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  password: { type: String, required: false },
  profilePicture: { type: String, required: false },
  id: { type: String }
}, {
  timestamps: true,
})

module.exports = mongoose.model("User", userSchema)