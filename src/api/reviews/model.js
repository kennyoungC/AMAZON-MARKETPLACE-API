import mongoose from "mongoose"

const { Schema, model } = mongoose

export const reviewsSchema = new Schema(
  {
    rate: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  {
    timestamps: true,
  }
)
export default model("Review", reviewsSchema)
