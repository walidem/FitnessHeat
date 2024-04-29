document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
});

function handleLoginSubmit(event) {
    event.preventDefault();

    var usernameOrMatricule = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var isCoach = determineIfCoach(usernameOrMatricule);
    var loginData = isCoach ? { Matricule: usernameOrMatricule, Mot_de_passe: password } 
                            : { NomUtilisateur: usernameOrMatricule, Mot_de_passe: password };

    var loginUrl = isCoach ? 'http://localhost:3000/api/coachs/loginCoach' 
                            : 'http://localhost:3000/api/utilisateurs/loginUtilisateur';

    fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Échec de la connexion');
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('userType', isCoach ? 'coach' : 'user');
        // Stocker l'ID en fonction du type de compte
        const idToStore = isCoach ? data.data.ID_Coach : data.data.ID_Utilisateur;
        localStorage.setItem('userID', idToStore);
        redirectToHomePage(isCoach ? 'coach' : 'user');
    })
    .catch(error => {
        alert(error.message);
    });
}

function determineIfCoach(usernameOrMatricule) {
    return /^\d+$/.test(usernameOrMatricule);
}

function redirectToHomePage(userType) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    if (userType === 'user') {
        window.location.href = 'accueil_utilisateur.html';
    } else if (userType === 'coach') {
        window.location.href = 'accueil_entraineur.html';
    }
    updateHeaderBasedOnLoginState();
}
