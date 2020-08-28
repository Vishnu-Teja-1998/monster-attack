const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

let choosenMaxHealth = 100;
let currentMonsterMaxHealth = choosenMaxHealth;
let currentPlayerMaxHealth = choosenMaxHealth;

adjustHealthBars(choosenMaxHealth);

function endRound() {
  const PlayerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerMaxHealth = currentPlayerMaxHealth - PlayerDamage;
  if (currentMonsterMaxHealth <= 0 && currentPlayerMaxHealth > 0) {
    alert("You Won!");
  } else if (currentPlayerMaxHealth <= 0 && currentMonsterMaxHealth > 0) {
    alert("You Lost!\nTry again...");
  } else if (currentMonsterMaxHealth < 0 && currentPlayerMaxHealth < 0) {
    alert("Match Draw!");
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATTACK") {
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
