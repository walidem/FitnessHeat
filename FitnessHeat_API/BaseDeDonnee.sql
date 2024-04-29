USE FitnessHeat;

CREATE TABLE Coach (
    ID_Coach INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL,
    Prenom VARCHAR(50) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    Matricule VARCHAR(50) UNIQUE NOT NULL,
    Mot_de_passe VARCHAR(100) NOT NULL,
    Telephone VARCHAR(20),
    Date_de_naissance DATE,
    Annee_experience INT,
    Specialisations TEXT
);
 
CREATE TABLE Categorie (
    ID_Categorie INT AUTO_INCREMENT PRIMARY KEY,
    NomCategorie VARCHAR(50) NOT NULL
);
 
CREATE TABLE Programme (
    ID_Programme INT AUTO_INCREMENT PRIMARY KEY,
    Titre VARCHAR(255) NOT NULL,
    Description TEXT,
    Type VARCHAR(255),
    ID_Coach INT NOT NULL,
    ID_Categorie INT NOT NULL,
    FOREIGN KEY (ID_Coach) REFERENCES Coachs(ID_Coach),
    FOREIGN KEY (ID_Categorie) REFERENCES Categories(ID_Categorie)
);
 
CREATE TABLE Utilisateur (
    ID_Utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    Nom VARCHAR(50) NOT NULL,
    Prenom VARCHAR(50) NOT NULL,
    Mot_de_passe VARCHAR(100) NOT NULL,
    NomUtilisateur VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    Telephone VARCHAR(20),
    Date_de_naissance DATE,
    Sexe VARCHAR(10),
    Taille DECIMAL(5,2) NULL,
    Poids DECIMAL(5,2) NULL,
    Objectif TEXT NULL
);
 
CREATE TABLE Journal_de_Nutrition (
    ID_Nutrition INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE NOT NULL,
    Calories INT,
    ID_Utilisateur INT NOT NULL,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateurs(ID_Utilisateur)
);

CREATE TABLE Journal_de_Sommeil (
    ID_Sommeil INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE NOT NULL,
    Duree INT,
    ID_Utilisateur INT NOT NULL,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateurs(ID_Utilisateur)
);

CREATE TABLE Journal_de_Poids (
    ID_Poids INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE NOT NULL,
    Poids DECIMAL(5,2),
    ID_Utilisateur INT NOT NULL,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateurs(ID_Utilisateur)
);
 
 
CREATE TABLE Souscription (
    ID_Souscription INT AUTO_INCREMENT PRIMARY KEY,
    DateSouscription DATE NOT NULL,
    Actif BOOLEAN NOT NULL DEFAULT TRUE,
    ID_Utilisateur INT NOT NULL,
    ID_Programme INT,
    FOREIGN KEY (ID_Utilisateur) REFERENCES Utilisateurs(ID_Utilisateur),
    FOREIGN KEY (ID_Programme) REFERENCES Programmes(ID_Programme)
);