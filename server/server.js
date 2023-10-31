const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require("./routes/userRoutes")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", userRoutes)

const PORT = process.env.PORT || 8000;
const MONGOOSE_URL = "Enter your MongoDB connection string"


mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  }))
  .catch(err => {
    console.log(err)
  })