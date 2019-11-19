const DATA_URL = "https://raw.githubusercontent.com/AryMF/GDL004-data-lovers/master/src/data/pokemon/pokemon.json";
let dataPokemon = {};
let filterJSON = [];
let promptContainerElement = document.getElementById("promptContainer");
let searchByPromptElement = document.getElementById("searchByPrompt");
let filterByPromptElement = document.getElementById("filterByPrompt");
let searchPromptInputElement = document.getElementById("searchPromptInput");
let sortByPromptElement = document.getElementById("sortByPrompt");


let buttonCloseNode = document.getElementsByClassName("buttonCloseClass");
let typeArray = ["Normal", "Fire", "Fighting", "Water", "Flying", "Grass", "Poison", "Electric", 
"Ground", "Psychic", "Rock", "Ice", "Bug", "Dragon", "Ghost", "Dark", "Steel", "Fairy"];

const typeArrayColor = ["D2B48C", "ED602D", "9E201C", "0074D9", "15707C", "2ECC40", "A33EA1", "FFDC00", 
"B28F35", "85144b", "7F7A33", "7FDBFF", "9AB223", "6F35FC", "55007F", "664A3D", "708090", "D685AD"];

let typeButtonsDiv = document.getElementById("typeButtonsDiv");
let sortByButtons = document.getElementById("sortByButtonsDiv");

let sortByArray = [
    "A-Z",
    "Z-A",
    "Height + to -",
    "Height - to +",
    "Weight + to -",
    "Weight - to +",
    "Number"
];
let sortByArrayColor = [
    "A8A77A",
    "EE8130",
    "C22E28",
    "6390F0",
    "A98FF3",
    "7AC74C",
    "A33EA1"
];

/******************** Llamada de datos ********************/

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

/********** Impresión en pantalla de Pokemon cards **********/

const printPokemonCards = (dataArray) => {
    let divContainer;
    let divPokemonCard;
    let pokemonNumber;
    let pokemonImage;
    let pokemonName;
    let randomColor;
    let i;

    document.getElementById("pokemonContainer").innerHTML = "";

    dataArray.forEach(element => {
        divContainer = document.createElement("DIV");
        divContainer.classList.add("divContainerClass");
        document.getElementById("pokemonContainer").appendChild(divContainer);

        divPokemonCard = document.createElement("DIV");
        // randomColor = "background-color: #" + Math.floor(Math.random()*16777215).toString(16) + ";";
        // divPokemonCard.setAttribute("style", randomColor);
        for(i=0; i < typeArray.length;i++){
            if(element.type[0] == typeArray[i]){
                break;
            }
        }
        divPokemonCard.setAttribute("style", "background-color: #" + typeArrayColor[i]);
        divPokemonCard.tabIndex = 0;
        divPokemonCard.addEventListener("click", function() {
            alert("Hola yo soy " + element.name);
        });
        divPokemonCard.addEventListener('keyup',function(e){
            if (e.keyCode === 13) {
                alert("Hola yo soy " + element.name);
            }
        });
        divPokemonCard.classList.add("divPokemonCardClass");
        divContainer.appendChild(divPokemonCard);

        pokemonImage = document.createElement("IMG");
        pokemonImage.classList.add("imagePokemon");
        pokemonImage.setAttribute("id", element.id);
        pokemonImage.setAttribute("src", element.img);
        pokemonImage.setAttribute("alt", element.name);
        divPokemonCard.appendChild(pokemonImage);

        pokemonNumber = document.createElement("P");
        pokemonNumber.innerHTML = "#" + element.num;
        pokemonNumber.classList.add("numberPokemon");
        divPokemonCard.appendChild(pokemonNumber);

        pokemonName = document.createElement("P");
        if(element.name == "Nidoran ♀ (Female)" || element.name == "Nidoran ♂ (Male)"){
            pokemonName.innerHTML = element.name.substring(0,9);
        }else{
            pokemonName.innerHTML = element.name;
        }        
        pokemonName.classList.add("namePokemon");
        divPokemonCard.appendChild(pokemonName);

    });
};

/*********************** Floating menu ***********************/
let toggleElement = document.getElementById("toggle"); 
let floatingMenuButton = document.getElementById("floatingMenu");
let floatingMenuElements = document.getElementsByClassName("floatingMenuElement");

toggleElement.addEventListener("change", () => {
    if(toggleElement.checked == true){
        openFloatingMenu();
    }else {
        closeFloatingMenu();
    }
});
/*** Abrir menú con Enter ***/
floatingMenuButton.addEventListener('keyup',function(event){
    if (event.key === "Enter") {
        /*if(toggleElement.checked == true){
            openFloatingMenu();
        }else {
            closeFloatingMenu();
        }
        console.log("enter~");*/
        // toggleElement.checked = true;
    }
});

const openFloatingMenu = () => {
    floatingMenuButton.classList.remove("floatingMenuClassNormal");
    floatingMenuButton.classList.add("floatingMenuClassSmall");
    Array.from(floatingMenuElements).forEach(element => {
        element.style.visibility = "visible";
        element.style.animation = "animation: pop 0.3s linear 1";
    });
}

const closeFloatingMenu = () => {
    toggleElement.checked = false;
    Array.from(floatingMenuElements).forEach(element => {
        element.style.visibility = "hidden";
    });
    floatingMenuButton.classList.remove("floatingMenuClassSmall");
    floatingMenuButton.classList.add("floatingMenuClassNormal");
}

/************************  Search popup  *********************************/
document.getElementById("searchButton").addEventListener("click", () =>{
    closeFloatingMenu();
    /*** Regresar al principio de la pagina ***/
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    /**************************************************/
    showPromptWindow(3);
    searchByPromptElement.style.WebkitAnimationPlayState = "running";
    document.getElementById("searchPromptInput").focus();
});

document.getElementById("searchPromptButton").addEventListener("click", () => {
    if(searchPromptInputElement.value != ""){
        filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
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
        filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
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
        filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
        filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
        hiddenPromptWindow();
    }else {
        printPokemonCards(dataPokemon);
    }
};

/************************  Filter popup  *********************************/
document.getElementById("filterButton").addEventListener("click", () => {
    closeFloatingMenu();
    /*** Regresar al principio de la pagina ***/
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    /**************************************************/
    for(let i=0; i<15; i++){
        let buttonElement = document.createElement("BUTTON");
        buttonElement.classList.add("filterByTypeButton");
        buttonElement.value = typeArray[i];
        buttonElement.innerHTML = typeArray[i];
        buttonElement.id =  typeArray[i];
        buttonElement.style.backgroundColor = "#" + typeArrayColor[i];
        buttonElement.tabIndex = 0;
        buttonElement.focus();
        buttonElement.addEventListener("click", function() {
            filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
            filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
            console.log(buttonElement.value +" : "+ filterJSON.length);
            hiddenPromptWindow();
        });
        buttonElement.addEventListener('keyup',function(e){
            if (e.keyCode === 13) {
                filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
                filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
                console.log(buttonElement.value +" : "+ filterJSON.length);
                hiddenPromptWindow();
            }
        });
        typeButtonsDiv.appendChild(buttonElement);
    }
    //PENDIENTE: Regresar al principio de la pantalla.
    filterByPromptElement.style.WebkitAnimationPlayState = "running";
    showPromptWindow(2);
    document.getElementById("Normal").focus();
});

/************************  Sort by popup  *********************************/

document.getElementById("sortByButton").addEventListener("click", () => {
    for (let i = 0; i < sortByArray.length; i++) {
        console.log("ciclo de botenes");
        let buttonElement = document.createElement("BUTTON");
        // buttonElement.classList.add("sortByTypeButton");
        buttonElement.classList.add("filterByTypeButton");
        buttonElement.value = sortByArray[i];
        buttonElement.innerHTML = sortByArray[i];
        buttonElement.style.backgroundColor = "#" + typeArrayColor[i];
        buttonElement.addEventListener("click", function() {
            let sortByJSON = window.data.sortData(dataPokemon, sortByArray[i]);
            sortByJSON == "" ? printPokemonCards(dataPokemon) : printPokemonCards(sortByJSON);
            console.log(buttonElement.value + " : " + sortByJSON.length);
            hiddenPromptWindow();
        });
        sortByButtons.appendChild(buttonElement);
    }
    sortByPromptElement.style.WebkitAnimationPlayState = "running";
    showPromptWindow(1);
});

/*************************  Show popup  *********************************/
const showPromptWindow = (option) => {
    promptContainerElement.style.visibility = "visible";

    switch(option){
        case 1:
            sortByPromptElement.style.visibility = "visible";
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
    sortByPromptElement.style.visibility = "hidden";
    sortByButtons.innerHTML = "";
    filterByPromptElement.style.visibility = "hidden";
    searchByPromptElement.style.visibility = "hidden";
};

/**************************** Reset *************************************/
document.getElementById("resetButton").addEventListener("click", () => {
    printPokemonCards(dataPokemon);
    filterJSON = [];
});

/******************** Short cut Event listener ********************/
document.addEventListener('keyup', function (event) {
    if (event.ctrlKey && event.key === "m") {
        floatingMenuButton.focus();
    }
});