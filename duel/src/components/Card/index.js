import React from "react";
import './style.css';

function Card({ class: characterClass, imgClass, onSelect }) {
  const handleChooseCharacter = () => {
    console.log("Selected Character:", characterClass);
    window.localStorage.setItem("selectedCharacter", characterClass);
    onSelect();
  };
    
  return (
    <div className="card" onClick={handleChooseCharacter}>
      <img src={imgClass} alt={characterClass} />
      <p>{characterClass}</p>
    </div>
  );
}

export default Card;
