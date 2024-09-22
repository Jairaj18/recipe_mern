
import Recipe from "../models/recipie.model.js";


export const createRecipe = async (req, res) => {
    const { title, instruction, ingredients, cookingTime, servings, category, createdBy } = req.body;

    try {
        const newRecipe = new Recipe({
            title,
            instruction,
            ingredients,
            cookingTime,
            servings,
            category,
            createdBy,
        });

        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

export const getAllRecipe = async(req,res)=>{
    try{
        let recipe = await Recipe.find();
        if(!recipe) res.json({message:'recipe not exists'});
        res.json({recipe});
    
    }catch(err){
        res.json({message: message.err})

    }
}
 
export const getRecipieBYId = async(req,res)=>{
    const id = req.params.id;
    try{
        let recipe = await Recipe.findById(id);
        if(!recipe) res.json({message:'recipe not exists'});
        res.json({recipe});
    
    }catch(err){
        res.json({message: message.err})

    }
}
