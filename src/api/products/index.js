import express from "express"
import createHttpError from "http-errors"
import productModel from "./model.js"
import upload from "../../utils/multer.js"
import cloudinary from "../../utils/cloudinary.js"
import q2m from "query-to-mongo"

const productRouter = express.Router()

productRouter.post(
  "/",
  upload.single("product-image"),
  async (req, res, next) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path)
      //Create new product
      const newProduct = new productModel({
        ...req.body,
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
      })

      await newProduct.save()
      res.status(201).send(newProduct)
    } catch (err) {
      next(createHttpError(500, err))
    }
  }
)

productRouter.get("/", async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query)
    const products = await productModel
      .find(mongoQuery.criteria, mongoQuery.options.fields)
      .skip(mongoQuery.options.skip)
      .limit(mongoQuery.options.limit)
      .sort(mongoQuery.options.sort)
      .populate({ path: "reviews", select: "rate comment" })
    res.send(products)
  } catch (error) {
    next(createHttpError(500, error))
  }
})
productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id)
    res.send(product)
  } catch (error) {
    next(createHttpError(500, error))
  }
})
productRouter.put(
  "/:id",
  upload.single("product-image"),
  async (req, res, next) => {
    try {
      const product = await productModel.findById(req.params.id)
      if (product) {
        let result
        if (req.file) {
          await cloudinary.uploader.destroy(product.cloudinaryId)
          result = await cloudinary.uploader.upload(req.file.path)
        }

        const data = {
          ...product.toObject(),
          imageUrl: result ? result.secure_url : product.imageUrl,
          cloudinaryId: result ? result.public_id : product.cloudinaryId,
          ...req.body,
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
          req.params.id,
          data,
          { new: true }
        )
        res.send(updatedProduct)
      } else {
        next(createHttpError(404, "Product not found"))
      }
    } catch (error) {
      next(createHttpError(500, error))
    }
  }
)
productRouter.delete("/:id", async (req, res, next) => {
  try {
    // Find user by id
    const product = await productModel.findById(req.params.id)
    if (product) {
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(product.cloudinaryId)
      await productModel.findByIdAndDelete(req.params.id)
      res.sendStatus(204)
    } else {
      next(createHttpError(404, "Product not found"))
    }
  } catch (error) {
    next(createHttpError(500, error))
  }
})
productRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const product = await productModel
      .findById(req.params.productId)
      .populate("reviews")
    if (product) {
      res.send(product.reviews)
    } else {
      next(createHttpError(404, "Product not found"))
    }
  } catch (error) {
    next(createHttpError(500, error))
  }
})

export default productRouter
