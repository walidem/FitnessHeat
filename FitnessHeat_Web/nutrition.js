document.addEventListener('DOMContentLoaded', function() {
    var nutritionPrograms = document.querySelectorAll('.nutrition-program');
    nutritionPrograms.forEach(function(program) {
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
        switch (programId) {
            case 'perteDePoidsNutrition':
                window.location.href = 'nut_pertedepoids.html';
                break;
            case 'priseDeMasseNutrition':
                window.location.href = 'nut_gaindemasse.html';
                break;
            case 'vieEquilibreeNutrition':
                window.location.href = 'nut_vieequilibree.html';
                break;
        }
    } else {
        document.getElementById('loginModal').style.display = 'block';
    }
}