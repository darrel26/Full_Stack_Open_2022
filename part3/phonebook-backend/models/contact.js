require('dotenv').config();

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (phoneNum) {
        return /^\d{2,3}-\d{5,}/.test(phoneNum);
      },
      error: (props) => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

contactSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Contact', contactSchema);
