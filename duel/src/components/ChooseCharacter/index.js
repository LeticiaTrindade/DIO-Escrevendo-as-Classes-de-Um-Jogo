import React from "react";
import Card from "../Card";
import { Link } from "react-router-dom";
import wizardImage from "../../images/wizard-image.png";
import warriorImage from "../../images/warrior-image.png";

function ChooseCharacter({ onSelectCharacter }) {
  const characters = [
    { class: "Wizard", imgClass: wizardImage },
    { class: "Warrior", imgClass: warriorImage }
  ];

  return (
    <div className="screen d-flex flex-column text-center">
      <h2>Escolha o seu personagem</h2>
      <div className="card-container justify-content-around w-70 d-flex">
        {characters.map((char, index) => (
          <Card 
          key={index} 
          class={char.class} 
          imgClass={char.imgClass} 
          onSelect={onSelectCharacter} />
        ))}
      </div>
    </div>
  );
}

export default ChooseCharacter;
