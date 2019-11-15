const DATA_URL = "https://raw.githubusercontent.com/AryMF/GDL004-data-lovers/master/src/data/pokemon/pokemon.json";
let dataPokemon = {};
let promptContainerElement = document.getElementById("promptContainer");
let searchByPromptElement = document.getElementById("searchByPrompt");
let filterByPromptElement = document.getElementById("filterByPrompt");
let searchPromptInputElement = document.getElementById("searchPromptInput");

let buttonCloseNode = document.getElementsByClassName("buttonCloseClass");
let typeArray = ["Normal", "Fire", "Fighting", "Water", "Flying", "Grass", "Poison", "Electric", "Ground",
"Psychic", "Rock", "Ice", "Bug", "Dragon", "Ghost", "Dark", "Steel", "Fairy"];

const typeArrayColor = ["A8A77A","EE8130", "C22E28", "6390F0",
"A98FF3", "7AC74C", "A33EA1", "F7D02C", "E2BF65",
"F95587", "B6A136", "96D9D6", "A6B91A", "6F35FC",
"735797", "705746", "B7B7CE",  "D685AD"];

let typeButtonsDiv = document.getElementById("typeButtonsDiv");

async function getData (){
    const dataRequest = await fetch(DATA_URL);
    const dataJSON = await dataRequest.json();
    return dataJSON;
};

const main = ()  =>{
    getData()
        .then(dataJSON => {
            dataPokemon = dataJSON.pokemon;
            printPokemonCards(dataPokemon);
        })
        .catch(error => {
            console.error("Error al cargar JSON por fetch");
            console.log(error);
        });
};

window.addEventListener("load", main);

const printPokemonCards = (dataArray) => {
    let divContainer;
    let divPokemonCard;
    let pokemonImage;
    let pokemonName;
    let randomColor;

    document.getElementById("pokemonContainer").innerHTML = "";

    dataArray.forEach(element => {
        divContainer = document.createElement("DIV");
        divContainer.classList.add("divContainerClass");
        document.getElementById("pokemonContainer").appendChild(divContainer);

        divPokemonCard = document.createElement("DIV");
        randomColor = "background-color: #" + Math.floor(Math.random()*16777215).toString(16) + ";";
        divPokemonCard.setAttribute("style", randomColor);
        divPokemonCard.classList.add("divPokemonCardClass");
        divContainer.appendChild(divPokemonCard);

        pokemonImage = document.createElement("IMG");
        pokemonImage.classList.add("imagePokemon");
        pokemonImage.setAttribute("id", element.id);
        pokemonImage.setAttribute("src", element.img);
        pokemonImage.setAttribute("alt", element.name);
        pokemonImage.addEventListener("click", function() {
            alert("Hola yo soy " + element.name);
        });
        divPokemonCard.appendChild(pokemonImage);

        pokemonName = document.createElement("SPAN");
        pokemonName.innerHTML = element.name;
        pokemonName.classList.add("TextFormat");
        divPokemonCard.appendChild(pokemonName);

    });
};

/************************  Search popup  *********************************/
document.getElementById("searchButton").addEventListener("click", () =>{
    showPromptWindow(3);
    searchByPromptElement.style.WebkitAnimationPlayState = "running";
    document.getElementById("searchPromptInput").focus();
});

document.getElementById("searchPromptButton").addEventListener("click", () => {
    if(searchPromptInputElement.value != ""){
        let filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
        filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
        hiddenPromptWindow();
    }else {
        printPokemonCards(dataPokemon);
    }
});

document.getElementById("searchPromptInput").addEventListener("input", () => {
    searchPromptInputElement.value = searchPromptInputElement.value.replace(" ", "");
    searchPromptInputElement.value = searchPromptInputElement.value.toUpperCase();
    if(searchPromptInputElement.value != ""){
        let filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
        printPokemonCards(filterJSON);
    }else {
        printPokemonCards(dataPokemon);
    }
});

document.getElementById("searchPromptInput").addEventListener("keyup", (event)  =>{
    if (event.keyCode === 13) {
        searchByInput();
    }
});

const searchByInput = () =>{
    if(searchPromptInputElement.value != ""){
        let filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
        filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
        hiddenPromptWindow();
    }else {
        printPokemonCards(dataPokemon);
    }
};

/************************  Filter popup  *********************************/
document.getElementById("filterButton").addEventListener("click", () => {
    for(let i=0; i<15; i++){
        let buttonElement = document.createElement("BUTTON");
        buttonElement.classList.add("filterByTypeButton");
        buttonElement.value = typeArray[i];
        buttonElement.innerHTML = typeArray[i];
        buttonElement.style.backgroundColor = "#" + typeArrayColor[i];
        buttonElement.addEventListener("click", function() {
            let filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
            filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
            console.log(buttonElement.value +" : "+ filterJSON.length);
            hiddenPromptWindow();
        });
        typeButtonsDiv.appendChild(buttonElement);
    }
    filterByPromptElement.style.WebkitAnimationPlayState = "running";
    showPromptWindow(2);
});

/*************************  Show popup  *********************************/
const showPromptWindow = (option) => {
    promptContainerElement.style.visibility = "visible";

    switch(option){
        case 1:
            console.log(".:Sort by:.");
        break;
        case 2:
            filterByPromptElement.style.visibility = "visible";
        break;
        case 3:
            searchByPromptElement.style.visibility = "visible";
        break;
        default:
        break;
    }
};

/************************  Cerrar popup  *********************************/
// promptContainerElement.addEventListener("click", () => {
//     hiddenPromptWindow();
// });

Array.from(buttonCloseNode).forEach((element) => {
    element.addEventListener("click", (i) => {
        typeButtonsDiv.innerHTML = "";
        hiddenPromptWindow();
        if (document.getElementById("pokemonContainer").innerHTML == ""){
            printPokemonCards(dataPokemon);
        }
    });
});

const hiddenPromptWindow = () => {
    typeButtonsDiv.innerHTML = "";
    promptContainerElement.style.visibility = "hidden";
    searchPromptInputElement.value = "";
    // console.log(".:Sort by:.");
    filterByPromptElement.style.visibility = "hidden";
    searchByPromptElement.style.visibility = "hidden";
};

/**************************** Reset *************************************/
document.getElementById("resetButton").addEventListener("click", () => {
    printPokemonCards(dataPokemon);
});