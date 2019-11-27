const DATA_URL =
  "https://raw.githubusercontent.com/AryMF/GDL004-data-lovers/master/src/data/pokemon/pokemon.json";
let dataPokemon = [];
let filterJSON = [];

/***********Main window *********************/
let pokemonContainerElement = document.getElementById("pokemonContainer");
let homeButtonElement = document.getElementById("homeButton");
let toggleFavElement = document.getElementById("toggleFav");
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

const typeArray = [
  {
    type: "Normal",
    color: "#D2B48C"
  },
  {
    type: "Fire",
    color: "#ED602D"
  },
  {
    type: "Fighting",
    color: "#9E201C"
  },
  {
    type: "Water",
    color: "#0074D9"
  },
  {
    type: "Flying",
    color: "#15707C"
  },
  {
    type: "Grass",
    color: "#2ECC40"
  },
  {
    type: "Poison",
    color: "#A33EA1"
  },
  {
    type: "Electric",
    color: "#FFDC00"
  },
  {
    type: "Ground",
    color: "#B28F35"
  },
  {
    type: "Psychic",
    color: "#85144b"
  },
  {
    type: "Rock",
    color: "#7F7A33"
  },
  {
    type: "Ice",
    color: "#7FDBFF"
  },
  {
    type: "Bug",
    color: "#9AB223"
  },
  {
    type: "Dragon",
    color: "#6F35FC"
  },
  {
    type: "Ghost",
    color: "#55007F"
  },
  {
    type: "Dark",
    color: "#664A3D"
  },
  {
    type: "Steel",
    color: "#708090"
  },
  {
    type: "Fairy",
    color: "#D685AD"
  }
];

const sortByOptions = [
  {
    buttonText: "A-Z",
    buttonArgument: "name"
  },
  {
    buttonText: "Z-A",
    buttonArgument: "name"
  },
  {
    buttonText: "Height - to +",
    buttonArgument: "height"
  },
  {
    buttonText: "Height + to -",
    buttonArgument: "height"
  },
  {
    buttonText: "Weight - to +",
    buttonArgument: "weight"
  },
  {
    buttonText: "Weight + to -",
    buttonArgument: "weight"
  },
  {
    buttonText: "Number - to +",
    buttonArgument: "id"
  },
  {
    buttonText: "Number + to -",
    buttonArgument: "id"
  }
];

/******************** Llamada de datos ********************/

async function getData() {
  const dataRequest = await fetch(DATA_URL);
  const dataJSON = await dataRequest.json();
  return dataJSON;
}

const main = () => {
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
  let typeImagesSRC = "image/typesWhite/";
  let typeImageExtension = ".svg";
  let colorByType;
  let pokemonName;
  let orderArray = [];
 
  pokemonContainerElement.innerHTML = "";
  
  let concatTemplateElements = "";

  dataArray.forEach((element) => { 

    if (element.name == "Nidoran ♀ (Female)" || element.name == "Nidoran ♂ (Male)") {
      pokemonName = element.name.substring(0, 9);
    } else {
      pokemonName = element.name;
    } 
  
    for (let i = 0; i < typeArray.length; i++) {
      if (element.type[0] == typeArray[i].type) {
          colorByType = typeArray[i].color;
        break;
      }
    }

    const pokemonCardsTemplate = `
    <div class="divContainerClass">
      <div class="divCardClass">
          <div id="divPokemonCard" style = ${"background-color:" + colorByType} tabindex="0" class="divPokemonCardFaceClass divPokemonCardFaceClass--front">
              <img class="imagePokemon" src = ${element.img} alt= ${element.name}>
              <p class="numberPokemon">${element.num}</p>
              <p class="namePokemon">${pokemonName}</p>
          </div>
          <div id="divBackPokemonCard" style = ${"background-color:" + colorByType} class="divPokemonCardFaceClass divPokemonCardFaceClass--back">
              ${
                  element.type.map((typeElement) => {
                      return '<img src="' + typeImagesSRC + typeElement + typeImageExtension +'" class="typePokemonIMG">' +
                      '<p class="typePokemon">' + typeElement + '</p>'
                  }).join("")
              }
          </div>
      </div>
    </div>`;


    orderArray.push(element.name);
    concatTemplateElements = concatTemplateElements + pokemonCardsTemplate;
  }); 

  pokemonContainerElement.innerHTML = concatTemplateElements;

  let backCards = document.getElementsByClassName("divPokemonCardFaceClass--back");

  for(let i=0; i< backCards.length;i++){
    backCards[i].addEventListener("click", function() {
      characterWindowPrint(orderArray[i].toUpperCase());
    });
  }

  let frontCards = document.getElementsByClassName("divPokemonCardFaceClass--front");
  for(let i=0; i< frontCards.length; i++){
    frontCards[i].addEventListener("keyup", function(e) {
      if (e.keyCode === 13) {
        characterWindowPrint(orderArray[i].toUpperCase());
      }
    });
  }  

};

/******************** Short cut Event listener ********************/

/*********************** Floating menu ***********************/
let toggleElement = document.getElementById("toggle");
let floatingMenuButton = document.getElementById("floatingMenu");
let floatingMenuElements = document.getElementsByClassName(
  "floatingMenuElement"
);

toggleElement.addEventListener("change", () => {
  if (toggleElement.checked == true) {
    openFloatingMenu();
  } else {
    closeFloatingMenu();
  }
});
/*** Abrir menú con Enter ***/
floatingMenuButton.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    if (toggleElement.checked === false) {
      toggleElement.checked = true;
      openFloatingMenu();
    } else {
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
};

/** short cut to focus */
document.addEventListener("keyup", function(event) {
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
};

/**************************** Reset function *************************************/
document.getElementById("resetButton").addEventListener("click", () => {
  closeFloatingMenu();
  filterJSON = [];
  printPokemonCards(dataPokemon);
});

/**** Reset with short cut ****/
document.addEventListener("keyup", function(event) {
  if (event.altKey && event.key === "r") {
    closeFloatingMenu();
    filterJSON = [];
    printPokemonCards(dataPokemon);
  }
});

/************************  Search modal  *********************************/
document.getElementById("searchButton").addEventListener("click", () => {
  searchPromptCreator();
});

document.getElementById("searchButton").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    searchPromptCreator();
  }
});

/**** Short cut ****/
document.addEventListener("keyup", function(event) {
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
  if (searchPromptInputElement.value != "") {
    filterJSON = window.data.filteredByNameOrNumber(
      dataPokemon,
      searchPromptInputElement.value
    );
    filterJSON == ""
      ? printPokemonCards(dataPokemon)
      : printPokemonCards(filterJSON);
    hiddenPromptWindow();
  } else {
    printPokemonCards(dataPokemon);
  }
});

document.getElementById("searchPromptInput").addEventListener("input", () => {
  searchPromptInputElement.value = searchPromptInputElement.value.replace(
    " ",
    ""
  );
  searchPromptInputElement.value = searchPromptInputElement.value.toUpperCase();
  if (searchPromptInputElement.value != "") {
    filterJSON = window.data.filteredByNameOrNumber(
      dataPokemon,
      searchPromptInputElement.value
    );
    printPokemonCards(filterJSON);
  } else {
    printPokemonCards(dataPokemon);
  }
});

document
  .getElementById("searchPromptInput")
  .addEventListener("keyup", event => {
    if (event.keyCode === 13) {
      searchByInput();
    }
  });

const searchByInput = () => {
  if (searchPromptInputElement.value != "") {
    filterJSON = window.data.filteredByNameOrNumber(
      dataPokemon,
      searchPromptInputElement.value
    );
    filterJSON == ""
      ? printPokemonCards(dataPokemon)
      : printPokemonCards(filterJSON);
    hiddenPromptWindow();
  } else {
    printPokemonCards(dataPokemon);
  }
};

/************************  Filter modal  *********************************/
document.getElementById("filterButton").addEventListener("click", () => {
  filterPromptCreator();
});

document.getElementById("filterButton").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    filterPromptCreator();
  }
});

/**** Short cut ****/
document.addEventListener("keyup", function(event) {
  if (event.altKey && event.key === "c") {
    filterPromptCreator();
  }
});

const filterPromptCreator = () => {
  closeFloatingMenu();
  for (let i = 0; i < 15; i++) {
    let buttonElement = document.createElement("BUTTON");
    buttonElement.classList.add("filterByTypeButton");
    buttonElement.value = typeArray[i].type;
    buttonElement.innerHTML = typeArray[i].type;
    buttonElement.id = typeArray[i].type;
    buttonElement.style.backgroundColor = typeArray[i].color;
    buttonElement.tabIndex = 0;
    buttonElement.focus();
    buttonElement.addEventListener("click", function() {
      filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
      filterJSON == ""
        ? printPokemonCards(dataPokemon)
        : printPokemonCards(filterJSON);
      hiddenPromptWindow();
    });
    buttonElement.addEventListener("keyup", function(e) {
      if (e.keyCode === 13) {
        filterJSON = window.data.filteredByType(
          dataPokemon,
          buttonElement.value
        );
        filterJSON == ""
          ? printPokemonCards(dataPokemon)
          : printPokemonCards(filterJSON);
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
  let buttonIsPair;

  for (let i = 0; i < sortByOptions.length; i++) {
    buttonIsPair = i % 2;
    let buttonElement = document.createElement("BUTTON");
    buttonElement.classList.add("filterByTypeButton");
    // buttonElement.value = sortByArray[i];
    // buttonElement.innerHTML = sortByArray[i];
    buttonElement.value = sortByOptions[i].buttonText;
    buttonElement.innerHTML = sortByOptions[i].buttonText;
    buttonElement.style.backgroundColor = typeArray[i].color;
    buttonElement.addEventListener("click", function() {
      if (filterJSON != "") {
        if (i == 0 || i == 2 || i == 4 || i == 6) {
          sortByJSON = window.data.sortDataResultDesc(
            filterJSON,
            // sortArrayConditions[i]
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
/*document.getElementById("homeButton").addEventListener("click", () => {
  printPokemonCards(dataPokemon);
  filterJSON = [];
  console.log("Reset");
});*/

/*************************  Modal manager  *********************************/
const showPromptWindow = option => {
  /*** Regresar al principio de la pagina ***/
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  /**************************************************/
  promptContainerElement.style.visibility = "visible";

  switch (option) {
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

promptContainerElement.addEventListener("click", element => {
  if (element.target.id === "promptContainer") {
    hiddenPromptWindow();
  }
});

promptContainerElement.addEventListener("keyup", event => {
  if (event.key === "Escape") {
    hiddenPromptWindow();
  }
});

Array.from(buttonCloseNode).forEach(element => {
  element.addEventListener("click", i => {
    typeButtonsDiv.innerHTML = "";
    hiddenPromptWindow();
    if (pokemonContainerElement.innerHTML == "") {
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
  if(toggleFavElement.checked === true){
    showFavorites();
  }
};

/************************ Favorites window ************************/
/** Show favorites*/


document.getElementById("favoritesButton").addEventListener("click", () => {
  toggleFavElement.checked = true;
  showFavorites();
});

document.getElementById("homeButton").addEventListener("click", () => {
  toggleFavElement.checked = false;
  printPokemonCards(dataPokemon);
  homeButtonElement.style.visibility = "hidden";
});

const loadFavorites = () => {
  let pokemonCookiesStr = document.cookie.substring(16, document.cookie.length);
  let pokemonCookiesArray = pokemonCookiesStr.split(" ");
  return pokemonCookiesArray;
};

const createFavoriteCookie = pokemonId => {
  let pokemonCookiesArray = loadFavorites();
  pokemonCookiesArray.push(pokemonId);
  document.cookie =
    "favoritePokemon=" +
    pokemonCookiesArray.join(" ") +
    "; expires =Mo, 18 Jan 2038 12:00:00 UTC";
};

const deleteFavorite = pokemonId => {
  let pokemonCookiesArray = loadFavorites();
  let index = pokemonCookiesArray.indexOf(pokemonId);

  index > -1
    ? pokemonCookiesArray.splice(index, 1)
    : console.error("No existe ese id en favoritos");
  document.cookie = "favoritePokemon=" + pokemonCookiesArray.join(" ");
};

const showFavorites = () => {
  homeButtonElement.style.visibility = "visible";
  let pokemonCookiesArray = loadFavorites();
  let favoritesJSON = [];
  dataPokemon.forEach(element => {
    pokemonCookiesArray.forEach(favoriteID => {
      if (favoriteID === element.name.toUpperCase()) {
        favoritesJSON.push(element);
      }
    });
  });

  if (favoritesJSON != "") {
    printPokemonCards(favoritesJSON);
  } else {
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

const characterWindowPrint = pokemonName => {
  console.log("Nombre enviado", pokemonName);
  //Preparar data del pokemon elegido
  let searchPokemon = window.data.filteredByNameOrNumber(
    dataPokemon,
    pokemonName
  );
  let characterData; //Fix para Mew
  if(searchPokemon.length > 1){
    characterData = searchPokemon[1];
  }else {
    characterData = searchPokemon[0];
  }

  // let characterData = searchPokemon[0];
  console.log("Respuesta search", characterData);
  let pokemonCookiesArray = loadFavorites();

  // Configuración de botón de favoritos
  if (pokemonCookiesArray.indexOf(pokemonName) != -1) {
    catchItAnimation(1, 0); /*el pokemon esta en favoritos*/
  } else {
    catchItAnimation(2, 0);
  }

  // Color de ventana
  let i = 0;
  for (i; i < typeArray.length; i++) {
    if (characterData.type[0] == typeArray[i].type) {
      break;
    }
  }
  //characterWindowElement.setAttribute("style", "background-color: " + typeArray[i].color);
  characterWindowElement.setAttribute(
    "style",
    "border-color: " + typeArray[i].color
  );

  //Carga la imagen del pokemon
  let cuteImageSRC = "https://pokeres.bastionbot.org/images/pokemon/";
  let cuteImageExt = ".png";
  characterImageElement.setAttribute(
    "src",
    cuteImageSRC + characterData.id + cuteImageExt
  ); // Si la comentas sale la imagen linda
  // characterDynamicDiv
  /****************************************************************************************/
  let characterTitle = document.createElement("DIV");
  /*let templateString = `<div class="columnAlignmentClass" style="color:#${typeArray[i].color}"></div>`;
    mimimi.innerHTML = templateString;*/
  characterTitle.classList.add("columnAlignmentClass");
  characterDynamicDiv.appendChild(characterTitle);
  // characterTitleName -- Global
  characterTitleName.classList.add("textFormatBig");
  characterTitleName.setAttribute("style", "color: " + typeArray[i].color);
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
  characterGeneralData.setAttribute(
    "style",
    "border-color: " + typeArray[i].color
  );
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
  characterCandyData.setAttribute(
    "style",
    "border-color: " + typeArray[i].color
  );
  characterDynamicDiv.appendChild(characterCandyData);

  let characterCandyDiv = document.createElement("DIV");
  characterCandyDiv.classList.add("columnAlignmentClass");
  characterCandyDiv.classList.add("rightBorderClass");
  characterCandyDiv.setAttribute(
    "style",
    "border-color: " + typeArray[i].color
  );
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
  if ("candy_count" in characterData) {
    characterCandyCountNumber.innerHTML = characterData.candy_count;
  } else {
    characterCandyCountNumber.innerHTML = " - ";
  }
  characterCandyCountNumber.classList.add("textFormatMedium");
  characterCandyCountDiv.appendChild(characterCandyCountNumber);

  let characterCandyCountTitle = document.createElement("P");
  characterCandyCountTitle.innerHTML = "Candy Count";
  characterCandyCountTitle.classList.add("textFormatSmall");
  characterCandyCountDiv.appendChild(characterCandyCountTitle);

  /****************************************************************************************/
  let additionalDataAuxiliarDiv = document.createElement("DIV");
  additionalDataAuxiliarDiv.classList.add("columnAlignmentClass");
  characterDynamicDiv.appendChild(additionalDataAuxiliarDiv);

  let characterWeaknessDiv = document.createElement("DIV");
  characterWeaknessDiv.classList.add("columnAlignmentClass");
  additionalDataAuxiliarDiv.appendChild(characterWeaknessDiv);

  let characterWeaknessTitle = document.createElement("P");
  characterWeaknessTitle.innerHTML = "Weakness";
  characterWeaknessTitle.classList.add("textFormatSmall");
  characterWeaknessDiv.appendChild(characterWeaknessTitle);

  let characterWeaknessType = document.createElement("DIV");
  characterWeaknessType.classList.add("rowAlignmentClass");
  characterWeaknessDiv.appendChild(characterWeaknessType);
  characterData.weaknesses.forEach(element => {
    let characterWeaknessTypeContainer = document.createElement("DIV");
    characterWeaknessTypeContainer.classList.add(
      "characterWeaknessTypeContainer"
    );
    characterWeaknessType.appendChild(characterWeaknessTypeContainer);

    let characterWeaknessTypeLogo = document.createElement("IMG");
    characterWeaknessTypeLogo.setAttribute(
      "src",
      "image/types/" + element + ".svg"
    );
    characterWeaknessTypeLogo.classList.add("weaknessImgClass");
    characterWeaknessTypeContainer.appendChild(characterWeaknessTypeLogo);

    let characterWeaknessTypeName = document.createElement("P");
    characterWeaknessTypeName.innerHTML = element;
    characterWeaknessTypeName.classList.add("weaknessTextFormat");
    characterWeaknessTypeContainer.appendChild(characterWeaknessTypeName);
  });

  let characterAdditionalData = document.createElement("DIV");
  characterAdditionalData.classList.add("rowAlignmentClass");
  characterDynamicDiv.appendChild(characterAdditionalData);

  let characterInfoDiv = document.createElement("DIV");
  characterInfoDiv.classList.add("columnAlignmentClass");
  characterAdditionalData.appendChild(characterInfoDiv);

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
  characterEvolutionTitle.innerHTML = "Evolution path";
  characterEvolutionTitle.classList.add("textFormatSmall");
  characterEvolutionDiv.appendChild(characterEvolutionTitle);

  let characterEvolutionPathContainer = document.createElement("DIV");
  characterEvolutionPathContainer.classList.add("rowAlignmentClass");
  characterEvolutionDiv.appendChild(characterEvolutionPathContainer);

  /*** Evolution path ******/
  /** Concatenar arreglos de prev_evolution, pokemon actual y next_evolution */
  let evolutionPathArray = [];

  if ("prev_evolution" in characterData) {
    evolutionPathArray = evolutionPathArray.concat(
      characterData.prev_evolution.map(elementArray => {
        let found = dataPokemon.filter(element => {
          return element.name === elementArray.name;
        });
        return { name: elementArray.name, img: found ? found[0].img : "" };
      })
    );
  }

  evolutionPathArray = evolutionPathArray.concat([
    {
      name: characterData.name,
      img: characterData.img
    }
  ]);

  if ("next_evolution" in characterData) {
    evolutionPathArray = evolutionPathArray.concat(
      characterData.next_evolution.map(elementArray => {
        let found = dataPokemon.filter(element => {
          return element.name === elementArray.name;
        });
        return { name: elementArray.name, img: found ? found[0].img : "" };
      })
    );
  }
  console.log("Result:", evolutionPathArray);

  for (let j = 0; j < evolutionPathArray.length; j++) {
    let characterEvolutionBox = document.createElement("DIV");
    characterEvolutionBox.classList.add("columnAlignmentClass");
    characterEvolutionPathContainer.appendChild(characterEvolutionBox);

    let characterEvolutionIMG = document.createElement("IMG");
    characterEvolutionIMG.setAttribute("src", evolutionPathArray[j].img);
    characterEvolutionIMG.classList.add("weaknessImgClass");
    characterEvolutionBox.appendChild(characterEvolutionIMG);

    let characterEvolutionName = document.createElement("P");
    characterEvolutionName.innerHTML = evolutionPathArray[j].name;
    characterEvolutionName.classList.add("textFormatSmall");
    characterEvolutionBox.appendChild(characterEvolutionName);
    if (j < evolutionPathArray.length - 1) {
      let characterEvolutionArrowBox = document.createElement("DIV");
      characterEvolutionArrowBox.classList.add("columnAlignmentClass");
      characterEvolutionArrowBox.classList.add("evolutionPathArrow");
      characterEvolutionPathContainer.appendChild(characterEvolutionArrowBox);

      let characterEvolutionArrow = document.createElement("P");
      characterEvolutionArrow.innerHTML = "=>";
      characterEvolutionArrow.classList.add("textFormatSmall");
      characterEvolutionArrowBox.appendChild(characterEvolutionArrow);
    }
  }

  /****************************************************************************************/
  showPromptWindow(4);
};

const catchItAnimation = (status, animation) => {
  let shrinkAnimationDelay = 0;
  let showElementDelay = 0;
  /* Define si hace la animacion */
  if (animation === 1) {
    shrinkAnimationDelay = 300;
    showElementDelay = 1000;
  }

  if (status === 1) {
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
