
document.addEventListener('DOMContentLoaded', () => {

const conceptNames = document.querySelectorAll('.concept-name');
if (conceptNames.length > 0) {
    setupConceptPageListeners(conceptNames);
}

function setupConceptPageListeners(conceptNames) {
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
}
});