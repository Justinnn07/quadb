const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: String,
  last: String,
  buy_sell_price: String,
  volume: String,
  base_unit: String,
});

Schema.options.toJSON = {
  transform: function (doc, ret, options) {
    ret._id = ret.id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
};

const mainSchema = mongoose.model("quadB", Schema);
module.exports = mainSchema;
