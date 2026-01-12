export default class PokeAPI {
  constructor() {
    // Singleton Pattern
    if (PokeAPI.instance) {
      return PokeAPI.instance;
    }
    PokeAPI.instance = this;
    
    this.baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    
  }

  async #fetchData(species) {
    try {
      const response = await fetch(`${this.baseUrl}${species}`);

      if (!response.ok) {
        throw new Error(`Could not fetch data for ${species}`);
      }

      const data = await response.json();
      // console.log(data);
      return data;

    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // getSprite
  async getSprite(species) {
    const data = await this.#fetchData(species);
    return data?.sprites?.front_default;
  }

  // getCry
  async getCry(species) {
    const data = await this.#fetchData(species);
    return data?.cries?.latest;
  }
}