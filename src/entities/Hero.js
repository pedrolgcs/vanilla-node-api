class Hero {
  id;
  name;
  power;

  constructor({ name, power }) {
    this.id = Math.floor(Math.random() * 1000);
    this.name = name;
    this.power = power;
  }

  isValid() {
    const propertyNames = Object.getOwnPropertyNames(this);
    const invalidAttributes = propertyNames
      .map((property) => (!!this[property] ? null : `${property} is missing`))
      .filter((error) => !!error);

    return {
      valid: invalidAttributes.length === 0,
      error: invalidAttributes,
    };
  }
}

const hero = new Hero({ name: 'Pedro', power: 'Code' });

module.exports = { Hero };
