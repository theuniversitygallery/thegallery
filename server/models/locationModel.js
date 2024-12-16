// models/location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],  // only 'Point' type is allowed
            required: true 
        },
        coordinates: { 
            type: [Number], // [longitude, latitude]
            required: true 
        } 
    },
    accuracy: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a geospatial index on the location field
locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;