const { readFile, writeFile } = require('fs/promises');

class HeroRepository {
  file;

  constructor({ file }) {
    this.file = file;
  }

  async _currentFileContent() {
    const loadData = await readFile(this.file);
    return JSON.parse(loadData);
  }

  async create(hero) {
    const heros = await this._currentFileContent();
    heros.push(hero);
    await writeFile(this.file, JSON.stringify(heros));
    return hero;
  }

  async find() {
    const heros = await this._currentFileContent();
    return heros;
  }

  async findByID(id) {
    const heros = await this._currentFileContent();
    const hero = heros.find((hero) => hero.id === id);
    return hero;
  }
}

module.exports = { HeroRepository };
