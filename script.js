//Les variables globales
//Récupération de 3 portes fermées
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
//Le bouton de démmarrage pour un nouveau tour
//réinitialiser les valeurs pour un nouveau tour est de rafraîchir la page
let startButton = document.getElementById('start')
//Les images d'initialisation de portes formées
const botDoorPath = "https://content.codecademy.com/projects/chore-door/images/robot.svg";

const beachDoorPath = "https://content.codecademy.com/projects/chore-door/images/beach.svg";

const spaceDoorPath = "https://content.codecademy.com/projects/chore-door/images/space.svg";

const closedDoorPath = "https://content.codecademy.com/projects/chore-door/images/closed_door.svg";

//Le nombre possible pour ouvrir les portes  
let numClosedDoors = 3;

//utiliserez cette valeur pour vous assurer que des portes supplémentaires ne peuvent pas être cliquées après avoir cliqué sur la porte ChoreBot.
let currentlyPlaying = true;

//Les var d'url pour ouvrir les portes fermées aléatoirement
let openDoor1;
let openDoor2;
let openDoor3;

//Générer aléatoirement la porte qui cache le ChoreBot
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0){
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1){
    openDoor2 = botDoorPath;
    openDoor1 = spaceDoorPath;
    openDoor3 = beachDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor1 = beachDoorPath;
  }
}

//fonction de gestionnaire de click Porte 1
doorImage1.onclick = () => {
  if(!isClicked(doorImage1) && currentlyPlaying){
    doorImage1.src = openDoor1;
    //Dès qu'une porte est ouverte on appelle 
    playDoor(doorImage1);
  }
}
//fonction de gestionnaire de clickPorte 2
doorImage2.onclick = () => {
  if(!isClicked(doorImage2)){
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

//fonction de gestionnaire de click Porte 3
doorImage3.onclick = () => {
  if(!isClicked(doorImage2)){
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

//fonction de gestionnaire de clic startbutton
//démarrer un nouveau jeu et réinitialiser les valeurs pour un nouveau tour est de rafraîchir la page
startButton.onclick = () => {
  //un joueur ne peut pas réinitialiser le jeu en milieu de partie.
  if (!currentlyPlaying) {
    startRound();
  }
}

///réinitialiser les variables suivantes à leurs valeurs d'origine:
const startRound = () => {
  numClosedDoors = 3;
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  startButton.innerHTML = 'Good luck!',
  currentlyPlaying = true;

}

//Rendre chaque porte cliquable qu'une seule fois
//Vérifie si la porte à deja été ouverte 
const isClicked = (door) => {
  if (door.src === closedDoorPath){
    return false;
  } else {
    return true;
  }
}

 
//vérifier si une porte ouverte a le ChoreBot comme image pour mettre fin au jeu
const isBot = (door) => {
  let rep = false;
  if(door.src === botDoorPath) {
    rep = true;
  } else {
    rep = false;
  }
  return rep;
}
 
 //le nombre de portes disponibles sur lesquelles cliquer diminue de un à chaque fois qu'on cliquez sur une porte
 //Vérifie le nombre de partie à jouer
const playDoor = (door) => {
  numClosedDoors--;
  if(numClosedDoors === 0){
    //appeler
    gameOver('win');
  } else if (isBot(door)) {
    gameOver();
  }
}

//Met fin au jeu et affiche un message 
const gameOver = (statut) => {
  if (statut === 'win') {
    startButton.innerHTML = "Vous avez gagné! Refaire une partie?";
  } else {
    startButton.innerHTML = "Game Over! Rejouer?";
  }
  currentlyPlaying = false;
}

//exécuter la fonction 
randomChoreDoorGenerator();
startRound();