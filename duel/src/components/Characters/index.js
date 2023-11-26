class Character {
    constructor(classType, hp) {
        this.classType = classType;
        this.hp = hp;
    }

    attack() {
        return this.calculateAttackDamage();
    }

    defend() {
        return this.calculateDefenseReduction();
    }

    calculateAttackDamage() {
        const baseDamage = 10;
        const isCritical = Math.random() < this.getCriticalChance();
        const damage = isCritical ? baseDamage * 1.5 : baseDamage;
        return Math.round(damage);
    }

    calculateDefenseReduction() {
        const reductionPercentage = this.getDefenseChance();
        return reductionPercentage;
    }

    getCriticalChance() {
        return 0;
    }

    getDefenseChance() {
        return 0;
    }
}

class Wizard extends Character {
    constructor() {
        super("Wizard", 100);
    }

    getCriticalChance() {
        return 0.5; 
    }

    getDefenseChance() {
        return 0.3; 
    }
}

class Warrior extends Character {
    constructor() {
        super("Warrior", 150);
    }

    getCriticalChance() {
        return 0.3; 
    }

    getDefenseChance() {
        return 0.5;
    }
}

function getRandomEnemy() {
    return Math.random() < 0.5 ? new Wizard() : new Warrior();
}

const player = new Wizard();
const enemy = getRandomEnemy();

const playerDamage = player.attack();
const enemyDamage = enemy.attack();

const playerReduction = player.defend();
const enemyReduction = enemy.defend();

const playerFinalDamage = playerDamage * (1 - playerReduction);
const enemyFinalDamage = enemyDamage * (1 - enemyReduction);