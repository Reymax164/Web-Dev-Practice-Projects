function randomizer(minimum, maximum) {
  return Math.floor(Math.random() * ((maximum - minimum) + 1)) + minimum;
}

let previousValue; // tracks the stat value before it changes

export default class Pokemon {
  constructor(name, species) {
    this.name = name;
    this.mood = 100;
    this.hunger = 100;
    this.energy = 100;
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

  // activity functions
  feed() {
    if(this.hunger >= 100) {
      console.log(`${this.name} is full`);
      return; 
    }
    
    previousValue = this.hunger;
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
      console.log(`${this.name} didn't have appetite.`);
    }
    
    console.log(`Hunger +${this.hunger - previousValue}`);

    if(this.hunger > 100) this.hunger = 100;

    if(this.mood > 100) this.mood = 100;
    
    this.increaseEnergy(randomizer(10, 30));
    if(this.energy > 100) this.energy = 100;

    console.log(`Hunger: ${this.hunger}`);
    console.log(`Mood: ${this.mood}`);
    console.log(`Energy: ${this.energy}`);
  }

  play() {
    if(this.energy <= 0) {
      console.log(`${this.name} has no energy to play.`);
      return;
    }

    previousValue = this.mood;
    const outcome = randomizer(1, 3);

    if (outcome === 1) {
      this.increaseMood(randomizer(60, 80));
      this.decreaseEnergy(40, 100);
      console.log(`${this.name} enjoyed playing.`);
    }
    else if (outcome === 2) {
      this.increaseMood(randomizer(30, 59)); 
      this.decreaseEnergy(50, 75);
      console.log(`${this.name} played.`);
    }
    else {
      this.increaseMood(randomizer(10, 29));
      this.decreaseEnergy(50, 80);
      console.log(`${this.name} didn't enjoy playing.`);
    }

    console.log(`Mood +${this.mood - previousValue}`);

    if(this.mood > 100) this.mood = 100;

    if(this.energy < 0) this.energy = 0;

    this.decreaseHunger(randomizer(30, 50)); 
    if(this.hunger < 0) this.hunger = 0;

    console.log(`Mood: ${this.mood}`);
    console.log(`Hunger: ${this.hunger}`);
    console.log(`Energy: ${this.energy}`);

    previousValue = 0;
  }

  sleep() {
    if(this.energy === 100) {
      console.log(`${this.name} is full of energy.`);
      return;
    }

    previousValue = this.energy;
    const outcome = randomizer(1, 3);

    if (outcome === 1) {
      this.increaseEnergy(randomizer(60, 80)); 
      console.log(`${this.name} had a good sleep.`);
    }
    else if (outcome === 2) {
      this.increaseEnergy(randomizer(30, 59)); 
      console.log(`${this.name} slept.`);
    }
    else {
      this.increaseEnergy(randomizer(10, 29));
      this.decreaseMood(randomizer(20, 40));
      console.log(`${this.name} didn't have a good sleep.`);
    }
    
    console.log(`Energy +${this.energy - previousValue}`);

    if(this.energy > 100) this.energy = 100;

    this.decreaseHunger(randomizer(50, 80));  
    this.increaseMood(randomizer(10, 30)); 

    if(this.hunger < 0) this.hunger = 0;
    if(this.mood > 100) this.mood = 100;

    console.log(`Energy: ${this.energy}`);
    console.log(`Mood: ${this.mood}`);
    console.log(`Hunger: ${this.hunger}`);

    previousValue = 0;
  }

  get isFainted() {
    // ternary
    return (this.hunger === 0 &&
            this.mood === 0 &&
            this.energy === 0) ?
    true : false;
  }
}

// Pokemon classes
// export class Treecko extends Pokemon {
//   constructor(name) {
//       super(name);
//       // console.log(this);  
//   }
// }

// export class Mudkip extends Pokemon {
//   constructor(name) {
//       super(name);
//       // console.log(this);
//   }
// }

// export class Torchic extends Pokemon {
//   constructor(name) {
//       super(name);
//       // console.log(this);
//   }
// }