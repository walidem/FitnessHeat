document.addEventListener('DOMContentLoaded', function() {
    var trainingPrograms = document.querySelectorAll('.training-program');
    trainingPrograms.forEach(function(program) {
        program.addEventListener('click', function() {
            handleProgramClick(this.id);
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

function handleProgramClick(programId) {
    var isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        // Redirection vers la page du programme si l'utilisateur est connecté
        switch (programId) {
            case 'perteDePoids':
                window.location.href = 'ent_pertedepoids.html';
                break;
            case 'priseDeMasse':
                window.location.href = 'ent_gaindemasse.html';
                break;
            case 'vieEquilibree':
                window.location.href = 'ent_vieequilibree.html';
                break;
        }
    } else {
        // Afficher la fenêtre modale si l'utilisateur n'est pas connecté
        document.getElementById('loginModal').style.display = 'block';
    }
}
