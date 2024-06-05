document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-wrapper');
    const gifImage = document.getElementById('gif-image');
    const videoContainer = document.getElementById('video-container');
    const video = document.getElementById('video');
    const closeVideoButton = document.getElementById('close-video');
    let clickCount = 0;


    // when the cursor hover on tbe icon
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
                    url = 'https://www.youtube.com/'; // I will put the correct link here in the future
                    break;
                case 'moreinfo':
                    url = 'https://www.youtube.com/'; // I will put the correct link here in the future
                    break;
            }
            window.location.href = url;
        });
    });

    // when the user clicks on the gif image 3 times
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
            video.removeAttribute('muted');
            video.play();
            clickCount = 0; // Reset the count after showing the video
        }
    });
    

    // the button to close the video window
    closeVideoButton.addEventListener('click', () => {
        videoContainer.style.display = 'none';
        video.pause();
        video.currentTime = 0;
    });
});
