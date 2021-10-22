// errors
const { AppError } = require('../errors/Error');

// entity
const { Hero } = require('../entities/Hero');

class HeroService {
  constructor({ heroRepository }) {
    this.heroRepository = heroRepository;
  }

  async create(data) {
    const hero = new Hero(data);

    const { valid, error } = hero.isValid();

    if (!valid) {
      throw new AppError({
        message: 'Attributes not valid',
        error,
        status: 400,
      }).getError();
    }

    return this.heroRepository.create(hero);
  }

  async find() {
    return this.heroRepository.find();
  }

  async findByID(id) {
    return this.heroRepository.findByID(id);
  }
}

module.exports = { HeroService };
