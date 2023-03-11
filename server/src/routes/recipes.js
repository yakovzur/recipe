import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response  = await RecipeModel.find({});
        req.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post('/', async (req, res) => {
    const recipe = new RecipeModel(req.body)
    try {
        const response  = await recipe.save();
        req.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.put('/', async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe)
        await user.save();
        req.json({savedRecipes: user.savedRecipes});
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedRecipes/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({savedRecipes: user?.savedRecipes})
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedRecipes", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        const savedRecipes = await RecipeModel.find({_id: {$in: user.savedRecipes},});
        res.json({savedRecipes});
    } catch (error) {
        res.json(error);
    }
});

export { router as recipeRouter };
