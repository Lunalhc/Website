document.addEventListener('DOMContentLoaded', () => {
    // Handle elements specific to the homepage
    const images = document.querySelectorAll('.image-wrapper');
    const gifImage = document.getElementById('gif-image');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('video');
    const closeVideoButton = document.getElementById('close-video');
    let clickCount = 0;

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


    // Encryption method change handler 
    const encryptionMethod = document.getElementById('encryption-method');
    const parametersContainer = document.getElementById('parameters-container');

    if (encryptionMethod) {
        encryptionMethod.addEventListener('change', updateEncryptionParameters);
    }

    function updateEncryptionParameters() {
        parametersContainer.innerHTML = '';
        switch (encryptionMethod.value) {
            case 'caesar':
                parametersContainer.innerHTML = `
                    <label for="shift">Shift:</label>
                    <input type="number" id="shift" placeholder="Enter shift value">
                `;
                break;
            case 'rsa':
                parametersContainer.innerHTML = `
                    <div class="input-group">
                        <label for="private-key">Private Key:</label>
                        <input type="text" id="private-key" placeholder="Enter private key">
                    </div>
                    <div class="input-group">
                        <label for="public-key">Public Key:</label>
                        <input type="text" id="public-key" placeholder="Enter public key">
                    </div>
                `;
                break;
            case 'aes':
                parametersContainer.innerHTML = `
                    <label for="aes-key">AES Key:</label>
                    <input type="text" id="aes-key" placeholder="Enter AES key">
                `;
                break;
        }
    }
});

function encryptText() {
    // Handle encryption method change
    const encryptionMethod = document.getElementById('encryption-method');
    const parametersContainer = document.getElementById('parameters-container');

    if (encryptionMethod) {
        encryptionMethod.addEventListener('change', () => {
            parametersContainer.innerHTML = '';
            switch (encryptionMethod.value) {
                case 'caesar':
                    parametersContainer.innerHTML = `
                        <label for="shift">Shift:</label>
                        <input type="number" id="shift" placeholder="Enter shift value">
                    `;
                    break;
                case 'rsa':
                    parametersContainer.innerHTML = `
                    <div class="input-group">
                        <label for="private-key">Private Key:</label>
                        <input type="text" id="private-key" placeholder="Enter private key">
                    </div>
                    <div class="input-group">
                        <label for="public-key">Public Key:</label>
                        <input type="text" id="public-key" placeholder="Enter public key">
                    </div>
                
                    `;
                    break;
                case 'aes':
                    parametersContainer.innerHTML = `
                        <label for="aes-key">AES Key:</label>
                        <input type="text" id="aes-key" placeholder="Enter AES key">
                    `;
                    break;
            }
        });
    }

    // Ensure resultContainer is updated with results
    function encryptText() {
        const shift = document.getElementById('shift') ? document.getElementById('shift').value : null;
        const privateKey = document.getElementById('private-key') ? document.getElementById('private-key').value : null;
        const publicKey = document.getElementById('public-key') ? document.getElementById('public-key').value : null;
        const aesKey = document.getElementById('aes-key') ? document.getElementById('aes-key').value : null;
        const plaintext = plaintextInput.value;

        let bodyData = {
            plaintext: plaintext,
            method: encryptionMethod.value,
        };

        if (shift) bodyData.shift = shift;
        if (privateKey && publicKey) {
            bodyData.privateKey = privateKey;
            bodyData.publicKey = publicKey;
        }
        if (aesKey) bodyData.aesKey = aesKey;

        fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = data.encrypted;
            resultContainer.style.display = 'block'; // Show results
        })
        .catch(error => console.error('Error:', error));
    }
    
}

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


    









