const path = require('path');

// database
const database = path.resolve(
  __dirname,
  '..',
  '..',
  'database',
  'database.json'
);

// repository
const { HeroRepository } = require('../repositories/HeroRepository');

// services
const { HeroService } = require('../services/HeroService');

function generateInstance() {
  const heroRepository = new HeroRepository({ file: database });

  const heroService = new HeroService({ heroRepository });

  return heroService;
}

module.exports = { generateInstance };
