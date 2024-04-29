document.addEventListener('DOMContentLoaded', function() {
    const currentDateElem = document.getElementById('currentDate');
    const today = new Date();
    currentDateElem.textContent = today.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    loadUserGoal();
    var dailyProgressForm = document.getElementById('dailyProgress');
    if (dailyProgressForm) {
        dailyProgressForm.addEventListener('submit', handleDailyProgressSubmit);
    }
});

function loadUserGoal() {
    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    fetch(`http://localhost:3000/api/utilisateurs/${userId}`)
    .then(response => response.json())
    .then(data => {
        const userData = data.data;
        if (userData.Objectif) {
            setGoalRadioButton(userData.Objectif);
        }
    })
    .catch(error => console.error('Erreur:', error));
}

function setGoalRadioButton(goal) {
    let radioButtons = document.querySelectorAll('input[name="goal"]');
    for (let radioButton of radioButtons) {
        if (radioButton.value === goal) {
            radioButton.checked = true;
            break;
        }
    }
}

function handleGoalUpdate(event) {
    event.preventDefault();

    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    var selectedGoal = document.querySelector('input[name="goal"]:checked')?.value || null;

    var updatedData = {
        Objectif: selectedGoal
    };

    fetch(`http://localhost:3000/api/utilisateurs/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de l\'objectif');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Objectif mis à jour avec succès !");
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}

function handleDailyProgressSubmit(event) {
    event.preventDefault();
    handleGoalUpdate(event);
    handlePoidsUpdate();
    handleNutritionUpdate();
    handleSommeilUpdate();
}

function handlePoidsUpdate() {
    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    var poids = document.getElementById('weight').value;

    var poidsData = {
        Date: new Date().toISOString().split('T')[0],
        Poids: poids,
        ID_Utilisateur: userId
    };

    // Envoie la nouvelle entrée de poids à l'API
    fetch('http://localhost:3000/api/journalPoids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poidsData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'entrée de poids');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Entrée de poids ajoutée avec succès !");
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}

function handleNutritionUpdate() {
    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    var calories = document.getElementById('calories').value;

    var nutritionData = {
        Date: new Date().toISOString().split('T')[0],
        Calories: calories,
        ID_Utilisateur: userId
    };

    // Envoie la nouvelle entrée de nutrition à l'API
    fetch('http://localhost:3000/api/journalNutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nutritionData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'entrée de nutrition');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Entrée de nutrition ajoutée avec succès !");
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}

function handleSommeilUpdate() {
    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    var sommeil = document.getElementById('sleep').value;

    var sommeilData = {
        Date: new Date().toISOString().split('T')[0],
        Duree: sommeil,
        ID_Utilisateur: userId
    };

    // Envoie la nouvelle entrée de sommeil à l'API
    fetch('http://localhost:3000/api/journalSommeil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sommeilData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'entrée de sommeil');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Entrée de sommeil ajoutée avec succès !");
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}