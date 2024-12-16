// || connectedCitizen
// || theunigallery
const mongoose = require('mongoose');
Schema = mongoose.Schema; 

const citizenSchema = new Schema({
  citizenName: {
    type: String,
    required: true,
    unique: true
  },
  citizenEmail: {
    type: String,
    required: true,
    unique: true
  },
  hashedPwd: {
    type: String,
    required: true
  },
  location: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Location' 
  },
  status: {type: String, required: true},
  role: {
    Basic:{type: Number,default: 1997},
    Editor: Number,
    Admin: Number
  },
  // refreshToken: String
},{ timestamps: true });

const Citizen = mongoose.model('Citizen', citizenSchema);

module.exports = Citizen;
