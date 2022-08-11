import express from "express"
import createHttpError from "http-errors"
import reviewModel from "./model.js"
import productModel from "../products/model.js"

const reviewRouter = express.Router()

reviewRouter.post("/:productId", async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.productId)
    if (!product) {
      next(createHttpError(404, "Product not found"))
    }
    const newReview = new reviewModel({
      ...req.body,
      product_id: req.params.productId,
    })
    await newReview.save()
    await productModel.findByIdAndUpdate(
      req.params.productId,
      {
        $push: { reviews: newReview._id },
      },
      { new: true }
    )
    res.status(201).send(newReview)
  } catch (error) {
    next(createHttpError(500, error))
  }
})

reviewRouter.put("/:reviewId", async (req, res, next) => {
  try {
    const review = await reviewModel.findById(req.params.reviewId)

    const newReview = {
      ...review.toObject(),
      ...req.body,
    }

    await reviewModel.findByIdAndUpdate(req.params.reviewId, newReview, {
      new: true,
    })
    res.status(200).send(newReview)
  } catch (error) {
    next(createHttpError(500, error))
  }
})
reviewRouter.get("/:reviewId", async (req, res, next) => {
  try {
    const rev = await reviewModel.findById(req.params.reviewId)
    res.send(rev)
  } catch (error) {
    next(createHttpError(500, error))
  }
})
reviewRouter.delete("/:reviewId", async (req, res, next) => {
  try {
    await reviewModel.findByIdAndDelete(req.params.reviewId)
    res.status(204).send()
  } catch (error) {
    next(createHttpError(500, error))
  }
})

export default reviewRouter
