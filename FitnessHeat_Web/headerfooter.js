// Charger le header et ajuster en fonction de l'état de connexion
fetch("header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;
    updateHeaderBasedOnLoginState();
  });

// Charger le footer
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// Fonction pour mettre à jour le header en fonction de l'état de connexion
function updateHeaderBasedOnLoginState() {
  var isLoggedIn = localStorage.getItem('isLoggedIn');
  var userType = localStorage.getItem('userType');
  var profileLink = document.getElementById("profileLink");

  if (isLoggedIn === 'true') {
      document.getElementById("login").style.display = "none";
      document.getElementById("signup").style.display = "none";
      profileLink.style.display = "inline-block";
      document.getElementById("logoutLink").style.display = "inline-block";

      // Gérer la visibilité du lien du tableau de bord et le lien de profil en fonction du type d'utilisateur
      if (userType === 'coach') {
          document.getElementById("dashboardLink").style.display = "none";
          profileLink.href = "profil-entraineur.html";
      } else { // 'user'
          document.getElementById("dashboardLink").style.display = "inline-block";
          profileLink.href = "profil.html";
      }

      // Ajouter un gestionnaire d'événements pour la déconnexion
      document.getElementById("logoutLink").addEventListener('click', function(event){
          event.preventDefault();
          logout();
      });
  } else {
      document.getElementById("dashboardLink").style.display = "none";
      document.getElementById("login").style.display = "inline-block";
      document.getElementById("signup").style.display = "inline-block";
      profileLink.style.display = "none";
      document.getElementById("logoutLink").style.display = "none";
  }
}

// Fonction de déconnexion
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userType");
  window.location.href = "index.html";
}

function handleLogoClick() {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  var userType = localStorage.getItem("userType");

  if (isLoggedIn === 'true') {
    if (userType === "coach") {
      window.location.href = "accueil_entraineur.html";
    } else {
      window.location.href = "accueil_utilisateur.html";
    }
  } else {
    window.location.href = "index.html";
  }
}

// Indiquer que le header est chargé
window.headerLoaded = true;
