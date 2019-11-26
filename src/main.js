
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
let characterTitleName = "";

const typeArray = [
    {
        type: "Normal",
        color: "#D2B48C",
    },
    {
        type: "Fire",
        color: "#ED602D",
    },
    {
        type: "Fighting",
        color: "#9E201C",
    },
    {
        type: "Water",
        color: "#0074D9",
    },
    {
        type: "Flying",
        color: "#15707C",
    },
    {
        type: "Grass",
        color: "#2ECC40",
    },
    {
        type: "Poison",
        color: "#A33EA1",
    },
    {
        type: "Electric",
        color: "#FFDC00",
    },
    {
        type: "Ground",
        color: "#B28F35",
    },
    {
        type: "Psychic",
        color: "#85144b",
    },
    {
        type: "Rock",
        color: "#7F7A33",
    },
    {
        type: "Ice",
        color: "#7FDBFF",
    },
    {
        type: "Bug",
        color: "#9AB223",
    },
    {
        type: "Dragon",
        color: "#6F35FC",
    },
    {
        type: "Ghost",
        color: "#55007F",
    },
    {
        type: "Dark",
        color: "#664A3D",
    },
    {
        type: "Steel",
        color: "#708090",
    },
    {
        type: "Fairy",
        color: "#D685AD",
    } 
];

const sortByOptions = [
    {
        buttonText: "A-Z",
        buttonArgument : "name"
    },
    {
        buttonText: "Z-A",
        buttonArgument : "name"
    },
    {
        buttonText: "Height - to +",
        buttonArgument : "height"
    },
    {
        buttonText: "Height + to -",
        buttonArgument : "height"
    },
    {
        buttonText: "Weight - to +",
        buttonArgument : "weight"
    },
    {
        buttonText: "Weight + to -",
        buttonArgument : "weight"
    },
    {
        buttonText: "Number - to +",
        buttonArgument : "id"
    },
    {
        buttonText: "Number + to -",
        buttonArgument : "id"
    },
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
            printPokemonCards(dataPokemon); /**Comentar para animación intro */
        })
        .catch(error => {
            console.error("Error al cargar JSON por fetch");
            console.error(error);
        });
};

window.addEventListener("load", main);

/********** Animación de intro ******************************/
/*
let loadingImageDiv = document.getElementById("divLoading");
let mainScreenDiv = document.getElementById("mainScreen");
let floatingMenu = document.getElementById("floatingMenuDIV");

let loadingImage = document.getElementById("loadingImage");
let divLoadingImage = document.getElementById("divLoadingImage");

let ledImage = document.getElementById("ledImage");
let divLedImage = document.getElementById("divLedImage");

let ripple_wrap = document.getElementById('ripple-wrap');
let rippler = document.getElementById('ripple');
let finish = false;
let soundControl = document.getElementById("soundControl");

loadingImage.addEventListener("click", () => {
    let time = 1;
    let i = 1;
    let intervalTime = 600;
    let interval = setInterval(() => {
        if(i < 5){
            time = time - 0.2;
            loadingImage.style.webkitAnimation ="loading " + time + "s  linear 0s infinite";
        } else{
            loadingImage.style.WebkitAnimationPlayState = "paused";
            divLoadingImage.style.visibility = "hidden";
            divLedImage.style.visibility = "visible";
            ledImage.style.webkitAnimation = "light .5s linear 2";
            soundControl.play();
            clearInterval(interval);
            let intervalTwo = setInterval(() => {
                if(i == 6){
                    divLedImage.style.visibility = "hidden";
                    ripple_wrap.classList.add('goripple');
                    rippler.style.WebkitAnimationPlayState = "running";
                    rippler.style.animationPlayState = "running";
                    setTimeout(function() {
                        loadingImageDiv.style.visibility = "hidden";
                        mainScreenDiv.style.visibility = "visible"; //Cambiar por pantalla main
                        floatingMenu.style.visibility = "visible";
                        printPokemonCards(dataPokemon);
                    },1000);
                    clearInterval(intervalTwo);
                }
            }, 1500);
        }
        i++;
    }, intervalTime);
    
    
});

rippler.addEventListener("animationend", function(e){
    ripple_wrap.classList.remove('goripple');
        
});
*/
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
  let i; // TODO: use descriptive variable
  let typeImagesSRC = "image/typesWhite/";
  let typeImageExtension = ".svg";

  pokemonContainerElement.innerHTML = "";

    dataArray.forEach(element => {
        divContainer = document.createElement("DIV");
        divContainer.classList.add("divContainerClass");
        pokemonContainerElement.appendChild(divContainer);

        divCard = document.createElement("div");
        divCard.classList.add("divCardClass");
        divContainer.appendChild(divCard);

        divPokemonCard = document.createElement("DIV");    
        for (i = 0; i < typeArray.length; i++) {
            if (element.type[0] == typeArray[i].type) {
                break;
            }
        }
        divPokemonCard.setAttribute("style", "background-color: " + typeArray[i].color);
        divPokemonCard.tabIndex = 0;        
        divPokemonCard.classList.add("divPokemonCardFaceClass");
        divPokemonCard.classList.add("divPokemonCardFaceClass--front");
        divCard.appendChild(divPokemonCard);
       
        pokemonImage = document.createElement("IMG");
        pokemonImage.classList.add("imagePokemon");
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

        divBackPokemonCard = document.createElement("div");
        divBackPokemonCard.setAttribute("style", "background-color: " + typeArray[i].color);
        divBackPokemonCard.classList.add("divPokemonCardFaceClass");
        divBackPokemonCard.classList.add("divPokemonCardFaceClass--back");
        divCard.appendChild(divBackPokemonCard);

        element.type.forEach((element) => {
            let pokemonTypeImg = document.createElement("IMG");
            pokemonTypeImg.setAttribute("src", typeImagesSRC + element + typeImageExtension);
            pokemonTypeImg.classList.add("typePokemonIMG");
            divBackPokemonCard.appendChild(pokemonTypeImg);

            pokemonType = document.createElement("P");
            pokemonType.innerHTML = element;
            pokemonType.classList.add("typePokemon");
            divBackPokemonCard.appendChild(pokemonType);
        });

        divBackPokemonCard.addEventListener("click", function() {
            // alert("Hola yo soy " + element.name);
            characterWindowPrint(element.name.toUpperCase());
        });

        divPokemonCard.addEventListener("keyup", function(e) {
            if (e.keyCode === 13) {
                // alert("Hola yo soy " + element.name);
                characterWindowPrint(element.name.toUpperCase());
            }
        });
  });
};

/******************** Short cut Event listener ********************/


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

/** short cut to focus */
document.addEventListener('keyup',            function (event) {
    if (event.altKey && event.key === "z") {
        floatingMenuButton.focus();
    }
});

/************************  Close floating menu  ******************************/
const closeFloatingMenu = () => {
    toggleElement.checked = false;
    Array.from(floatingMenuElements).forEach(element => {
        element.style.visibility = "hidden";
    });
    floatingMenuButton.classList.remove("floatingMenuClassSmall");
    floatingMenuButton.classList.add("floatingMenuClassNormal");
}

/**************************** Reset function *************************************/
document.getElementById("resetButton").addEventListener("click", () => {
    closeFloatingMenu();
    filterJSON = [];
    printPokemonCards(dataPokemon);
});

/**** Reset with short cut ****/
document.addEventListener('keyup', function (event) {
    if (event.altKey && event.key === "r") {
        closeFloatingMenu();
        filterJSON = [];
        printPokemonCards(dataPokemon);
    }
});

/************************  Search modal  *********************************/
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
    /*** Regresar al principio de la pagina ***/
    document.documentElement.scrollTop = 0;
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
    /*** Regresar al principio de la pagina ***/
    document.documentElement.scrollTop = 0;
    if(searchPromptInputElement.value != ""){
        filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
        filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
        hiddenPromptWindow();
    }else {
        printPokemonCards(dataPokemon);
    }
};

/************************  Filter modal  *********************************/
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
        buttonElement.value = typeArray[i].type;
        buttonElement.innerHTML = typeArray[i].type;
        buttonElement.id =  typeArray[i].type;
        buttonElement.style.backgroundColor = typeArray[i].color;
        buttonElement.tabIndex = 0;
        buttonElement.focus();
        buttonElement.addEventListener("click", function() {
            /*** Regresar al principio de la pagina ***/
            document.documentElement.scrollTop = 0;
            filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
            filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON);
            hiddenPromptWindow();
        });
        buttonElement.addEventListener('keyup',function(e){
            if (e.keyCode === 13) {
                /*** Regresar al principio de la pagina ***/
                document.documentElement.scrollTop = 0;
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

/************************  Sort by modal  *********************************/
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
  closeFloatingMenu();
  for (let i = 0; i < sortByOptions.length; i++) {
    let buttonElement = document.createElement("BUTTON");
    buttonElement.classList.add("filterByTypeButton");
    buttonElement.id =  sortByOptions[i].buttonText;
    buttonElement.innerHTML = sortByOptions[i].buttonText;
    buttonElement.style.backgroundColor = typeArray[i].color;
    buttonElement.tabIndex = 0;
    buttonElement.focus();
    buttonElement.addEventListener("click", function() {
        /*** Regresar al principio de la pagina ***/
        document.documentElement.scrollTop = 0;
        if (filterJSON != "") {
        if (i == 0 || i == 2 || i == 4 || i == 6) {
            sortByJSON = window.data.sortDataResultDesc(
            filterJSON,
            sortByOptions[i].buttonArgument
            );
        } else {
            sortByJSON = window.data.sortDataResultAsc(
            filterJSON,
            sortByOptions[i].buttonArgument
            );
        }
        } else {
        if (i == 0 || i == 2 || i == 4 || i == 6) {
            sortByJSON = window.data.sortDataResultDesc(
            dataPokemon,
            sortByOptions[i].buttonArgument
            );
        } else {
            sortByJSON = window.data.sortDataResultAsc(
            dataPokemon,
            sortByOptions[i].buttonArgument
            );
        }
      }
      printPokemonCards(sortByJSON);
      hiddenPromptWindow();
    });
    sortByButtons.appendChild(buttonElement);
  }
  sortByPromptElement.style.WebkitAnimationPlayState = "running";
  showPromptWindow(1);
  document.getElementById("A-Z").focus();
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
/*document.getElementById("homeButton").addEventListener("click", () => {
  printPokemonCards(dataPokemon);
  filterJSON = [];
  console.log("Reset");
});*/

/*************************  Modal manager  *********************************/
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
        case 4:
            characterWindowElement.style.visibility = "visible";
        break;
        default:
        break;
    }
};

/************************  Close modal  *********************************/

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

const createFavoriteCookie = (pokemonName) => {
    let pokemonCookiesArray = loadFavorites();
    pokemonCookiesArray.push(pokemonName);
    document.cookie = "favoritePokemon=" + pokemonCookiesArray.join(" ") + "; expires =Mo, 18 Jan 2038 12:00:00 UTC";
    console.log("createFavorite: " + document.cookie);
};

const deleteFavorite = (pokemonName) => {
    let pokemonCookiesArray = loadFavorites();
    let index = pokemonCookiesArray.indexOf(pokemonName);

    index > -1 ? pokemonCookiesArray.splice(index, 1) : console.error("No existe ese id en favoritos");
    document.cookie = "favoritePokemon=" + pokemonCookiesArray.join(" ");
};

const showFavorites = () =>{
    let pokemonCookiesArray = loadFavorites();
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
    characterTitleName = ""; //Asegurar que este vació
    let evolutionPathArrowTemplate = `<div class="columnAlignmentClass evolutionPathArrow">
        <p class="textFormatSmall">=&gt;</p>
        </div>`; //Template necesario
    let evolutionPathIndex = 0; // Variable necesaria 

    //Preparar data del pokemon elegido
    let searchPokemon = window.data.filteredByNameOrNumber(dataPokemon, pokemonName);
    let characterData = searchPokemon[0];
    let pokemonCookiesArray = loadFavorites();

    // Configuración de botón de favoritos
    if(pokemonCookiesArray.indexOf(pokemonName) != -1){
        catchItAnimation(1, 0); /*el pokemon esta en favoritos*/
    }else {
        catchItAnimation(2, 0);
    }

    // Color de ventana
    let colorByType;
    for(let i = 0 ; i < typeArray.length;i++){
        if(characterData.type[0] == typeArray[i].type){
            colorByType = typeArray[i].color;
            break;
        }
    }

    /*** Evolution path ******/
    /** Concatenar arreglos de prev_evolution, pokemon actual y next_evolution */
    let evolutionPathArray = [];

    if("prev_evolution" in characterData){
        evolutionPathArray = evolutionPathArray.concat(characterData.prev_evolution
            .map((elementArray) => {
            let found = dataPokemon.filter((element) => {
                return element.name === elementArray.name;
            });
            return { "name": elementArray.name, "img": found ? found[0].img : ''};
        }));
    }
    
    evolutionPathArray = evolutionPathArray.concat([{
        "name": characterData.name,
        "img": characterData.img
    }]);

    if("next_evolution" in characterData){
        evolutionPathArray = evolutionPathArray.concat(characterData.next_evolution
            .map((elementArray) => {
            let found = dataPokemon.filter((element) => {
                return element.name === elementArray.name;
            });
            return { "name": elementArray.name, "img": found ? found[0].img : ''};
        }));
    }          
    /***** Fin de concatenación */
    

    characterWindowElement.setAttribute("style", "border-color: " + colorByType);

    //Carga la imagen del pokemon 
    let cuteImageSRC = "https://pokeres.bastionbot.org/images/pokemon/";
    let cuteImageExt = ".png";
    characterImageElement.setAttribute("src", cuteImageSRC + characterData.id + cuteImageExt); // Si la comentas sale la imagen linda

// characterDynamicDiv
/****************************************************************************************/
const characterWindowTemplate  = `
    <!-- Contenido dinámico -->
    <!-- **************************************************************************************** -->
    <div class="columnAlignmentClass">
        <p id="characterPokemonName" class="textFormatBig" style= ${"color:" + colorByType}> ${characterData.name}</p>
        <p class="characterTitleNumberClass">${characterData.num}</p>
    </div>
    <!-- **************************************************************************************** -->
    <div class="rowAlignmentClass bottomBorderClass" style=${"border-color:" + colorByType}>
        <div class="columnAlignmentClass">
            <p class="textFormatMedium">${characterData.type.join(" ")}</p>
            <p class="textFormatSmall">Type</p>
        </div>
        <div class="columnAlignmentClass">
            <p class="textFormatMedium">${characterData.weight}</p>
            <p class="textFormatSmall">Weight</p>
        </div>
        <div class="columnAlignmentClass">
            <p class="textFormatMedium">${characterData.height}</p>
            <p class="textFormatSmall">Height</p>
        </div>
    </div>
    <!-- **************************************************************************************** -->
    <div class="rowAlignmentClass bottomBorderClass" style=${"border-color:" + colorByType}>
        <div class="columnAlignmentClass rightBorderClass" style=${"border-color:" + colorByType}>
            <p class="textFormatMedium">${characterData.candy}</p>
            <p class="textFormatSmall">Candy</p>
        </div>
        <div class="columnAlignmentClass">
            ${"candy_count" in characterData ? '<p class="textFormatMedium">' + characterData.candy_count + '</p>'
                : '<p class="textFormatMedium"> - </p>'
            }
            <p class="textFormatSmall">Candy Count</p>
        </div>
    </div>
    <!-- **************************************************************************************** -->
    <div class="columnAlignmentClass">
        <div class="columnAlignmentClass">
            <p class="textFormatSmall">Weakness</p>
            <div class="rowAlignmentClass">
                ${characterData.weaknesses.map((element) => {
                    return '<div class="characterWeaknessTypeContainer">' +
                        '<img class="weaknessImgClass"src="image/types/'+ element + '.svg"> ' +
                        ' <p class="weaknessTextFormat">' + element + '</p> </div>'
                }).join("")}
            </div>
        </div>
    </div>
    <!-- **************************************************************************************** -->
    <div class="rowAlignmentClass">
        <div class="columnAlignmentClass">
            <p class="textFormatSmall">Info</p>
            <p class="textFormatMedium">place-holder text</p>
        </div>
        <div class="columnAlignmentClass">
            <p class="textFormatSmall">Evolution path</p>
            <div class="rowAlignmentClass">
                <!-- /******* Map ****** -->
                <div class="rowAlignmentClass">
                    ${
                        evolutionPathArray.map((element) => {
                            if(evolutionPathIndex < (evolutionPathArray.length -1)){
                                evolutionPathIndex++;
                                return '<div class="columnAlignmentClass">' +
                                '<img class="weaknessImgClass" src=' + element.img + '>' +
                                '<p class="textFormatSmall">' + element.name + '</p>' +
                                '</div>' + evolutionPathArrowTemplate
                            }else {
                                return '<div class="columnAlignmentClass">' +
                                '<img class="weaknessImgClass" src=' + element.img + '>' +
                                '<p class="textFormatSmall">' + element.name + '</p>' +
                            '</div>'
                            }
                        }).join("")
                    }
                <!-- /******* Fin map *****/ -->
            </div>
        </div>
    </div>`;

    characterDynamicDiv.innerHTML = characterWindowTemplate;
    characterTitleName = document.getElementById("characterPokemonName").innerHTML; //1988
                
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
        createFavoriteCookie(characterTitleName.toUpperCase());
 });
 elementStarFavImage.addEventListener("click", () => {
    catchItAnimation(2, 1);
    /*** Remove cookie */
        deleteFavorite(characterTitleName.toUpperCase().trim());
 });