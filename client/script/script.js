// script.js


const sendDetails = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy; // Get accuracy

            // Set the captured location data into hidden input fields
            document.getElementById('latitude').value = latitude;
            document.getElementById('longitude').value = longitude;
            document.getElementById('accuracy').value = accuracy; // Set accuracy

            // Now you can proceed to log other input fields
            const citizenName = document.getElementById('citizenName').value;
            const citizenEmail = document.getElementById('citizenEmail').value;
            const passCode = document.getElementById('passCode').value;
            const confirmPwd = document.getElementById('confirmPwd').value;
            const status = document.querySelector('input[name="status"]:checked')?.value;

            // Prepare data to send to the server
            const data = {
                citizenName,
                citizenEmail,
                passCode,
                confirmPwd,
                status,
                latitude,
                longitude,
                accuracy
            };

            try {
                // Use Fetch API to send the data to the server
                const response = await fetch('http://localhost:4500/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(data) // Convert data to JSON string
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                console.log('Success:', responseData);
                alert('Sign up successful!');
            } catch (error) {
                console.error('Error:', error);
                alert('Sign up failed. Please try again.');
            }
        }, (error) => {
            console.error('Error fetching location:', error);
            alert('Unable to retrieve your location. Please try again.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
};



document.getElementById('submit-btn').addEventListener('click',sendDetails );