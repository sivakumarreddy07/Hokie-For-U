const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')
const userRoutes = require("./routes/userRoutes")
const jobRoutes = require("./routes/jobRoutes")
const app = express()

app.use(cors())
app.use(express.json())
app.use("/users", userRoutes)
app.use("/jobs", jobRoutes)

const PORT = process.env.PORT || 8000;
const MONGOOSE_URL = config.get("connectionString")

mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  }))
  .catch(err => {
    console.log(err)
  })