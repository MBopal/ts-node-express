import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true
    },
    name: {
      type: String
    },
    price: {
      type: Number
    },
    size: {
      type: String
    }
  },
  { timestamps: true }
)

export const productModel = mongoose.model('product', productSchema)

export default productModel
