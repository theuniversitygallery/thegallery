async function findInternshipsByLocation(longitude, latitude) {
    // Replace with your data storage logic (e.g., MongoDB)
    const internships = await Internship.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          // Adjust the maximum search radius (in kilometers) as needed
          $maxDistance: 100,
        },
      },
    });
  
    return internships;
  }
module.exports =  findInternshipsByLocation;