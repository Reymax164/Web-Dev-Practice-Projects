function randomizer(minimum, maximum) {
  return Math.floor(Math.random() * ((maximum - minimum) + 1)) + minimum;
}

let previousMood; // tracks the stat value before it changes
let previousHunger;
let previousEnergy;

let energyChange;
let moodChange;
let hungerChange;


export default class Pokemon {
  constructor(name, species) {
    this.name = name;
    this.mood = 75;
    this.hunger = 75;
    this.energy = 75;
    this.species = species;

    if(Pokemon.instance) {
      return Pokemon.instance;
    }
    Pokemon.instance = this;

    console.log(this);   
  }

  static deleteInstance() {
    Pokemon.instance = null;
  }

  // getters
  get getName() {
    return this.name;
  }

  get getMood() {
    return this.mood;
  }

  get getHunger() {
    return this.hunger;
  }

  get getEnergy() {
    return this.energy;
  }

  // setters
  set setName(name) {
    this.name = this.name;
  }

  // stat increasers
  increaseMood(amount) {
    this.mood += amount;
    return this.mood;
  }

  increaseHunger(amount) {
    this.hunger += amount;
    return this.hunger;
  }

  increaseEnergy(amount) {
    this.energy += amount
    return this.energy;
  }

  // stat decreasers
  decreaseMood(amount) {
    this.mood -= amount;
    return this.mood;
  }

  decreaseHunger(amount) {
    this.hunger -= amount;
    return this.hunger;
  }

  decreaseEnergy(amount) {
    this.energy -= amount
    return this.energy;
  }

  limitCheck() {
    // over ate
    if(this.hunger >= 110) {
      console.log(`${this.name} over ate.`);
      this.decreaseMood(randomizer(50, 75));
    }

    if(this.mood > 100) this.mood = 100;
    if(this.hunger > 100) this.hunger = 100;
    if(this.energy > 100) this.energy = 100;
    if(this.mood < 0) this.mood = 0;
    if(this.hunger < 0) this.hunger = 0;
    if(this.energy < 0 && this.energy > -149) this.energy = 0;

    if(this.hunger === 0) {
      console.log(`${this.name} is hungry.`);
      this.decreaseMood(randomizer(30, 50));
    }
    if(this.mood < 0) this.mood = 0;

    if(this.energy < -150) {
      console.log(`${this.name} crashed out of tiredness.`);
      this.sleep();
    }

    moodChange = this.mood - previousMood;
    hungerChange = this.hunger - previousHunger;
    energyChange = this.energy - previousEnergy;

    console.log(`Mood ${moodChange >= 0? "+" : ""}${moodChange}`);
    console.log(`Hunger ${hungerChange >= 0? "+" : ""}${hungerChange}`);
    console.log(`Energy ${energyChange >= 0? "+" : ""}${energyChange}`);
  }

  logUpdatedStats() {
    console.log(`Hunger: ${this.hunger}`);
    console.log(`Mood: ${this.mood}`);
    console.log(`Energy: ${this.energy}`);
  }

  // activity functions
  feed() {
    if(this.hunger >= 100) {
      console.log(`${this.name} is full`);
      return; 
    }
    
    previousMood = this.mood;
    previousHunger = this.hunger;
    previousEnergy = this.energy;

    const outcome = randomizer(1, 3);

    // good
    if (outcome === 1) {
      this.increaseHunger(randomizer(60, 80));
      this.increaseMood(randomizer(31, 50)); 
      console.log(`${this.name} ate a lot.`);
    }
    // okay
    else if (outcome === 2) {
      this.increaseHunger(randomizer(30, 59));
      this.increaseMood(randomizer(10, 30)); 
      console.log(`${this.name} ate.`);
    }
    // bad
    else {
      this.increaseHunger(randomizer(10, 29));
      this.decreaseMood(randomizer(30, 50));
      console.log(`${this.name} didn't liked the food.`);
    }

    this.increaseEnergy(randomizer(10, 30));

    this.limitCheck();
    
  }

  play() {
    if(this.energy <= 0) {
      console.log(`${this.name} has no energy to play.`);
      this.decreaseMood(randomizer(15, 30));
      return;
    }

    previousMood = this.mood;
    previousHunger = this.hunger;
    previousEnergy = this.energy;

    const outcome = randomizer(1, 3);

    if (outcome === 1) {
      console.log(`${this.name} enjoyed playing.`);
      this.increaseMood(randomizer(60, 80));
      this.decreaseEnergy(randomizer(40, 90));
    }
    else if (outcome === 2) {
      console.log(`${this.name} played.`);
      this.increaseMood(randomizer(30, 59)); 
      this.decreaseEnergy(randomizer(50, 75));
    }
    else {
      console.log(`${this.name} didn't enjoy playing.`);
      this.increaseMood(randomizer(10, 29));
      this.decreaseEnergy(50, 80);
    }

    this.decreaseHunger(randomizer(30, 50));

    this.limitCheck();

  }

  sleep() {
    if(this.energy === 100) {
      console.log(`${this.name} is full of energy.`);
      return;
    }

    previousMood = this.mood;
    previousHunger = this.hunger;
    previousEnergy = this.energy;

    const outcome = randomizer(1, 3);

    if (outcome === 1) {
      console.log(`${this.name} had a long sleep.`);
      this.increaseEnergy(randomizer(60, 80)); 
      this.increaseMood(randomizer(10, 30));
      this.decreaseHunger(randomizer(45, 75));
    }
    else if (outcome === 2) {
      console.log(`${this.name} slept.`);
      this.increaseEnergy(randomizer(30, 59));
      this.increaseMood(randomizer(5, 15));
      this.decreaseHunger(randomizer(25, 50));
    }
    else {
      this.increaseEnergy(randomizer(10, 29));
      this.decreaseMood(randomizer(20, 40));
      this.decreaseHunger(randomizer(30, 60));
      console.log(`${this.name} didn't have a good sleep.`);
    }


    // over slept
    if(this.energy >= 110) {
      console.log(`${this.name} over slept.`);
      this.decreaseMood(randomizer(20, 40));
    }

    this.limitCheck();
  }

  get isFainted() {
    // ternary
    return (this.hunger === 0 &&
            this.mood === 0 &&
            this.energy === 0) ?
    true : false;
  }
}