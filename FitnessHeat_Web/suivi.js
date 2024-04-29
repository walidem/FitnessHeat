document.addEventListener('DOMContentLoaded', function() {
    loadProgressData();
    loadUserProgramData();
});

function loadUserProgramData() {
    const userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    // Récupérer les souscriptions de l'utilisateur
    fetch(`http://localhost:3000/api/souscriptions`)
        .then(response => response.json())
        .then(souscriptions => souscriptions.filter(s => s.ID_Utilisateur == userId))
        .then(userSouscriptions => {
            // Récupérer les détails des programmes pour chaque souscription
            return Promise.all(userSouscriptions.map(souscription => 
                fetch(`http://localhost:3000/api/programmes/${souscription.ID_Programme}`)
                    .then(response => response.json())
                    .then(programmeData => ({ ...souscription, programmeData }))
            ));
        })
        .then(souscriptionsWithProgramData => {
            // Afficher les programmes actifs et l'historique
            displayActivePrograms(souscriptionsWithProgramData);
            displayProgramHistory(souscriptionsWithProgramData);
        })
        .catch(error => console.error('Erreur lors du chargement des données de souscription:', error));
}

function displayActivePrograms(souscriptions) {
    const activeProgramsDiv = document.querySelector('.program-box');
    const activeProgramsHtml = souscriptions
        .filter(s => s.Actif)
        .map(s => `<h3>${s.programmeData.Type}</h3><p>${s.programmeData.Titre} - Date de début: ${new Date(s.DateSouscription).toLocaleDateString('fr-FR')}</p>`)
        .join('');

    activeProgramsDiv.innerHTML = `<h2>Programmes Actifs</h2>${activeProgramsHtml}`;
}

function displayProgramHistory(souscriptions) {
    const historyTable = document.querySelector('.program-history table');

    // Supprimez les lignes existantes (sauf l'en-tête du tableau)
    while (historyTable.rows.length > 1) {
        historyTable.deleteRow(1);
    }

    souscriptions
        .filter(s => !s.Actif) // Exclure les programmes actifs
        .forEach(s => {
            const row = historyTable.insertRow();
            row.insertCell(0).innerText = new Date(s.DateSouscription).toLocaleDateString('fr-FR');
            row.insertCell(1).innerText = s.programmeData.Type;
            row.insertCell(2).innerText = s.programmeData.Titre;
        });
}


function loadProgressData() {
    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    Promise.all([
        fetch(`http://localhost:3000/api/journalPoids/user/${userId}`).then(res => res.json()),
        fetch(`http://localhost:3000/api/journalNutrition/user/${userId}`).then(res => res.json()),
        fetch(`http://localhost:3000/api/journalSommeil/user/${userId}`).then(res => res.json())
    ])
    .then(([poidsData, nutritionData, sommeilData]) => {
        var combinedData = combineAndFilterData(poidsData, nutritionData, sommeilData);
        displayProgressData(combinedData);
    })
    .catch(error => console.error('Erreur lors du chargement des données:', error));
}

function combineAndFilterData(poidsData, nutritionData, sommeilData) {
    var combinedData = {};

    [poidsData, nutritionData, sommeilData].forEach((dataSet, index) => {
        dataSet.forEach(entry => {
            var date = entry.Date.split('T')[0];
            if (!combinedData[date]) {
                combinedData[date] = { lastPoidsId: 0, lastNutritionId: 0, lastSommeilId: 0 };
            }
            if (index === 0 && entry.ID_Poids > combinedData[date].lastPoidsId) {
                combinedData[date].poids = entry.Poids;
                combinedData[date].lastPoidsId = entry.ID_Poids;
            } else if (index === 1 && entry.ID_Nutrition > combinedData[date].lastNutritionId) {
                combinedData[date].calories = entry.Calories;
                combinedData[date].lastNutritionId = entry.ID_Nutrition;
            } else if (index === 2 && entry.ID_Sommeil > combinedData[date].lastSommeilId) {
                combinedData[date].sommeil = entry.Duree;
                combinedData[date].lastSommeilId = entry.ID_Sommeil;
            }
        });
    });

    return Object.entries(combinedData).sort((a, b) => new Date(b[0]) - new Date(a[0]));
}

function displayProgressData(data) {
    var progressTable = document.querySelector('.progress-tracking table');

    // Supprimez les lignes existantes (sauf l'en-tête du tableau)
    while (progressTable.rows.length > 1) {
        progressTable.deleteRow(1);
    }

    data.forEach(([date, { poids, calories, sommeil }]) => {
        var row = progressTable.insertRow();
        row.insertCell(0).innerText = new Date(date).toLocaleDateString('fr-FR');
        row.insertCell(1).innerText = poids ? `${poids} Kg` : 'N/A';
        row.insertCell(2).innerText = calories ? `${calories} Kcal` : 'N/A';
        row.insertCell(3).innerText = sommeil ? `${sommeil} Heures` : 'N/A';
    });
}
