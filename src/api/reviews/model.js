import mongoose from "mongoose"

const { Schema, model } = mongoose

const reviewsSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    rate: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
export default model("Review", reviewsSchema)
