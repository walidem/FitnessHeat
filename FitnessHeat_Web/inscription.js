document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('userRegistrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleUserRegistrationSubmit);
    }
});

function handleUserRegistrationSubmit(event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    var nomUtilisateur = document.getElementById('username').value;
    var nom = document.getElementById('lastname').value;
    var prenom = document.getElementById('firstname').value;
    var email = document.getElementById('email').value;
    var motDePasse = document.getElementById('password').value;
    var confirmMotDePasse = document.getElementById('confirm-password').value;

    // Valider la confirmation du mot de passe
    if (motDePasse !== confirmMotDePasse) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    // Préparer les données pour l'inscription
    var userData = {
        NomUtilisateur: nomUtilisateur,
        Nom: nom,
        Prenom: prenom,
        Email: email,
        Mot_de_passe: motDePasse
    };

    // Envoyer les données à l'API
    fetch('http://localhost:3000/api/utilisateurs/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'inscription');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert("Inscription réussie !");
        window.location.href = 'connexion.html'
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}
