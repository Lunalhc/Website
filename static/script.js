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

    const decryptionMethod = document.getElementById('decryption-method');
    const decryptionParametersContainer = document.getElementById('decryption-parameters-container');
    const ciphertextInput = document.getElementById('ciphertext');
    const decryptionResultContainer = document.getElementById('decryption-result-container');
    const decryptButton = document.getElementById('decrypt-button');

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
                        window.location.href = '/concepts';
                        break;
                    case 'flowchart':
                        url = 'flowchart.html'; 
                        window.location.href = '/flowchart';
                        break;
                    case 'moreinfo':
                        url = 'https://www.youtube.com/';
                        break;
                }
                
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


//---------------------decryption-----------------------------------------------
        
    decryptionMethod.addEventListener('change', () => {
        decryptionParametersContainer.innerHTML = '';
        ciphertextInput.style.display = 'none';
        decryptButton.style.display = 'none';

        if (decryptionMethod.value === 'caesar') {
            decryptionParametersContainer.innerHTML = `
                <label for="shift">Shift:</label>
                <input type="number" id="decrypt-shift" placeholder="Enter shift value">
            `;
            ciphertextInput.style.display = 'block';
            decryptButton.style.display = 'block';
        }
    });
    decryptButton.addEventListener('click', () => {
        const shift = parseInt(document.getElementById('decrypt-shift').value);
        const ciphertext = ciphertextInput.value;

        // Adjust the path if necessary
        fetch('/decrypt', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                ciphertext: ciphertext,
                shift: shift
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('decryption-result').textContent = data.decrypted;
            decryptionResultContainer.style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
    });
    
//------------------------------------------------------------------------------------------------------------------------------------------
const crackButton = document.getElementById('crack-button');
    const cipherTextInput = document.getElementById('cipher-text');
    const crackerResultsDisplay = document.getElementById('cracker-results');
    const crackerResultsContainer = document.getElementById('cracker-results-container');

    // Event listener for the Crack button
    crackButton.addEventListener('click', () => {
        const cipherText = cipherTextInput.value;
        fetch('/crack', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ cipher_text: cipherText })
        })
        .then(response => response.json())
        .then(data => {
            const formattedResults = data.map(d => `Shift: ${d.shift}, Decoded: ${d.decoded}, Words: ${d.word_count}`).join('\n');
            crackerResultsDisplay.textContent = formattedResults;
            crackerResultsContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            crackerResultsDisplay.textContent = 'Error cracking the cipher text.';
            crackerResultsContainer.style.display = 'block';
        });
    });




});

    









