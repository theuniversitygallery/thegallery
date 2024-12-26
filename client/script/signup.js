document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    
    const citizenName = document.getElementById('citizenName').value;
    const passCode = document.getElementById('passCode').value;
    
    // Get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy; // Get accuracy
            
            // document.getElementById('accuracy').value = accuracy; // Set accuracy
            
            alert('something')
            // Prepare the login data
            const loginData = {
                citizenName,
                passCode,
                latitude,
                longitude,
                accuracy:10
            };
            
            // Send the login request
            try {
                const response = await fetch('http://localhost:4500/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(loginData) 
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Login successful:', data);
                    // Redirect to the explore page or handle successful login
                    // window.location.href = '/explore'; // Change this to your explore route
                } else {
                    const errorData = await response.json();
                    console.error('Login failed:', errorData.message);
                    alert('Login failed: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login.');
            }
        }, (error) => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
/*
function getNearbyLocations(latitude, longitude, distanceInKm) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
  
    // Function to calculate a new latitude/longitude given a distance and bearing
    function calculateDestination(lat, lon, brng, dist) {
      const dLat = dist * Math.cos(brng) / earthRadius;
      const dLon = dist * Math.sin(brng) / earthRadius / Math.cos(lat);
      const lat2 = lat + dLat * (180 / Math.PI);
      const lon2 = lon + dLon * (180 / Math.PI);
      return { latitude: lat2, longitude: lon2 };
    }
  
    // Generate 5 locations around the given location, each 10km apart
    const nearbyLocations = [];
    for (let i = 0; i < 5; i++) {
      const bearing = i * 72; // Divide 360 degrees into 5 equal parts
      const nearbyLocation = calculateDestination(latitude, longitude, bearing * Math.PI / 180, distanceInKm);
      nearbyLocations.push(nearbyLocation);
    }
  
    return nearbyLocations;
  }
  
  // Get the user's current location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      // Output the user's current location
      console.log("Your current location:");
      console.log(JSON.stringify({ latitude, longitude }));
  
      // Generate 5 nearby locations
      const nearbyLocations = getNearbyLocations(latitude, longitude, 10);
  
      // Output the nearby locations
      console.log("Nearby locations:");
      for (const location of nearbyLocations) {
        console.log(JSON.stringify(location));
      }
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );*/