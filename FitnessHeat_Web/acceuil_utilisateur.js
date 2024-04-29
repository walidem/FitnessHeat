document.addEventListener('DOMContentLoaded', function() {
    loadLatestData();
    loadUserActiveProgramData();
});

function loadLatestData() {
    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    Promise.all([
        fetch(`http://localhost:3000/api/journalPoids/user/${userId}`).then(res => res.json()),
        fetch(`http://localhost:3000/api/journalNutrition/user/${userId}`).then(res => res.json()),
        fetch(`http://localhost:3000/api/journalSommeil/user/${userId}`).then(res => res.json()),
        fetch(`http://localhost:3000/api/utilisateurs/${userId}`).then(res => res.json())
    ])
    .then(([poidsData, nutritionData, sommeilData, userData]) => {
        updateHomePage(poidsData, nutritionData, sommeilData, userData.data);
    })
    .catch(error => console.error('Erreur lors du chargement des données:', error));
}

function updateHomePage(poidsData, nutritionData, sommeilData, userData) {
    var latestPoids = getLastEntry(poidsData).Poids;
    var latestNutrition = getLastEntry(nutritionData).Calories;
    var latestSommeil = getLastEntry(sommeilData).Duree;

    document.querySelector('.calorie-box p').textContent = latestNutrition ? `${latestNutrition} kcal` : 'N/A';
    document.querySelector('.sleep-box p').textContent = latestSommeil ? `${latestSommeil} heures` : 'N/A';
    document.querySelector('.weight-box p').textContent = latestPoids ? `${latestPoids} kg` : 'N/A';
    document.querySelector('.goal-box p').textContent = userData.Objectif || 'N/A';
}

function getLastEntry(dataArray) {
    return dataArray.length > 0 ? dataArray[dataArray.length - 1] : {};
}

function loadUserActiveProgramData() {
    const userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    fetch(`http://localhost:3000/api/souscriptions`)
        .then(response => response.json())
        .then(souscriptions => souscriptions.filter(s => s.ID_Utilisateur == userId && s.Actif))
        .then(activeSouscriptions => {
            return Promise.all(activeSouscriptions.map(souscription => 
                fetch(`http://localhost:3000/api/programmes/${souscription.ID_Programme}`)
                    .then(response => response.json())
                    .then(programmeData => ({ ...souscription, programmeData }))
            ));
        })
        .then(activeProgramsData => {
            displayActiveProgramsOnHomePage(activeProgramsData);
        })
        .catch(error => console.error('Erreur lors du chargement des données de souscription:', error));
}

function displayActiveProgramsOnHomePage(activeProgramsData) {
    const programBox = document.querySelector('.box.program-box');
    const trainingProgram = activeProgramsData.find(p => p.programmeData.Type === 'Entrainement');
    const nutritionProgram = activeProgramsData.find(p => p.programmeData.Type === 'Nutrition');

    programBox.innerHTML = '<h3>Programme d\'entraînement</h3>' +
                           `<p>${trainingProgram ? trainingProgram.programmeData.Titre : 'Aucun'}</p>` +
                           '<h3>Programme de nutrition</h3>' +
                           `<p>${nutritionProgram ? nutritionProgram.programmeData.Titre : 'Aucun'}</p>`;
}
