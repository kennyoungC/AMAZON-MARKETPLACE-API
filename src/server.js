import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import listEndpoints from "express-list-endpoints"

const port = process.env.PORT || 3001

const server = express()

server.use(cors())
server.use(express.json())

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection
  .on("connected", () => {
    console.log("Mongoose is connected")
    server
      .listen(port, () => {
        console.log(`Server is running on port ${port}`)
      })
      .on("error", (err) => {
        console.log(err)
      })
  })
  .on("error", (err) => {
    console.log(err)
  })
  .on("disconnected", () => {
    console.log("Mongoose is disconnected")
  })
