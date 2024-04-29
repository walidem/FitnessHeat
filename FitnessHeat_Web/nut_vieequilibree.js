document.addEventListener('DOMContentLoaded', function() {
    loadBalancedLifeNutritionPrograms();
});

function loadBalancedLifeNutritionPrograms() {
    fetch('http://localhost:3000/api/programmes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Échec du chargement des programmes');
            }
            return response.json();
        })
        .then(programs => {
            const container = document.querySelector('.programs-container');
            programs.forEach(program => {
                if (program.Type === 'Nutrition' && program.ID_Categorie === mapCategoryNameToId('vie_equilibree')) {
                    const programBox = createProgramBox(program);
                    container.appendChild(programBox);
                }
            });
            updateProgramButtons(); 
        })
        .catch(error => console.error('Erreur:', error));
}

function createProgramBox(program) {
    const box = document.createElement('div');
    box.className = 'program-box';
    box.setAttribute('data-program-id', program.ID_Programme);
    box.setAttribute('data-program-type', program.Type);

    const title = document.createElement('h2');
    title.textContent = program.Titre;

    const description = document.createElement('p');
    description.textContent = program.Description;

    const followButton = document.createElement('button');
    followButton.className = 'follow-button';
    followButton.textContent = 'Suivre';

    const downloadButton = document.createElement('button');
    downloadButton.className = 'download-button';
    downloadButton.textContent = 'Télécharger';

    box.appendChild(title);
    box.appendChild(description);
    box.appendChild(followButton);
    box.appendChild(downloadButton);

    return box;
}


function mapCategoryNameToId(categoryName) {
    const categoryMap = {
        'perte_de_poids': 1,
        'vie_equilibree': 2,
        'gain_de_masse': 3
    };
    return categoryMap[categoryName];
}
