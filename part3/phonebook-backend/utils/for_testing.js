const Persons = require('../models/contact');

const initialContact = [
  {
    name: 'Julian',
    number: '088-1251255',
  },
  {
    name: 'Floryn',
    number: '081-1251255',
  },
];

const nonExistingId = async () => {
  await person.save();
  await person.remove();

  return person._id.toString();
};

const personsInDatabase = async () => {
  const persons = await Persons.find({});
  return persons.map((person) => person.toJSON());
};

module.exports = {
  initialContact,
  nonExistingId,
  personsInDatabase,
};
