import * as mongoose from 'mongoose';

export const userRecipesSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipes:[{
        recipe:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }        
    }],
    created:{
        type:Date,
        default: Date.now
      }
})