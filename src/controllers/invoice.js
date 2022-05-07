const Invoice = require("../model/invoice");
const User = require("../model/user");
const viewInvoices = async (req, res, next) => {
  const userId = req.user.user;
  try {
    const invoices = await Invoice.find({ createdBy: userId }).select(
      "-createdAt -_id -products"
    );
    return res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    next(error);
  }
};
const createInvoice = async (req, res, next) => {
  //   const {
  //     receiverName,
  //     receiverNumber,
  //     emailAddress,
  //     products,
  //     paymentDetails,
  //     deliveryFee,
  //     totalPrice,
  //     paymentMethod,
  //     deliveryDate,
  //     createdBy,
  //   } = req.body;
  const products = req.body.products;
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price;
  }
  req.body.totalPrice = totalPrice;
  req.body.createdBy = req.user.user;
  try {
    const newInvoice = await Invoice.create(req.body);
    if (!newInvoice) {
      return res.status(401).json({
        success: false,
        message: "Error, invoice cannot be generated",
      });
    }

    res.status(200).json({ success: true, data: newInvoice });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInvoice, viewInvoices };
