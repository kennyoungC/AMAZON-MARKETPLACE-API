import mongoose from "mongoose"

const { Schema, model } = mongoose

const cartsSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["Active", "Paid", "Cancelled"],
    },
  },
  {
    timestamps: true,
  }
)

export default model("Cart", cartsSchema)
