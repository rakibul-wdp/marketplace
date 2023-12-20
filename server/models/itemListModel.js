import mongoose from "mongoose";

const itemListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isAuctioned: {
    type: Boolean,
    default: false,
  },
});

const ItemList = mongoose.model("ItemList", itemListSchema);
export default ItemList;
