import React, { useState } from "react";
import { Link } from "react-router-dom";
import wizard from "../../images/wizard-image.png";
import warrior from "../../images/warrior-image.png";
import './style.css';


class Character {
    constructor(classType, hp, attackMessage) {
        this.classType = classType;
        this.hp = hp;
        this.attackMessage = attackMessage;
    }

    attack() {
        return this.calculateAttackDamage();
    }

    calculateAttackDamage() {
        const baseDamage = 20;
        const isCritical = Math.random() < this.getCriticalChance();
        const damage = isCritical ? baseDamage * 1.5 : baseDamage;
        return Math.round(damage);
    }

    getCriticalChance() {
        return 0;
    }
}

class Wizard extends Character {
    constructor() {
        super("Wizard", 100, "usou magia!");
    }

    getCriticalChance() {
        return 0.5;
    }
}

class Warrior extends Character {
    constructor() {
        super("Warrior", 125, "usou espada!");
    }

    getCriticalChance() {
        return 0.3;
    }
}

function getRandomEnemy() {
    return Math.random() < 0.5 ? new Wizard() : new Warrior();
}

function BattleScreen() {
    const selectedCharacter = window.localStorage.getItem("selectedCharacter");
    const player = selectedCharacter === "Wizard" ? new Wizard() : new Warrior();
    const [enemy, setEnemy] = useState(getRandomEnemy());
    const [playerHP, setPlayerHP] = useState(player.hp);
    const [enemyHP, setEnemyHP] = useState(enemy.hp);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [attackMessage, setAttackMessage] = useState("");
    const [gameOver, setGameOver] = useState(false);

    const playerImage = player.classType === "Wizard" ? wizard : warrior;
    const enemyImage = enemy.classType === "Wizard" ? wizard : warrior;

    const handleAttack = () => {
        if (gameOver) {
            return;
        }
        const playerDamage = player.attack();
        setEnemyHP((prevHP) => Math.max(0, prevHP - playerDamage));
        setAttackMessage("Jogador " + player.attackMessage);

        setIsPlayerTurn(false);

        setTimeout(() => {
            if (enemyHP > 0 && playerHP > 0) {
                performEnemyAttack(playerDamage);
            }
            else if (enemyHP <= 0) {
                setGameOver(true);
            }
        }, 3000);
    };

    const performEnemyAttack = (playerDamage) => {
        if (enemyHP <= 0) {
            setGameOver(true);
            return;
        }

        const enemyDamage = enemy.attack();
        setPlayerHP((prevHP) => Math.max(0, prevHP - enemyDamage));

        if (enemyHP <= 0) {
            setGameOver(true);
        } else {
            setIsPlayerTurn(true);

            setTimeout(() => {
                setAttackMessage("Inimigo " + enemy.attackMessage);
            }, 2000);

            if (enemyHP - playerDamage <= 0) {
                setGameOver(true);
                setAttackMessage("Parabéns! Você venceu!");
            } else if (playerHP - enemyDamage <= 0) {
                setGameOver(true);
                setAttackMessage("Game Over - Você perdeu!");
            }
        }
    };


    return (
        <div className="screen d-flex flex-column text-center">
            <h2>Batalha</h2>
    
            <div className="d-flex justify-content-around">
                <div className="card">
                    <img id="playerImage" src={playerImage} alt="Player" />
                    <p>Total de HP: {playerHP}</p>
                </div>
    
                <div  className="card">
                    <img id="enemyImage" src={enemyImage} alt="Enemy" />
                    <p>Total de HP: {enemyHP}</p>
                </div>
            </div>
    
            <div>
                <button onClick={handleAttack} disabled={!isPlayerTurn || gameOver}>
                    ATACAR
                </button>
            </div>
    
            <p>{attackMessage}</p>
    
            {gameOver && (
                 <div>
                 <button onClick={() => window.location.reload()}>Jogar Novamente</button>
             </div>
            )}
        </div>
    );
}



export default BattleScreen;
