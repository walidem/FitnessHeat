document.addEventListener('DOMContentLoaded', function() {
    var dashboardSections = document.querySelectorAll('.dashboard-section');
    dashboardSections.forEach(function(section) {
        section.addEventListener('click', function() {
            handleDashboardClick(this.id);
        });
    });

    document.getElementById('goToLogin').onclick = function() {
        window.location.href = 'connexion.html';
    };
    document.getElementById('goToSignup').onclick = function() {
        window.location.href = 'inscription.html';
    };

    window.onclick = function(event) {
        if (event.target.className === "modal") {
            document.getElementById('loginModal').style.display = 'none';
        }
    };
});

function handleDashboardClick(sectionId) {
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
    // Redirection vers la page du programme si l'utilisateur est connecté
    switch (sectionId) {
        case 'progressionQuotidienne':
            window.location.href = 'progres.html';
            break;
        case 'journalDeSuivi':
            window.location.href = 'suivi.html';
            break;
        }
    } else {
         // Afficher la fenêtre modale si l'utilisateur n'est pas connecté
         document.getElementById('loginModal').style.display = 'block';
    }
}
