import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, 
    },
    instruction: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String], 
        required: true,
    },
    cookingTime: { 
        type: Number,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    category: { 
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'], // Set allowed categories
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
}, {
    timestamps: true, 
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
