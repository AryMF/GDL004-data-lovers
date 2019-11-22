
const DATA_URL = "https://raw.githubusercontent.com/AryMF/GDL004-data-lovers/master/src/data/pokemon/pokemon.json";
let dataPokemon = [];
let filterJSON = [];

/***********Main window *********************/
let pokemonContainerElement = document.getElementById("pokemonContainer");
/***********Popup windows (Search, FilterBy, SortBy) *********************/
let promptContainerElement = document.getElementById("promptContainer");
let searchByPromptElement = document.getElementById("searchByPrompt");
let searchPromptInputElement = document.getElementById("searchPromptInput");
let filterByPromptElement = document.getElementById("filterByPrompt");
let typeButtonsDiv = document.getElementById("typeButtonsDiv");
let sortByPromptElement = document.getElementById("sortByPrompt");
let sortByButtons = document.getElementById("sortByButtonsDiv");
let buttonCloseNode = document.getElementsByClassName("buttonCloseClass");
/***********Popup windows Character *********************/
let characterWindowElement = document.getElementById("characterWindow");
let characterDynamicDiv = document.getElementById("characterDynamicContent");
let characterTitleName = document.createElement("P");


let typeArray = ["Normal", "Fire", "Fighting", "Water", "Flying", "Grass", "Poison", "Electric",
"Ground", "Psychic", "Rock", "Ice", "Bug", "Dragon", "Ghost", "Dark", "Steel", "Fairy"];

const typeArrayColor = ["D2B48C", "ED602D", "9E201C", "0074D9", "15707C", "2ECC40", "A33EA1", "FFDC00",
"B28F35", "85144b", "7F7A33", "7FDBFF", "9AB223", "6F35FC", "55007F", "664A3D", "708090", "D685AD"];


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
  
  
let sortByArray = [
  "A-Z",
  "Z-A",
  "Height - to +",
  "Height + to -",
  "Weight - to +",
  "Weight + to -",
  "Number - to +",
  "Number + to -"
];

let sortArrayConditions = [
  "name",
  "name",
  "height",
  "height",
  "weight",
  "weight",
  "id",
  "id"
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

const printPokemonCards = dataArray => {
  let divContainer;
  let divCard;
  let divPokemonCard;
  let divBackPokemonCard;
  let pokemonNumber;
  let pokemonImage;
  let pokemonName;
  let pokemonType;
  let i;

  document.getElementById("pokemonContainer").innerHTML = "";

  dataArray.forEach(element => {
    divContainer = document.createElement("DIV");

    divContainer.classList.add("divContainerClass");
    document.getElementById("pokemonContainer").appendChild(divContainer);

    divCard = document.createElement("div");
    divCard.classList.add("divCardClass");
    divContainer.appendChild(divCard);

    divPokemonCard = document.createElement("DIV");
  
    for (i = 0; i < typeArray.length; i++) {
      if (element.type[0] == typeArray[i]) {
        break;
      }
    }
    divPokemonCard.setAttribute(
      "style",
      "background-color: #" + typeArrayColor[i]
    );
    divPokemonCard.tabIndex = 0;

    divPokemonCard.addEventListener("keyup", function(e) {
      if (e.keyCode === 13) {
        alert("Hola yo soy " + element.name);
      }
    });
    divPokemonCard.classList.add("divPokemonCardFaceClass");
    divPokemonCard.classList.add("divPokemonCardFaceClass--front");
    divCard.appendChild(divPokemonCard);
    divBackPokemonCard = document.createElement("div");
    divBackPokemonCard.classList.add("divPokemonCardFaceClass");
    divBackPokemonCard.classList.add("divPokemonCardFaceClass--back");
    divCard.appendChild(divBackPokemonCard);

    pokemonType = document.createElement("P");
    pokemonType.innerHTML = element.type;
    pokemonType.classList.add("typePokemon");
    divBackPokemonCard.appendChild(pokemonType);

    divBackPokemonCard.addEventListener("click", function() {
      alert("Hola yo soy " + element.name);
    });

    divBackPokemonCard.setAttribute(
      "style",
      "background-color: #" + typeArrayColor[i]
    );

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
    if (
      element.name == "Nidoran ♀ (Female)" ||
      element.name == "Nidoran ♂ (Male)"
    ) {
      pokemonName.innerHTML = element.name.substring(0, 9);
    } else {
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
        if(toggleElement.checked === false){
            toggleElement.checked = true;
            openFloatingMenu();
         }else {
            toggleElement.checked = false;
            closeFloatingMenu();
        }
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

/************************  Search popup  *********************************/
document.getElementById("searchButton").addEventListener("click", () =>{
    searchPromptCreator();
});

document.getElementById("searchButton").addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        searchPromptCreator();
    }
});

/**** Short cut ****/
document.addEventListener('keyup', function (event) {
    if (event.altKey && event.key === "x") {
        searchPromptCreator();
    }
});

const searchPromptCreator = () => {
    closeFloatingMenu();
    showPromptWindow(3);
    searchByPromptElement.style.WebkitAnimationPlayState = "running";
    document.getElementById("searchPromptInput").focus();
};
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
    filterPromptCreator();
});

document.getElementById("filterButton").addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        filterPromptCreator();
    }
});

/**** Short cut ****/
document.addEventListener('keyup', function (event) {
    if (event.altKey && event.key === "c") {
        filterPromptCreator();
    }
});

const filterPromptCreator = () => {
    closeFloatingMenu();
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
            hiddenPromptWindow();
        });
        buttonElement.addEventListener('keyup',function(e){
            if (e.keyCode === 13) {
                filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
                filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
                hiddenPromptWindow();
            }
        });
        typeButtonsDiv.appendChild(buttonElement);
    }
    filterByPromptElement.style.WebkitAnimationPlayState = "running";
    showPromptWindow(2);
    document.getElementById("Normal").focus();
};

/************************  Sort by popup  *********************************/
document.getElementById("sortByButton").addEventListener("click", () => {
  sortByPromptCreator();
});

document.getElementById("sortByButton").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    sortByPromptCreator();
  }
});

/**** Short cut ****/
document.addEventListener("keyup", function(event) {
  if (event.altKey && event.key === "v") {
    sortByPromptCreator();
  }
});

const sortByPromptCreator = () => {
  let sortByJSON;
  let buttonIsPair;

  for (let i = 0; i < sortByArray.length; i++) {
    buttonIsPair = i % 2;
    let buttonElement = document.createElement("BUTTON");
    buttonElement.classList.add("filterByTypeButton");
    buttonElement.value = sortByArray[i];
    buttonElement.innerHTML = sortByArray[i];
    buttonElement.style.backgroundColor = "#" + typeArrayColor[i];
    buttonElement.addEventListener("click", function() {
      if (filterJSON != "") {
        if (i == 0 || i == 2 || i == 4 || i == 6) {
          sortByJSON = window.data.sortDataResultDesc(
            filterJSON,
            sortArrayConditions[i]
          );
        } else {
          sortByJSON = window.data.sortDataResultAsc(
            filterJSON,
            sortArrayConditions[i]
          );
        }
      } else {
        if (i == 0 || i == 2 || i == 4 || i == 6) {
          sortByJSON = window.data.sortDataResultDesc(
            dataPokemon,
            sortArrayConditions[i]
          );
        } else {
          sortByJSON = window.data.sortDataResultAsc(
            dataPokemon,
            sortArrayConditions[i]
          );
        }
      }
      // sortByJSON == "" ? printPokemonCards(dataPokemon) : printPokemonCards(sortByJSON);
      printPokemonCards(sortByJSON);
      hiddenPromptWindow();
    });
    sortByButtons.appendChild(buttonElement);
  }
  sortByPromptElement.style.WebkitAnimationPlayState = "running";
  showPromptWindow(1);
};

/*********************Home button*********************/
/*let checkedHomeButtonElement = document.getElementById("checkedHomeButton");
// let homeButton = document.getElementById("homeButton");

checkedHomeButtonElement.addEventListener("change", () => {
  if (checkedHomeButtonElement.checked == true) {
    printPokemonCards(dataPokemon);
  } else {
    closeFloatingMenu();
  }
});
*/
document.getElementById("homeButton").addEventListener("click", () => {
  printPokemonCards(dataPokemon);
  filterJSON = [];
  console.log("Reset");
});


/**************************** Reset *************************************/
document.getElementById("resetButton").addEventListener("click", () => {
    closeFloatingMenu();
    filterJSON = [];
    printPokemonCards(dataPokemon);
});

/**** Short cut ****/
document.addEventListener('keyup', function (event) {
    if (event.altKey && event.key === "n") {
        closeFloatingMenu();
        filterJSON = [];
        printPokemonCards(dataPokemon);
    }
});

/*************************  Show popup  *********************************/
const showPromptWindow = (option) => {
    /*** Regresar al principio de la pagina ***/
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    /**************************************************/
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
        case 4:
            characterWindowElement.style.visibility = "visible";
        break;
        default:
        break;
    }
};

/************************  Cerrar popup  *********************************/

promptContainerElement.addEventListener("click", (element) => {
    if(element.target.id === "promptContainer"){
        hiddenPromptWindow();
    }
});

promptContainerElement.addEventListener('keyup', (event) => {
    if (event.key === "Escape") {
        hiddenPromptWindow();
    }
});

Array.from(buttonCloseNode).forEach((element) => {
    element.addEventListener("click", (i) => {
        typeButtonsDiv.innerHTML = "";
        hiddenPromptWindow();
        if (pokemonContainerElement.innerHTML == ""){
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
    characterWindowElement.style.visibility = "hidden";
    characterDynamicDiv.innerHTML = "";
    elementDivPokeballImage.style.visibility = "hidden";
    elementDivFavImage.style.visibility = "hidden";
};

/************************  Cerrar floating menu  ******************************/
const closeFloatingMenu = () => {
    toggleElement.checked = false;
    Array.from(floatingMenuElements).forEach(element => {
        element.style.visibility = "hidden";
    });
    floatingMenuButton.classList.remove("floatingMenuClassSmall");
    floatingMenuButton.classList.add("floatingMenuClassNormal");
}

/************************ Favorites window ************************/
/** Show favorites*/
document.getElementById("favoritesButton").addEventListener("click", () => {
    showFavorites();
});

const loadFavorites = () => {
    let pokemonCookiesStr = document.cookie.substring(16, document.cookie.length);
    let pokemonCookiesArray = pokemonCookiesStr.split(" ");
    return pokemonCookiesArray;
};

const createFavoriteCookie = (pokemonId) => {
    let pokemonCookiesArray = loadFavorites();
    pokemonCookiesArray.push(pokemonId);
    document.cookie = "favoritePokemon=" + pokemonCookiesArray.join(" ");    
};

const deleteFavorite = (pokemonId) => {
    let pokemonCookiesArray = loadFavorites();
    let index = pokemonCookiesArray.indexOf(pokemonId);

    index > -1 ? pokemonCookiesArray.splice(index, 1) : console.log("No existe ese id en favoritos");
    document.cookie = "favoritePokemon=" + pokemonCookiesArray.join(" ");;
};

const showFavorites = () =>{
    let pokemonCookiesArray = loadFavorites();
    console.log("Favoritos: ");
    console.log(pokemonCookiesArray);
    let favoritesJSON = [];
    dataPokemon.forEach((element) => {
        pokemonCookiesArray.forEach((favoriteID) => {
            if(favoriteID === element.name.toUpperCase()){
                favoritesJSON.push(element);
            }
        });
    });

    if(favoritesJSON != ""){
        printPokemonCards(favoritesJSON);
    }else{
        pokemonContainerElement.innerHTML = "";
        let favoritesWindowEmpty = document.createElement("DIV");
        favoritesWindowEmpty.classList.add("favoritesWindowEmptyClass");
        pokemonContainerElement.appendChild(favoritesWindowEmpty);

        let favoritesWindowTitle = document.createElement("P");
        favoritesWindowTitle.classList.add("textFormatBig");
        favoritesWindowTitle.innerHTML = "You haven't catch any pokemon yet!";
        favoritesWindowEmpty.appendChild(favoritesWindowTitle);
        
        let favoritesWindowImage = document.createElement("IMG");
        favoritesWindowImage.classList.add("favoritesWindowImageClass");
        favoritesWindowImage.setAttribute("src", "image/psyduck.png");
        favoritesWindowImage.setAttribute("alt", "Image: Favorites is empty");
        favoritesWindowEmpty.appendChild(favoritesWindowImage);
        
    }
    
};

/******************** Character window ********************/
let elementDivPokeballImage = document.getElementById("divPokeballImage");
let elementPokeballImage = document.getElementById("pokeballImage");
let elementDivFavImage = document.getElementById("divFavImage");
let elementStarFavImage = document.getElementById("starFavImage");

let characterImageElement = document.getElementById("characterImage");

const characterWindowPrint = (pokemonName) =>{
    //Preparar data del pokemon elegido
    let searchPokemon = window.data.filteredByNameOrNumber(dataPokemon, pokemonName);
    let characterData = searchPokemon[0];
    let pokemonCookiesArray = loadFavorites();

    // Configuración de botón de favoritos
    console.log("Cookies array:");
    console.log(pokemonCookiesArray);

    if(pokemonCookiesArray.indexOf(pokemonName) != -1){
        catchItAnimation(1, 0); /*el pokemon esta en favoritos*/
    }else {
        catchItAnimation(2, 0);
    }

    // Color de ventana
    let i=0;
    for(i; i < typeArray.length;i++){
        if(characterData.type[0] == typeArray[i]){
            break;
        }
    }
    //characterWindowElement.setAttribute("style", "background-color: #" + typeArrayColor[i]);
    characterWindowElement.setAttribute("style", "border-color: #" + typeArrayColor[i]);

    //Carga la imagen del pokemon 
    characterImageElement.setAttribute("src", characterData.img); // Si la comentas sale la imagen linda

    // characterDynamicDiv
/****************************************************************************************/
    let characterTitle = document.createElement("DIV");
    characterTitle.classList.add("columnAlignmentClass");
    characterDynamicDiv.appendChild(characterTitle);
        // characterTitleName -- Global
        characterTitleName.classList.add("textFormatBig");
        characterTitleName.setAttribute("style", "color: #" + typeArrayColor[i]);
        characterTitleName.innerHTML = characterData.name;
        characterTitle.appendChild(characterTitleName);
        let characterTitleNumber = document.createElement("P");
        characterTitleNumber.innerHTML = characterData.num;
        characterTitleNumber.classList.add("characterTitleNumberClass");
        characterTitle.appendChild(characterTitleNumber);

/****************************************************************************************/
    let characterGeneralData = document.createElement("DIV");
    characterGeneralData.classList.add("rowAlignmentClass");
    characterGeneralData.classList.add("bottomBorderClass");
    characterGeneralData.setAttribute("style", "border-color: #" + typeArrayColor[i]);
    characterDynamicDiv.appendChild(characterGeneralData);

        let characterTypeDiv = document.createElement("DIV");
        characterTypeDiv.classList.add("columnAlignmentClass");
        characterGeneralData.appendChild(characterTypeDiv);

            let characterTypeNumber = document.createElement("P");
            characterTypeNumber.innerHTML = characterData.type.join(" ");
            characterTypeNumber.classList.add("textFormatMedium");
            characterTypeDiv.appendChild(characterTypeNumber);
            
            let characterTypeTitle = document.createElement("P");
            characterTypeTitle.innerHTML = "Type";
            characterTypeTitle.classList.add("textFormatSmall");
            characterTypeDiv.appendChild(characterTypeTitle);

        let characterWeightDiv = document.createElement("DIV");
        characterWeightDiv.classList.add("columnAlignmentClass");
        characterGeneralData.appendChild(characterWeightDiv);

            let characterWeightNumber = document.createElement("P");
            characterWeightNumber.innerHTML = characterData.weight;
            characterWeightNumber.classList.add("textFormatMedium");
            characterWeightDiv.appendChild(characterWeightNumber);

            let characterWeightTitle = document.createElement("P");
            characterWeightTitle.innerHTML = "Weight";
            characterWeightTitle.classList.add("textFormatSmall");
            characterWeightDiv.appendChild(characterWeightTitle);

        let characterHeightDiv = document.createElement("DIV");
        characterHeightDiv.classList.add("columnAlignmentClass");
        characterGeneralData.appendChild(characterHeightDiv);

            let characterHeightNumber = document.createElement("P");
            characterHeightNumber.innerHTML = characterData.height;
            characterHeightNumber.classList.add("textFormatMedium");
            characterHeightDiv.appendChild(characterHeightNumber);

            let characterHeightTitle = document.createElement("P");
            characterHeightTitle.innerHTML = "Height";
            characterHeightTitle.classList.add("textFormatSmall");
            characterHeightDiv.appendChild(characterHeightTitle);

/****************************************************************************************/
    let characterCandyData = document.createElement("DIV");
    characterCandyData.classList.add("rowAlignmentClass");
    characterCandyData.classList.add("bottomBorderClass");
    characterCandyData.setAttribute("style", "border-color: #" + typeArrayColor[i]);
    characterDynamicDiv.appendChild(characterCandyData);

        let characterCandyDiv = document.createElement("DIV");
        characterCandyDiv.classList.add("columnAlignmentClass");
        characterCandyDiv.classList.add("rightBorderClass");
        characterCandyDiv.setAttribute("style", "border-color: #" + typeArrayColor[i]);
        characterCandyData.appendChild(characterCandyDiv);

            let characterCandyType = document.createElement("P");
            characterCandyType.innerHTML = characterData.candy;
            characterCandyType.classList.add("textFormatMedium");
            characterCandyDiv.appendChild(characterCandyType);

            let characterCandyTitle = document.createElement("P");
            characterCandyTitle.innerHTML = "Candy";
            characterCandyTitle.classList.add("textFormatSmall");
            characterCandyDiv.appendChild(characterCandyTitle);

        let characterCandyCountDiv = document.createElement("DIV");
        characterCandyCountDiv.classList.add("columnAlignmentClass");
        characterCandyData.appendChild(characterCandyCountDiv);

            let characterCandyCountNumber = document.createElement("P");
            characterCandyCountNumber.innerHTML = characterData.candy_count;
            characterCandyCountNumber.classList.add("textFormatMedium");
            characterCandyCountDiv.appendChild(characterCandyCountNumber);

            let characterCandyCountTitle = document.createElement("P");
            characterCandyCountTitle.innerHTML = "Candy Count";
            characterCandyCountTitle.classList.add("textFormatSmall");
            characterCandyCountDiv.appendChild(characterCandyCountTitle);

/****************************************************************************************/
    let characterAdditionalData = document.createElement("DIV");
    characterAdditionalData.classList.add("rowAlignmentClass");
    characterDynamicDiv.appendChild(characterAdditionalData);

        let additionalDataAuxiliarDiv = document.createElement("DIV");
        additionalDataAuxiliarDiv.classList.add("columnAlignmentClass");
        characterAdditionalData.appendChild(additionalDataAuxiliarDiv);

            let characterWeaknessDiv = document.createElement("DIV");
            characterWeaknessDiv.classList.add("columnAlignmentClass");
            additionalDataAuxiliarDiv.appendChild(characterWeaknessDiv);

                let characterWeaknessTitle = document.createElement("P");
                characterWeaknessTitle.innerHTML = "Weakness";
                characterWeaknessTitle.classList.add("textFormatSmall");
                characterWeaknessDiv.appendChild(characterWeaknessTitle);

                let characterWeaknessType = document.createElement("DIV");
                characterWeaknessDiv.appendChild(characterWeaknessType);
                        /*** Aquí va un ciclo farol */
                    let characterWeaknessTypeName = document.createElement("P");
                    characterWeaknessTypeName.innerHTML = characterData.weaknesses.join(" ");
                    characterWeaknessTypeName.classList.add("textFormatMedium");
                    characterWeaknessType.appendChild(characterWeaknessTypeName);
                    let characterWeaknessTypeLogo = document.createElement("IMG");
                    characterWeaknessType.appendChild(characterWeaknessTypeLogo);

            let characterInfoDiv = document.createElement("DIV");
            characterInfoDiv.classList.add("columnAlignmentClass");
            additionalDataAuxiliarDiv.appendChild(characterInfoDiv);


                let characterInfoTitle = document.createElement("P");
                characterInfoTitle.innerHTML = "Info";
                characterInfoTitle.classList.add("textFormatSmall");
                characterInfoDiv.appendChild(characterInfoTitle);

                let characterInfoBox = document.createElement("P");
                characterInfoBox.innerHTML = "place-holder text";
                characterInfoBox.classList.add("textFormatMedium");
                characterInfoDiv.appendChild(characterInfoBox);


        let characterEvolutionDiv = document.createElement("DIV");
        characterEvolutionDiv.classList.add("columnAlignmentClass");
        characterAdditionalData.appendChild(characterEvolutionDiv);


            let characterEvolutionTitle = document.createElement("P");
            characterEvolutionTitle.innerHTML = "Evolution";
            characterEvolutionTitle.classList.add("textFormatSmall");
            characterEvolutionDiv.appendChild(characterEvolutionTitle);

            let characterEvolutionBox = document.createElement("P");
            characterEvolutionBox.innerHTML = "place-holder text";
            characterEvolutionBox.classList.add("textFormatMedium");
            characterEvolutionDiv.appendChild(characterEvolutionBox);
/****************************************************************************************/
    showPromptWindow(4);
};


const catchItAnimation = (status, animation) => {
    let shrinkAnimationDelay = 0;
    let showElementDelay = 0;
    /* Define si hace la animacion */
    if(animation === 1){
        shrinkAnimationDelay = 300;
        showElementDelay = 1000;
    }

    if(status === 1){
        elementPokeballImage.classList.remove("pokeballImage");
        elementPokeballImage.classList.add("onClickImage");
        
        setTimeout(() => {
            elementPokeballImage.classList.add("onClickShrink");
        }, shrinkAnimationDelay);
        setTimeout(() => {
            elementDivPokeballImage.style.visibility = "hidden";
            elementDivFavImage.style.visibility = "visible";
            elementStarFavImage.classList.add("starFavImage");
        }, showElementDelay);
    } else {
        elementPokeballImage.classList.add("pokeballImage");
        elementPokeballImage.classList.remove("onClickImage");
        elementPokeballImage.classList.remove("onClickShrink");
        elementDivPokeballImage.style.visibility = "visible";
        elementDivFavImage.style.visibility = "hidden";
        elementStarFavImage.classList.remove("starFavImage");
    }
};

 elementPokeballImage.addEventListener("click", () => {
    catchItAnimation(1, 1);
    /**Create cookie*/
        createFavoriteCookie(characterTitleName.innerHTML.toUpperCase()); //Descomentar cuando funcione
        // createFavoriteCookie(num.toString(10));  Descomentar para prueba Cookies
 });
 elementStarFavImage.addEventListener("click", () => {
    catchItAnimation(2, 1);
    /*** Remove cookie */
        deleteFavorite(characterTitleName.innerHTML.toUpperCase()); //Descomentar cuando funcione
        // deleteFavorite(num.toString(10)); Descomentar para prueba Cookies
 });

/******************** Short cut Event listener ********************/
document.addEventListener('keyup',            function (event) {
    if (event.altKey && event.key === "z") {
        floatingMenuButton.focus();
    }
});



