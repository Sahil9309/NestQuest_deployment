const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  photos: [{
    type: String,
    get: (url) => url.startsWith('http') ? url : `http://localhost:4000/uploads/${url}`
  }],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  maxPeople: Number,
  price: Number,
}, {
  toJSON: { getters: true }
});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;