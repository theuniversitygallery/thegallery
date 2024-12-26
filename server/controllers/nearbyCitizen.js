// include models
const Citizen = require('../models/citizenModel'); 
const Location = require('../models/locationModel'); 


async function findNearbyCitizens(userId, userCoordinates, maxDistance = 50000) {
  try {
    
    // Step 1: Fetch the user's location
    const user = await Citizen.findById(userId).populate('location');
    if (!user || !user.location) {
      throw new Error('User or user location not found');
    }

    // Step 2: Find nearby locations using $geoNear
    const nearbyLocations = await Location.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: userCoordinates,
          },
          distanceField: 'distance', // Field to store the computed distance
          maxDistance: maxDistance, // Maximum distance in meters
          spherical: true, // Use spherical calculations
        },
      },
    ]);

    // Step 3: Extract nearby location IDs
    console.log('Nearby location:', nearbyLocations);
    const nearbyLocationIds = nearbyLocations.map((location) => location._id);
    // Step 4: Find citizens associated with those locations
    const nearbyCitizens = await Citizen.find({
      location: { $in: nearbyLocationIds },
      _id: { $ne: userId }, // Exclude the user themselves
    }).populate('location'); // Include location details

    console.log('Nearby Citizens:', nearbyCitizens);

        return nearbyCitizens;
    } catch (error) {
        console.error('Error finding nearby citizens:', error);
        throw error; // Rethrow the error for further handling
    }
}

module.exports = { findNearbyCitizens };