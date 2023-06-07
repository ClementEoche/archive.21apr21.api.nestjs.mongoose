import * as mongoose from 'mongoose';

export const recipeIngredientsSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    ingredients:[{
        ingredient:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient'
        }        
    }],
    created:{
        type:Date,
        default: Date.now
      }
})