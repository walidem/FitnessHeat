function handleAddProgram() {
    var programType = document.getElementById('programType').value;
    var programTitle = document.getElementById('programTitle').value;
    var programDescription = document.getElementById('programDescription').value;
    var programCategory = document.getElementById('programCategory').value;

    var coachId = localStorage.getItem('userID');

    var programData = {
        Titre: programTitle,
        Description: programDescription,
        Type: programType,
        ID_Coach: parseInt(coachId),
        ID_Categorie: mapCategoryToId(programCategory)
    };

    fetch('http://localhost:3000/api/programmes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout du programme');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Programme ajouté avec succès !");
        document.getElementById('addProgramForm').reset();
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
