
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, trim: true },
  address: { type: String, default: '' },
  totalOrders: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  lastPurchase: { type: Date, default: null }
}, { timestamps: true })

module.exports = mongoose.model('Customer', CustomerSchema)
