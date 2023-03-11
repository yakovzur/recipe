import React, { useState } from 'react';
import axios from 'axios';
import useGetUserID from '../hooks/useGetUserID';


const CreateRecipe = () => {

  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipe({...recipe, [name]: value})
  };

  const handleIngredientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({...recipe, ingredients})
  };

  const addIngredient = () => {
    setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/recipes', recipe);
      alert("Recipe Created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name"> Name </label>
        <input type="text" id="name" name='name' onChange={handleChange}/>

        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input key={idx} type='text' name='ingredients' value={ingredient} onChange={(e) => handleIngredientChange(e, idx)}/>
        ))}
        <button onClick={addIngredient} type='button'>Add Ingredient</button>

        <label htmlFor='instruction'>Instructions</label>
        <textarea id='instruction' name='instruction' onChange={handleChange}></textarea>

        <label htmlFor="imageUrl"> Image URL </label>
        <input type="text" id="mageUrl" name='mageUrl' onChange={handleChange} />

        <label htmlFor="cookingTime"> Cooking Time (minutes) </label>
        <input type="number" id="cookingTime" name='cookingTime'onChange={handleChange} />
      
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe