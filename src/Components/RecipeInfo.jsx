import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeInfo = () => {
  const { MealId } = useParams();
  const [item, setItem] = useState(null);
  let id; // Declare id variable here

  useEffect(() => {
    if (MealId !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data.meals[0]); // Assuming data.meals is an array and we take the first element
        })
        .catch((error) => {
          console.error("Error fetching meal data:", error);
        });
    }
  }, [MealId]);

  if (item) {
    const strYoutube = item.strYoutube;
    const str = strYoutube.split("=");
    id = str[str.length - 1];
  }

  return (
    <>
      {item && (
        <div className="content">
          <img src={item.strMealThumb} alt="" />
          <div className="inner-content">
            <h1>{item.strMeal}</h1>
            <h2>{item.strArea} Food</h2>
            <h3>Category {item.strCategory}</h3>
          </div>

          <div className="recipe-details">
            <div className="ingredients">
              <h2>Ingredients</h2>
              <br />
              {Object.keys(item)
                .filter((key) => key.includes("strIngredient") && item[key])
                .map((key, index) => (
                  <h4 key={index}>
                    {item[key]}: {item[`strMeasure${key.slice(-1)}`]}
                  </h4>
                ))}
            </div>
            <div className="instructions">
              <h2>Instructions</h2>
              <br />
              <h4>{item.strInstructions}</h4>
            </div>
          </div>
          <div className="video">
            <iframe
              width="100%"
              height="515"
              title="recipeVideo"
              src={`https://www.youtube.com/embed/${id}`}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};
export default RecipeInfo;
