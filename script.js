// on selectionne les éléments
let input = document.getElementById('prix');
let error = document.querySelector('small');
let formulaire = document.getElementById('formulaire');

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
    let instructions = document.querySelector('#instructions');

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
    };

    instructions.prepend(addResult);
};

// actions à l'envoi du formulaire
formulaire.addEventListener('submit', (event) => {    
    if (isNaN(input.value) || input.value == "") {
        input.style.borderColor = 'red';
        error.style.display = 'inline';

    } else if (input.value < 0){
        input.style.borderColor = 'red';
        error.style.display = 'none';

    } else if (input.value > 1000){
        input.style.borderColor = 'red';
        error.style.display = 'none';

    }
    else {        
        nbrCoups++;
        nbrChoisi = input.value;        
        input.style.borderColor = 'silver';
        input.value = "";

        verifInput(nbrChoisi);
    }

    // on empeche l'envoi du formulaire par le navigateur
    event.preventDefault();
});