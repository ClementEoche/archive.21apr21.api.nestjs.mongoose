import * as mongoose from 'mongoose';


export const RecipesSchema = new mongoose.Schema({
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: { type: String, required: true },
  description:{type: String},
  cookingInstruction: {type: String, required:true},
  timeOfPrepa:  {type: Number, required: true},
  difficultyLvl:  {type: Number, required: true},
  created:{
    type:Date,
    default: Date.now
  }
});

