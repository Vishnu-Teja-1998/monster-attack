const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

const enteredValue = prompt("Maximum life for you and the monster", "100");
let choosenMaxHealth = parseInt(enteredValue);

if (isNaN(choosenMaxHealth) || choosenMaxHealth < 0) {
  choosenMaxHealth = 100;
}

let currentMonsterMaxHealth = choosenMaxHealth;
let currentPlayerMaxHealth = choosenMaxHealth;
let hasBonusLife = true;

adjustHealthBars(choosenMaxHealth);

function reset() {
  currentMonsterMaxHealth = choosenMaxHealth;
  currentPlayerMaxHealth = choosenMaxHealth;
  resetGame(choosenMaxHealth);
}

function endRound() {
  const initalPlayerHealth = currentPlayerMaxHealth;
  const PlayerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerMaxHealth = currentPlayerMaxHealth - PlayerDamage;
  if (currentPlayerMaxHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerMaxHealth = initalPlayerHealth;
    setPlayerHealth(initalPlayerHealth);
    alert("Youu retained by using extra Life.");
  }
  if (currentMonsterMaxHealth <= 0 && currentPlayerMaxHealth > 0) {
    alert("You Won!");
  } else if (currentPlayerMaxHealth <= 0 && currentMonsterMaxHealth > 0) {
    alert("You Lost!\nTry again...");
  } else if (currentMonsterMaxHealth < 0 && currentPlayerMaxHealth < 0) {
    alert("Match Draw!");
  }

  if (currentMonsterMaxHealth < 0 || currentPlayerMaxHealth < 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterMaxHealth = currentMonsterMaxHealth - damage;
  endRound();
}

function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerMaxHealth >= choosenMaxHealth - HEAL_VALUE) {
    //100 - 20 = 80
    alert("You can't heal more than max initial health");
    healValue = choosenMaxHealth - currentPlayerMaxHealth; //
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerMaxHealth = currentPlayerMaxHealth + HEAL_VALUE;
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
