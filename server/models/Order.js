// backend/models/Order.js
const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  customerName: String,
  customerPhone: String,
  kg: { type: Number, required: true },
  rate: { type: Number, required: true },
  quantity: { type: Number, required: true },
  cuttingCharge: { type: Number, default: 0 },
  deliveryCharge: { type: Number, default: 0 },
  total: { type: Number, required: true },
  payment: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  channel: { type: String, enum: ['Nil', 'G-pay', 'cash'], default: 'Nil' },
  note: { type: String },
  
}, { timestamps: true })

OrderSchema.pre('save', function (next) {
  this.total = (this.kg * this.rate) + (this.cuttingCharge || 0) + (this.deliveryCharge || 0)
  next()
})

module.exports = mongoose.model('Order', OrderSchema)
