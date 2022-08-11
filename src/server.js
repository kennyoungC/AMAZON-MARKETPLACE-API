import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import productRouter from "./api/products/index.js"
import reviewRouter from "./api/reviews/index.js"
import userRouter from "./api/users/index.js"

const port = process.env.PORT || 3001

const server = express()

server.use(cors())
server.use(express.json())

server.use("/products", productRouter)
server.use("/reviews", reviewRouter)
server.use("/users", userRouter)

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection
  .on("connected", () => {
    console.log("Mongoose is connected")
    server
      .listen(port, () => {
        console.table(listEndpoints(server))
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
