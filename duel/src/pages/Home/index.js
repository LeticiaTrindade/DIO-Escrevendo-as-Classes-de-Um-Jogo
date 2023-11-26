import React, { useState } from "react";
import ChooseCharacter from "../../components/ChooseCharacter";
import BattleScreen from "../../components/BattleScreen";

function Home() {
  const [isChoosingCharacter, setIsChoosingCharacter] = useState(true);

  return (
    <div >
      {isChoosingCharacter ? (
        <ChooseCharacter onSelectCharacter={() => setIsChoosingCharacter(false)} />
      ) : (
        <BattleScreen onReturnToChooseCharacter={() => setIsChoosingCharacter(true)} />
      )}
    </div>
  );
}

export default Home;
