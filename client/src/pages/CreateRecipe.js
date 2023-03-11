import React, { useState } from 'react';


const CreateRecipe = () => {

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instruction: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
  })

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

  console.log(recipe)

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form>
        <label htmlFor="name"> Name </label>
        <input type="text" id="name" name='name' onChange={handleChange}/>

        <label htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input key={idx} type='text' name='ingredients' value={ingredient} onChange={(e) => handleIngredientChange(e, idx)}/>
        ))}
        <button onClick={addIngredient} type='button'>Add Ingredient</button>

        <label htmlFor='instructions'>Instructions</label>
        <textarea id='instructions' name='instructions' onChange={handleChange}></textarea>

        <label htmlFor="imageUrl"> Image URL </label>
        <input type="text" id="mageUrl" name='mageUrl' onChange={handleChange} />

        <label htmlFor="cookingTime"> Cooking Time (minutes) </label>
        <input type="number" id="cookingTime" name='cookingTime'onChange={handleChange} />
      
        <button type='submit'>Create Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipe