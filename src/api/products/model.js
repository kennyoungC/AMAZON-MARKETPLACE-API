import mongoose from "mongoose"
import { reviewsSchema } from "../reviews/model.js"

const { Schema, model } = mongoose

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },

  { timestamps: true }
)

export default model("Product", productsSchema)
