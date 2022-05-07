const mongoose = require("mongoose");
const invoiceScema = mongoose.Schema(
  {
    recieverName: { type: String, require: true, trim: true },
    recieverNumber: { type: String, require: true },
    emailAddress: { type: String, require: true },
    products: { type: Array, require: true, default: [] },
    paymentDetails: { type: String, require: true },
    deliveryFee: { type: Number, default: 0 },
    totalPrice: { type: Number, require: true, default: 0 },
    status: { type: String, enum: ["accepted rejected"] },
    paymentMethod: { type: String, require: true, default: "flutterWave" },
    deliveryDate: { type: Date, require: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // createdFor: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceScema);
