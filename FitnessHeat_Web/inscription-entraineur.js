document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('coachRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleCoachRegistrationSubmit);
    }
});

function handleCoachRegistrationSubmit(event) {
    event.preventDefault();

    var matricule = document.getElementById('matricule').value;
    var nom = document.getElementById('lastname').value;
    var prenom = document.getElementById('firstname').value;
    var email = document.getElementById('email').value;
    var motDePasse = document.getElementById('password').value;
    var confirmMotDePasse = document.getElementById('confirm-password').value;

    if (motDePasse !== confirmMotDePasse) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    var coachData = {
        Matricule: matricule,
        Nom: nom,
        Prenom: prenom,
        Email: email,
        Mot_de_passe: motDePasse
    };

    fetch('http://localhost:3000/api/coachs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(coachData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription du coach');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Inscription du coach réussie !");
        window.location.href = 'connexion.html';
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}
