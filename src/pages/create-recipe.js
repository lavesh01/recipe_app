import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
    const userID = useGetUserID();
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });
    const [cookies,_] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({ ...recipe, [name] : value});
    }
    
    const handleIngredientChange = (event,idx) => {
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({
            ...recipe, 
            ingredients
        });
    };

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""] });
    };

    const onSubmit = async ( event ) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes",recipe,{
                headers: { authorization: cookies.access_token },
            });
            alert("Recipe created!!");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }
    
    return ( 
    <div className="create-recipe"> 
        <h2> Create Recipe </h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange} />
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient,idx) => {
                return <input 
                    key={idx} 
                    type="text" 
                    name="ingredients" 
                    value={ingredient} 
                    onChange={(event) => handleIngredientChange(event,idx)}
                />
            })}
            <button type="button" onClick={addIngredient}> Add Ingredients </button>
            <label htmlFor="instructions" >Instructions</label>
            <textarea id="intructions" name="instructions" onChange={handleChange} ></textarea>
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
            <label htmlFor="cookingTime" > Cooking Time (minutes)</label>
            <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />

            <button type="submit">Create Recipe</button>
        </form>
     </div>
)};