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