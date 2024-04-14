import React from "react";
import { useNavigate } from "react-router-dom";

const MealItem = ({ data }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <>
      {!data ? (
        "Not Found"
      ) : (
        data.map((item) => (
          <div className="card" key={item.idMeal} onClick={() => navigate(`/${item.idMeal}`)}>
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3>{item.strMeal}</h3>
          </div>
        ))
      )}
    </>
  );
};

export default MealItem;