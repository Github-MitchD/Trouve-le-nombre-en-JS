// on selectionne les éléments
let input = document.getElementById('prix');
let error = document.querySelector('small');
let formulaire = document.getElementById('formulaire');
let boutonDeviner = document.querySelector('button[type="submit"]');
let instructions = document.querySelector('#instructions');

// on cache le message d'erreur
error.style.display = 'none';

// on génère un nombre aléatoire & on déclare nos variables utiles
let nbrAleatoire = Math.floor(Math.random() * 1001);
let nbrCoups = 0;
let nbrChoisi;

// on verifie que l'utilisateur donne bien un nombre
input.addEventListener('keyup', () => {
    // si ce n'est pas un nombre, on affiche le message d'erreur
    if (isNaN(input.value)){
        error.style.display = 'inline';        
    } else {
        // si c'est un nombre, on le cache
        error.style.display = 'none';
    }
});

// fonction qui vérifier les valeurs insérées dans l'input
// & affiche les résultats à l'utilisateur
function verifInput(value){

    let addResult = document.createElement('div');

    if (value < nbrAleatoire) {
        addResult.textContent = '#'+ nbrCoups + ' Vous avez choisi '+ value +' - Le nombre est plus grand !';
        addResult.className = "instruction plus";
    }
    else if(value > nbrAleatoire){
        addResult.textContent = '#'+ nbrCoups + ' Vous avez choisi '+ value + ' - Le nombre est plus petit !';
        addResult.className = "instruction moins";
    }
    else {        
        addResult.textContent = '#'+ nbrCoups + ' Bravo, '+ value + ' était le nombre à trouver !';
        addResult.className = "instruction fini";
        input.disabled = true;
        transformerBoutonEnRecommencer();
    };

    instructions.prepend(addResult);
};

// fonction pour transformer le bouton "Deviner" en bouton "Recommencer"
function transformerBoutonEnRecommencer() {
    boutonDeviner.textContent = 'Recommencer';
    boutonDeviner.removeEventListener('click', verifierNombre);
    boutonDeviner.addEventListener('click', recommencerJeu);
}

// fonction pour recommencer le jeu
function recommencerJeu(event) {
    event.preventDefault();
    nbrAleatoire = Math.floor(Math.random() * 1001);
    nbrCoups = 0;
    input.disabled = false;
    input.value = '';
    instructions.innerHTML = '';
    error.style.display = 'none';
    boutonDeviner.textContent = 'Deviner';
    boutonDeviner.removeEventListener('click', recommencerJeu);
    boutonDeviner.addEventListener('click', verifierNombre);
}

// fonction pour vérifier le nombre
function verifierNombre(event) {
    event.preventDefault();
    if (isNaN(input.value) || input.value == "") {
        input.style.borderColor = 'red';
        error.style.display = 'inline';
        
    } else if (input.value < 0){
        input.style.borderColor = 'red';
        error.style.display = 'none';
        
    } else if (input.value > 1000){
        input.style.borderColor = 'red';
        error.style.display = 'none';
        
    } else {
        nbrCoups++;
        input.style.borderColor = 'silver';
        error.style.display = 'none';
        nbrChoisi = input.value;
        verifInput(nbrChoisi);
        input.value = '';
    }
}

// actions à l'envoi du formulaire
formulaire.addEventListener('submit', verifierNombre);