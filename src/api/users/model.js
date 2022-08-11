import mongoose from "mongoose"

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, min: 18, max: 65, required: true },
    professions: [String],
    address: {
      street: { type: String },
      number: { type: Number },
    },
    cartItems: [
      {
        name: String,
        category: String,
        description: String,
        brand: String,
        imageUrl: String,
        purchaseDate: Date,
      },
    ],
  },
  { timestamps: true }
)

export default model("User", userSchema)
