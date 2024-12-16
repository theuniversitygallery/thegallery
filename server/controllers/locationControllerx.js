const Location = require('../models/locationModel');
// this get the user live location and fetch data from 
const getNearbyLocations = async (req, res) => {

    const { longitude, latitude } = req.query;

    if (!longitude || !latitude) {
        return res.status(400).json({ error: 'Longitude and latitude are required' });
    }

    try {
        const nearbyLocations = await Location.find({
            coordinates: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: 10000 // Distance in meters
                }
            }
        });
        res.json(nearbyLocations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getNearbyLocations;