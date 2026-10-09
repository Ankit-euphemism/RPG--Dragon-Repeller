let xp = 0;
let health = 100;
let gold = 100;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let monsterMaxHealth = 0;
let hitStreak = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const locationHeading = document.querySelector("#locationHeading");
const healthMeter = document.querySelector("#healthMeter");
const healthCard = document.querySelector("#healthCard");
const weaponText = document.querySelector("#weaponText");
const weaponMeter = document.querySelector("#weaponMeter");
const weaponMeterFill = document.querySelector("#weaponMeterFill");
const monsterHealthMeter = document.querySelector("#monsterHealthMeter");
const momentumText = document.querySelector("#momentumText");
const momentumMeter = document.querySelector("#momentumMeter");
const momentumMeterFill = document.querySelector("#momentumMeterFill");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. Monsters are nearby."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster falls. You gain XP and find gold."
  },
  {
    name: "lose",
    "button text": ["Play again", "Play again", "Play again"],
    "button functions": [restart, restart, restart],
    text: "Your health reached zero. Try again to free the town."
  },
  { 
    name: "win", 
    "button text": ["Play again", "Play again", "Play again"],
    "button functions": [restart, restart, restart], 
    text: "You defeated the dragon and freed the town. Well done!"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Pick 2 or 8. The game draws 10 numbers from 0 to 10. Match one to win 20 gold. Miss and lose 10 health."
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  const locationLabels = {
    "town square": "Town square",
    store: "Store",
    cave: "Cave",
    fight: "Battle",
    "kill monster": "Victory",
    lose: "Game over",
    win: "Quest complete",
    "easter egg": "Secret game"
  };
  locationHeading.innerText = locationLabels[location.name] || location.name;
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  refreshHud();
}

function refreshHud() {
  const healthPercent = Math.max(0, Math.min(100, health));
  healthMeter.style.width = healthPercent + "%";
  healthCard.classList.toggle("is-low", health <= 25);
  weaponText.innerText = weapons[currentWeapon].name;
  const weaponTier = currentWeapon + 1;
  const weaponPercent = (weaponTier / weapons.length) * 100;
  weaponMeter.setAttribute("aria-valuenow", weaponTier);
  weaponMeter.setAttribute("aria-valuetext", weapons[currentWeapon].name + ", tier " + (currentWeapon + 1) + " of " + weapons.length);
  weaponMeterFill.style.width = weaponPercent + "%";
}

function refreshMonsterMeter() {
  const meter = monsterHealthMeter.parentElement;
  const remaining = Math.max(0, Math.min(monsterMaxHealth, monsterHealth));
  const percent = monsterMaxHealth ? (remaining / monsterMaxHealth) * 100 : 0;
  meter.setAttribute("aria-valuemax", monsterMaxHealth);
  meter.setAttribute("aria-valuenow", remaining);
  meter.setAttribute("aria-valuetext", remaining + " of " + monsterMaxHealth + " health");
  monsterHealthMeter.style.width = percent + "%";
}

function refreshMomentumMeter() {
  const maxStreak = 5;
  const progress = Math.min(hitStreak, maxStreak);
  momentumText.innerText = "Momentum · " + progress + "/" + maxStreak;
  momentumMeter.setAttribute("aria-valuenow", progress);
  momentumMeter.setAttribute("aria-valuetext", progress + " of " + maxStreak + " consecutive successful hits");
  momentumMeterFill.style.width = (progress / maxStreak) * 100 + "%";
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    refreshHud();
  } else {
    text.innerText = "You need 10 gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
      refreshHud();
    } else {
      text.innerText = "You need 30 gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
    refreshHud();
  } else {
    text.innerText = "Keep your last weapon. You need it to fight.";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  hitStreak = 0;
  monsterMaxHealth = monsters[fighting].health;
  monsterHealth = monsterMaxHealth;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  refreshMonsterMeter();
  refreshMomentumMeter();
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    hitStreak = Math.min(hitStreak + 1, 5);
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    hitStreak = 0;
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  refreshHud();
  refreshMonsterMeter();
  refreshMomentumMeter();
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    refreshHud();
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  refreshHud();
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  refreshHud();
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    refreshHud();
    if (health <= 0) {
      lose();
    }
  }
}

refreshHud();
