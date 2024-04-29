document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    var profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
});

function loadUserProfile() {
    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    fetch(`http://localhost:3000/api/utilisateurs/${userId}`)
    .then(response => response.json())
    .then(data => {
        const userData = data.data;

        // Remplir le formulaire avec les données
        document.getElementById('username').value = userData.NomUtilisateur || '';
        document.getElementById('firstname').value = userData.Prenom || '';
        document.getElementById('lastname').value = userData.Nom || '';
        document.getElementById('birthdate').value = formatDate(userData.Date_de_naissance);
        document.getElementById('email').value = userData.Email || '';
        document.getElementById('phone').value = userData.Telephone || '';
        document.getElementById('height').value = userData.Taille || '';
        document.getElementById('weight').value = userData.Poids || '';

        // Sélectionner le bouton radio pour le sexe
        if (userData.Sexe) {
            let genderRadioButton = document.querySelector(`input[name="gender"][value="${userData.Sexe}"]`);
            if (genderRadioButton) {
                genderRadioButton.checked = true;
            }
        }
    })
    .catch(error => console.error('Erreur:', error));
}

function handleProfileUpdate(event) {
    event.preventDefault();

    var userId = localStorage.getItem('userID');
    if (!userId) {
        console.error('Aucun ID utilisateur trouvé');
        return;
    }

    var gender = document.querySelector('input[name="gender"]:checked')?.value || null;

    var updatedData = {
        NomUtilisateur: document.getElementById('username').value || null,
        Prenom: document.getElementById('firstname').value || null,
        Nom: document.getElementById('lastname').value || null,
        Date_de_naissance: document.getElementById('birthdate').value || null,
        Email: document.getElementById('email').value || null,
        Telephone: document.getElementById('phone').value || null,
        Sexe: gender,
        Taille: parseFloat(document.getElementById('height').value) || null,
        Poids: parseFloat(document.getElementById('weight').value) || null
    };

    fetch(`http://localhost:3000/api/utilisateurs/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du profil');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Mise à jour du profil réussie !");
        window.location.reload();
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}

function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toISOString().split('T')[0];
}
