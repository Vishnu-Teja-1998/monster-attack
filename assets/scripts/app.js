const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

function getMaxLifeValues() {
  const enteredValue = prompt("Maximum Life for you and the monster", "100");
  const parsedValue = parseInt(enteredValue);
  if (isNaN(parsedValue) || parsedValue < 0) {
    throw { message: "Invalid user Input, not a Number" };
  }
}

try {
  let choosenMaxHealth = getMaxLifeValues();
} catch (error) {
  console.log(error);
  choosenMaxHealth = 100;
  alert("You entered something wrong, degault value of 100 was used.");
}

let currentMonsterMaxHealth = choosenMaxHealth;
let currentPlayerMaxHealth = choosenMaxHealth;
let hasBonusLife = true;

adjustHealthBars(choosenMaxHealth);

let battleLog = [];

function writeToLog(evt, val, monsterHealth, playerHealth) {
  //evt = event, val = value
  let logEntry;

  switch (evt) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry = {
        event: evt,
        value: val,
        target: "MONSTER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry = {
        event: evt,
        value: val,
        target: "MONSTER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry = {
        event: evt,
        value: val,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: evt,
        value: val,
        target: "PLAYER",
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: evt,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    default:
      logentry = {};
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterMaxHealth = choosenMaxHealth;
  currentPlayerMaxHealth = choosenMaxHealth;
  resetGame(choosenMaxHealth);
}

function endRound() {
  const initalPlayerHealth = currentPlayerMaxHealth;
  const PlayerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerMaxHealth = currentPlayerMaxHealth - PlayerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    PlayerDamage,
    currentMonsterMaxHealth,
    currentPlayerMaxHealth
  );
  if (currentPlayerMaxHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerMaxHealth = initalPlayerHealth;
    setPlayerHealth(initalPlayerHealth);
    alert("Youu retained by using extra Life.");
  }
  if (currentMonsterMaxHealth <= 0 && currentPlayerMaxHealth > 0) {
    alert("You Won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentMonsterMaxHealth,
      currentPlayerMaxHealth
    );
  } else if (currentPlayerMaxHealth <= 0 && currentMonsterMaxHealth > 0) {
    alert("You Lost!\nTry again...");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON",
      currentMonsterMaxHealth,
      currentPlayerMaxHealth
    );
  } else if (currentMonsterMaxHealth < 0 && currentPlayerMaxHealth < 0) {
    alert("Match Draw!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "A DRAW",
      currentMonsterMaxHealth,
      currentPlayerMaxHealth
    );
  }

  if (currentMonsterMaxHealth < 0 || currentPlayerMaxHealth < 0) {
    reset();
  }
}

function attackMonster(mode) {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterMaxHealth = currentMonsterMaxHealth - damage;
  writeToLog(logEvent, damage, currentMonsterMaxHealth, currentPlayerMaxHealth);
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
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    HEAL_VALUE,
    currentMonsterMaxHealth,
    currentPlayerMaxHealth
  );
  endRound();
}

function printLogHandler() {
  //
  //FOR LOOP
  //   for (let i = 0; i < battleLog.length; i++) {
  //     console.log(battleLog[i]);
  //   }
  //
  //FOR-OF LOOP--> Here index is not accesed for that we need to create one extra variable for accessingg index
  let i = 0;
  for (const logEntry of battleLog) {
    for (const key in logEntry) {
      console.log(`#${i}__${key}==>${logEntry[key]}`);
    }
    i++;
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
