import mongoose from "mongoose";

const savedRecipeSchema = new mongoose.Schema({
    recipe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'recipe',
    }
})

export const savedRecipe = mongoose.model('saveRecipe', savedRecipeSchema);