function updateProgramButtons() {
    const userType = localStorage.getItem('userType');
    const programContainers = document.querySelectorAll('.programs-container');

    programContainers.forEach(container => {
        container.querySelectorAll('.program-box').forEach(box => {
            const programId = box.getAttribute('data-program-id');
            const programType = box.getAttribute('data-program-type');
            const programName = box.querySelector('h2').textContent;
            const followButton = box.querySelector('.follow-button');
            const downloadButton = box.querySelector('.download-button');

            if (userType === 'coach') {
                updateButton(followButton, 'Modifier', 'modify-button', () => {
                    modifyProgram(programId);
                });
                updateButton(downloadButton, 'Supprimer', 'delete-button', () => {
                    if (confirm(`Voulez-vous vraiment supprimer le programme "${programName}"?`)) {
                        deleteProgram(programId, box);
                    }
                });
            } else {
                followButton.addEventListener('click', () => handleFollowButton(programId, programType));
            }
            if (downloadButton) {
                const pdfPath = getPdfPath(box);
                downloadButton.addEventListener('click', () => downloadPdf(pdfPath));
            }
        });
    });
}

function updateButton(button, newText, newClass, onClickAction) {
    if (button) {
        button.textContent = newText;
        button.className = newClass;
        button.onclick = onClickAction;
    }
}

function modifyProgram(id) {
    window.location.href = `modifprog.html?programId=${id}`;
}

function deleteProgram(programId, programBox) {
    fetch(`http://localhost:3000/api/programmes/${programId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du programme');
        }
        programBox.remove();
        alert('Programme supprimé avec succès');
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert(error.message);
    });
}

function handleFollowButton(programId) {
    const userId = localStorage.getItem('userID');

    // Récupérer les informations du programme à suivre
    fetch(`http://localhost:3000/api/programmes/${programId}`)
        .then(response => response.json())
        .then(programData => {
            const programType = programData.Type;

            // Récupérer toutes les souscriptions de l'utilisateur
            fetch(`http://localhost:3000/api/souscriptions`)
                .then(response => response.json())
                .then(allSouscriptions => {
                    const userSouscriptions = allSouscriptions.filter(s => s.ID_Utilisateur == userId);

                    // Recherche de l'ancienne souscription active du même type
                    return Promise.all(userSouscriptions.map(souscription => 
                        fetch(`http://localhost:3000/api/programmes/${souscription.ID_Programme}`)
                            .then(response => response.json())
                            .then(program => {
                                if (program.Type === programType && souscription.Actif) {
                                    // Mise à jour de la souscription active
                                    return fetch(`http://localhost:3000/api/souscriptions/${souscription.ID_Souscription}`, {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ Actif: false })
                                    });
                                }
                            })
                    ));
                })
                .then(() => {
                    // Créer une nouvelle souscription
                    return createNewSubscription(userId, programId);
                })
                .then(response => response.json())
                .then(newSouscription => {
                    console.log('Nouvelle souscription:', newSouscription);
                    alert("Souscription au programme réussie !");
                })
                .catch(error => console.error('Erreur:', error));
        })
        .catch(error => console.error('Erreur lors de la récupération des informations du programme:', error));
}

function createNewSubscription(userId, programId) {
    return fetch('http://localhost:3000/api/souscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            DateSouscription: new Date().toISOString(),
            Actif: true,
            ID_Utilisateur: userId,
            ID_Programme: programId
        })
    });
}

function getPdfPath(box) {
    const programName = box.querySelector('h2').textContent.trim();
    const programType = box.getAttribute('data-program-type');

    let pdfSubFolder;
    if (programType === 'Entrainement') {
        switch (programName) {
            case 'Mass Maximizer':
                pdfSubFolder = 'ent_gaindemasse/MassMaximizer.pdf';
                break;
            case 'Power Build':
                pdfSubFolder = 'ent_gaindemasse/PowerBuild.pdf';
                break;
            case 'Poids Plume en Action':
                pdfSubFolder = 'ent_pertedepoids/PoidsPlumeEnAction.pdf';
                break;
            case 'Silhouette Sereine':
                pdfSubFolder = 'ent_pertedepoids/SilhouetteSereine.pdf';
                break;
            case 'Balance & Bravoure':
                pdfSubFolder = 'ent_vieequilibree/Balance&Bravoure.pdf';
                break;
            case 'Harmonie Hybride':
                pdfSubFolder = 'ent_vieequilibree/HarmonieHybride.pdf';
                break;        
        }
    } else if (programType === 'Nutrition') {
        switch (programName) {
            case 'Mass Maximizer':
                pdfSubFolder = 'nut_gaindemasse/MassMaximizer.pdf';
                break;
            case 'Poids Plume en Action':
                pdfSubFolder = 'nut_pertedepoids/PoidsPlumeEnAction.pdf';
                break;
            case 'Balance & Bravoure':
                pdfSubFolder = 'nut_vieequilibree/Balance&Bravoure.pdf';
                break;
        }
    }

    return `pdfs/${pdfSubFolder}`;
}

function downloadPdf(pdfPath) {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = pdfPath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
