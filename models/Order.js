const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  city: String,
  email: String,
  postCode: String,
  street: String,
  numberHome: String,
  paid: Boolean,
}, {
    timestamps: true,
});

export const Order = models?.Order || model("Order", OrderSchema);
