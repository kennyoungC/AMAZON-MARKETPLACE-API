import express from "express"
import createError from "http-errors"
import UsersModel from "./model.js"
import CartsModel from "./cartsModel.js"
import ProductsModel from "../products/model.js"

const userRouter = express.Router()

userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UsersModel(req.body)
    await newUser.save()
    res.status(201).send(newUser)
  } catch (error) {
    next(createError(500, error))
  }
})
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersModel.find()
    res.send(users)
  } catch (error) {
    next(createError(500, error))
  }
})

userRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.params.userId)
    if (!user) {
      next(createError(404, "User not found"))
    }
    res.send(user)
  } catch (error) {
    next(createError(500, error))
  }
})

userRouter.put("/:userId", async (req, res, next) => {
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true } // OPTIONS. By default findByIdAndUpdate returns the record pre-modification. If you want to get back the newly updated record you should use the option: new true
      // By default validation is off here --> runValidators: true
    )
    if (!updatedUser) {
      next(createError(404, "User not found"))
    }
    res.send(updatedUser)
  } catch (error) {
    next(createError(500, error))
  }
})
usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deletedUser = await UsersModel.findByIdAndDelete(req.params.userId)
    if (deletedUser) {
      res.status(204).send()
    } else {
      next(createError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})
