document.addEventListener('DOMContentLoaded', function() {
    var programId = new URLSearchParams(window.location.search).get('programId');
    if (programId) {
        loadProgramData(programId);
    }
});

function loadProgramData(programId) {
    fetch(`http://localhost:3000/api/programmes/${programId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Échec du chargement des données du programme');
            }
            return response.json();
        })
        .then(programData => {
            document.getElementById('programType').value = programData.Type || '';
            document.getElementById('programTitle').value = programData.Titre || '';
            document.getElementById('programDescription').value = programData.Description || '';
            document.getElementById('programCategory').value = mapIdToCategoryName(programData.ID_Categorie);
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Impossible de charger les données du programme');
        });
}

function handleUpdateProgram() {
    var programId = new URLSearchParams(window.location.search).get('programId');

    var programType = document.getElementById('programType').value;
    var programTitle = document.getElementById('programTitle').value;
    var programDescription = document.getElementById('programDescription').value;
    var programCategory = document.getElementById('programCategory').value;

    var updatedData = {
        Titre: programTitle,
        Description: programDescription,
        Type: programType,
        ID_Categorie: mapCategoryToId(programCategory)
    };

    fetch(`http://localhost:3000/api/programmes/${programId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du programme');
        }
        return response.json();
    })
    .then(() => {
        alert('Programme mis à jour avec succès');
        window.location.reload();
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}

function mapCategoryToId(categoryName) {
    var categoryMap = {
        'perte_de_poids': 1,
        'vie_equilibree': 2,
        'gain_de_masse': 3
    };
    return categoryMap[categoryName];
}

function mapIdToCategoryName(categoryId) {
    var idMap = {
        1: 'perte_de_poids',
        2: 'vie_equilibree',
        3: 'gain_de_masse'
    };
    return idMap[categoryId] || '';
}
