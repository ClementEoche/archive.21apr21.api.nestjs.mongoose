import * as mongoose from 'mongoose';

export const IngredientsSchema = new mongoose.Schema({
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  created:{
    type:Date,
    default: Date.now
  }
});
