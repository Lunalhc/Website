document.addEventListener('DOMContentLoaded', () => {
    // Handle elements specific to the homepage
    const images = document.querySelectorAll('.image-wrapper');
    const gifImage = document.getElementById('gif-image');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('video');
    const closeVideoButton = document.getElementById('close-video');
    let clickCount = 0;
    const encryptionMethod = document.getElementById('encryption-method');
    const parametersContainer = document.getElementById('parameters-container');
    const plaintextInput = document.getElementById('plaintext');
    const resultContainer = document.getElementById('result-container');
    const resultDisplay = document.getElementById('result'); // Make sure this ID exists in your HTML
    const goButton = document.getElementById('go-button');

    if (gifImage) {
        images.forEach(image => {
            image.addEventListener('mouseover', () => {
                const label = image.querySelector('.image-label');
                label.style.display = 'block';
            });

            image.addEventListener('mouseout', () => {
                const label = image.querySelector('.image-label');
                label.style.display = 'none';
            });

            image.addEventListener('click', () => {
                let url;
                switch (image.id) {
                    case 'concepts':
                        url = 'concepts.html'; 
                        break;
                    case 'flowchart':
                        url = 'flowchart.html'; 
                        break;
                    case 'moreinfo':
                        url = 'https://www.youtube.com/';
                        break;
                }
                window.location.href = url;
            });
        });

        // Handle video pop-up
        gifImage.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 3) {
                videoContainer.style.display = 'flex';
                videoContainer.style.position = 'fixed';
                videoContainer.style.top = '0';
                videoContainer.style.left = '0';
                videoContainer.style.width = '100%';
                videoContainer.style.height = '100%';
                videoContainer.style.justifyContent = 'center';
                videoContainer.style.alignItems = 'center';
                videoContainer.style.zIndex = '1000';
                videoContainer.style.background = 'rgba(0, 0, 0, 0.8)';
                video.play();
                clickCount = 0; // Reset the count after showing the video
            }
        });

        if (closeVideoButton) {
            closeVideoButton.addEventListener('click', () => {
                videoContainer.style.display = 'none';
                video.pause();
                video.currentTime = 0;
            });
        }
    }


//---------------------encryption-----------------------------------------------------------------------------------------------
    
    // Encryption method selection handling
    encryptionMethod.addEventListener('change', () => {
        parametersContainer.innerHTML = ''; // Clear previous inputs
        const method = encryptionMethod.value;
        if (method === 'caesar') {
            parametersContainer.innerHTML = `
                <label for="shift">Shift:</label>
                <input type="number" id="shift" placeholder="Enter shift value">
            `;
            plaintextInput.style.display = 'block';
            goButton.style.display = 'block';
        } else {
            // Placeholder for other methods
            parametersContainer.innerHTML = '<p>Feature under development.</p>';
            plaintextInput.style.display = 'none';
            goButton.style.display = 'none';
        }
    });

    // Encrypt text when "Go" button is clicked
    goButton.addEventListener('click', () => {
        if (encryptionMethod.value === 'caesar') {
            encryptCaesarCipher();
        }
    });

    function encryptCaesarCipher() {
        const shift = parseInt(document.getElementById('shift').value) || 0;
        const plaintext = plaintextInput.value;
        fetch('http://127.0.0.1:5000/encrypt', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ plaintext, shift })
        })
        .then(response => response.json())
        .then(data => {
            resultDisplay.textContent = data.encrypted;
            resultContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


        

    


//-------------------------------concept page-----------------------------------------


    // Concepts page - Hide and show descriptions
    const conceptNames = document.querySelectorAll('.concept-name');
    const conceptDescriptions = document.querySelectorAll('.concept-description')

    // Add click event listeners to concept names
    conceptNames.forEach(name => {
        name.addEventListener('click', () => {
            const description = name.nextElementSibling;
            
            if (description.style.display === 'none' || description.style.display === '') {
                description.style.display = 'block';
            } else {
                description.style.display = 'none';
            }
        });
    });

});
    









