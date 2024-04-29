document.addEventListener('DOMContentLoaded', function() {
    loadCoachProfile();
    var profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleCoachProfileUpdate);
    }
});

function loadCoachProfile() {
    var coachId = localStorage.getItem('userID');
    if (!coachId) {
        console.error('Aucun ID de coach trouvé');
        return;
    }

    fetch(`http://localhost:3000/api/coachs/${coachId}`)
    .then(response => response.json())
    .then(data => {
        const coachData = data;

        document.getElementById('matricule').value = coachData.Matricule || '';
        document.getElementById('firstname').value = coachData.Prenom || '';
        document.getElementById('lastname').value = coachData.Nom || '';
        document.getElementById('email').value = coachData.Email || '';
        document.getElementById('phone').value = coachData.Telephone || '';
        document.getElementById('birthdate').value = formatDate(coachData.Date_de_naissance);
        document.getElementById('experience').value = coachData.Annee_experience || '';
        document.getElementById('specialisations').value = coachData.Specialisations || '';
    })
    .catch(error => console.error('Erreur:', error));
}

function handleCoachProfileUpdate(event) {
    event.preventDefault();

    var coachId = localStorage.getItem('userID');
    if (!coachId) {
        console.error('Aucun ID de coach trouvé');
        return;
    }

    var updatedData = {
        Matricule: document.getElementById('matricule').value,
        Prenom: document.getElementById('firstname').value,
        Nom: document.getElementById('lastname').value,
        Email: document.getElementById('email').value,
        Telephone: document.getElementById('phone').value,
        Date_de_naissance: document.getElementById('birthdate').value,
        Annee_experience: parseInt(document.getElementById('experience').value),
        Specialisations: document.getElementById('specialisations').value
    };

    fetch(`http://localhost:3000/api/coachs/${coachId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du profil du coach');
        }
        return response.json();
    })
    .then(data => {
        alert("Mise à jour du profil du coach réussie !");
        window.location.reload();
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}

function formatDate(dateString) {
    if (!dateString) return '';
    var date = new Date(dateString);
    return date.toISOString().split('T')[0];
}
