const DATA_URL = "https://raw.githubusercontent.com/AryMF/GDL004-data-lovers/master/src/data/pokemon/pokemon.json";
const DATA_API_POKE_ENTRY = "https://pokeapi.co/api/v2/pokemon-species/";
let dataPokemon = [];
let filterJSON = [];
let dataPokedexArray = [];

/***********Main window *********************/
let pokemonContainerElement = document.getElementById("pokemonContainer");
let buttonLanguageEN = document.querySelector("#languageEN");
let toggleLanguageEN = document.querySelector("#toggleLanguageEN");
let buttonLanguageES = document.querySelector("#languageES");
let toggleLanguageES = document.querySelector("#toggleLanguageES");
let homeButtonElement = document.getElementById("homeButton");
let toggleFavElement = document.getElementById("toggleFav");
let favoritesButton = document.getElementById("favoritesButton");
let toggleChartsElement = document.getElementById("toggleCharts");
let chartButton = document.getElementById("chartButton");
let activeFilterAndSortContainer = document.getElementById("activeFilterAndSort");
let activeFilterAndSortTags= document.querySelectorAll("#activeFilterAndSort p");
let clearFavoritesContainer = document.querySelector("#clearFavoritesDiv");
let clearFavoritesButton = document.querySelector(".clearFavoritesButton");
let chartsContainerElement = document.querySelector(".chartsContainerClass");
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
let characterWindowElement = document.querySelector("#characterWindow");
let pokeballAndImagDiv = document.querySelector(".pokeballAndImagDiv");
let characterDynamicDiv = document.querySelector("#characterDynamicContent");
/*********** Text to speech *********************/
let dexterVoice = document.querySelector(".dexterVoice");
let language = 1;
let voiceStatusFlag = false;
var synth = window.speechSynthesis;

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

/********** Animación de intro ******************************/

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

const animationDataLoadingEnd = () => {
    let time = 1;
    let i = 1;
    let intervalTime = 300;
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
                        mainScreenDiv.style.visibility = "visible";
                        floatingMenu.style.visibility = "visible";
                        openFloatingMenu();
                    },1000);
                    clearInterval(intervalTwo);
                }
            }, 1500);
        }
        i++;
    }, intervalTime);
};

rippler.addEventListener("animationend", function(e){
    ripple_wrap.classList.remove('goripple');

});
/**/

/******************** Llamada de datos ********************/
/**** Pokedex entries ****/
const apiCallFunction = (url = "", option = {}) => {
  const http_method = option.method || "GET"; //Código de defensa
  return fetch(url, {method: http_method});
};

async function getPokemonData (){
  let URL;
  let promisesArray = [];
  for (let i = 0; i < dataPokemon.length; i++){
    URL = DATA_API_POKE_ENTRY + dataPokemon[i].id;
    promisesArray.push(apiCallFunction(URL, {method: "GET"}));
  }

  Promise.all(promisesArray)
  .then(responses => Promise.all(responses.map(element => element.json())))
  .then(jsonObjects => {
    jsonObjects.forEach(element => {
      let flavorTextArrayES = element.flavor_text_entries.filter(e => {
        if(e.language.name == "es" && e.version.name == "omega-ruby"){
            return true;
        }
        return false;
      });
      let flavorTextArrayEN = element.flavor_text_entries.filter(e => {
          if(e.language.name == "en" && e.version.name == "omega-ruby"){
              return true;
          }
          return false;
      });
      dataPokedexArray.push(
      {
          "id": element.id,
          "flavor_text_es": flavorTextArrayES[0].flavor_text,
          "flavor_text_en": flavorTextArrayEN[0].flavor_text
      });
    });
  })
  .catch(error => {
    console.error("Error al cargar pokedex entries");
    console.error(error);
  });


};

/**** */
async function getData() {
  const dataRequest = await fetch(DATA_URL);
  const dataJSON = await dataRequest.json();
  return dataJSON;
}

const main = () => {
  getData()
    .then(dataJSON => {
      dataPokemon = dataJSON.pokemon;
      getPokemonData().then( () => {
        printPokemonCards(dataPokemon);
        animationDataLoadingEnd(); /**Descomentar para animación intro */
        console.log(document.cookie.indexOf("favoritePokemon"));
      });
    })
    .catch(error => {
      console.error("Error al cargar JSON por fetch");
      console.error(error);
    });
};

window.addEventListener("load", main);

/************************ Dark mode *************************/

toggleDarkMode.addEventListener("click", () => {
  document.body.getAttribute("data-mode") == "light" ? document.body.setAttribute("data-mode", "dark"): document.body.setAttribute("data-mode", "light");
});

/********** Impresión en pantalla de Pokemon cards **********/

const printPokemonCards = (dataArray, filterByText = "All", sortByText = "All") => {
    let typeImagesSRC = "image/typesWhite/";
    let typeImageExtension = ".svg";
    let colorByType;
    let pokemonName;
    let orderArray = [];

    activeFilterAndSortTags[1].innerHTML = filterByText;
    activeFilterAndSortTags[4].innerHTML = sortByText;

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
        <div class="divCardClass" tabindex="0">
            <div id="divPokemonCard" style = ${"background-color:" + colorByType}  class="divPokemonCardFaceClass divPokemonCardFaceClass--front">
                <img class="imagePokemon" src = "https://pokeres.bastionbot.org/images/pokemon/${element.id}.png" alt= ${element.name}>
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

    //impresion en pantalla
    pokemonContainerElement.innerHTML = concatTemplateElements;

    let cardClass = document.querySelectorAll(".divCardClass");

    for(let i=0; i< cardClass.length;i++){
      cardClass[i].addEventListener("click", function() {
        characterWindowPrint(orderArray[i]);
      });
    }

    for(let i=0; i< cardClass.length; i++){
      cardClass[i].addEventListener("keyup", event => {
        if (event.key === "Enter") {
          characterWindowPrint(orderArray[i]);
        }
      });
    }
};

/******************** Event listeners ********************/

buttonLanguageEN.addEventListener("click", () => {
  toggleLanguageES.checked = false;
  toggleLanguageEN.checked = true;
  language = 1;
});

buttonLanguageEN.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    toggleLanguageES.checked = false;
    toggleLanguageEN.checked = true;
    language = 1;
  }
});

buttonLanguageES.addEventListener("click", () => {
  toggleLanguageEN.checked = false;
  toggleLanguageES.checked = true;
  language = 0;
});

buttonLanguageES.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    toggleLanguageEN.checked = false;
    toggleLanguageES.checked = true;
    language = 0;
  }
});

/*********************** Floating menu ***********************/
let toggleElement = document.getElementById("toggle");
let floatingMenuButton = document.getElementById("floatingMenu");
let floatingMenuElements = document.getElementsByClassName("floatingMenuElement");

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
  activeFilterAndSortContainer.style.display = "none";
});

document.getElementById("resetButton").addEventListener("keyup", event => {
  if (event.key === "Enter") {
    closeFloatingMenu();
    filterJSON = [];
    printPokemonCards(dataPokemon);
    activeFilterAndSortContainer.style.display = "none";
  }
});

/**** Reset with short cut ****/
document.addEventListener("keyup", function(event) {
  if (event.altKey && event.key === "r") {
    closeFloatingMenu();
    filterJSON = [];
    printPokemonCards(dataPokemon);
    activeFilterAndSortContainer.style.display = "none";
  }
});

/**********Mandar a home con click en titulo */
document.querySelector(".titleText").addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
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
    filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
    searchResultEvaluation();
    hiddenPromptWindow();
  } else {
    printPokemonCards(dataPokemon);
  }
});

document.getElementById("searchPromptInput").addEventListener("input", () => {
      // Regresar al principio de la pantalla
    document.documentElement.scrollTop = 0;
    searchPromptInputElement.value = searchPromptInputElement.value.replace(" ", "");
    if(searchPromptInputElement.value != ""){
        filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
        searchResultEvaluation();
    }else {
        activeFilterAndSortContainer.style.display = "flex";
        printPokemonCards(dataPokemon);
    }
});

document.getElementById("searchPromptInput").addEventListener("keyup", event => {
    if (event.keyCode === 13) {
      searchByInput();
    }
});

const searchByInput = () =>{
    // Regresar al principio de la pantalla
    document.documentElement.scrollTop = 0; 
    if(searchPromptInputElement.value != ""){
        filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
        searchResultEvaluation();
        hiddenPromptWindow();
    }else {
        activeFilterAndSortContainer.style.display = "flex";
        printPokemonCards(dataPokemon);
    }
};

const searchResultEvaluation = () => {
  if(filterJSON == ""){
    pokemonContainerElement.innerHTML = "";
    activeFilterAndSortContainer.style.display = "none";
    const favoritesWindowEmptyTemplate = `
      <div class="favoritesWindowEmptyClass">
      <p class="textFormatMedium">Wild MISSINGNO. appeared!</p>
      <img class="favoritesWindowImageClass" src="image/MissingNo.png" alt="Image: Favorites/Search is empty">
      <p class="textFormatSmall">There's no matching Pokemons for your search.</p>
      </div>`;

    pokemonContainerElement.innerHTML = favoritesWindowEmptyTemplate;
  } else {
    activeFilterAndSortContainer.style.display = "flex";
    printPokemonCards(filterJSON, "\"" + searchPromptInputElement.value + "\"");
  }
}

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
            activeFilterAndSortContainer.style.display = "flex";
            filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
            filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON, "\"" + buttonElement.value + "\"");
            hiddenPromptWindow();
        });
        buttonElement.addEventListener('keyup',function(e){
            if (e.keyCode === 13) {
                filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
                filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON, "\"" + buttonElement.value + "\"");
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
    activeFilterAndSortContainer.style.display = "flex";

        if (filterJSON.length > 0) {
        if (i == 0 || i == 2 || i == 4 || i == 6) {
            sortByJSON = window.data.sortDataResultDesc(
            filterJSON, sortByOptions[i].buttonArgument);
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
      printPokemonCards(sortByJSON, activeFilterAndSortTags[1].innerHTML, sortByOptions[i].buttonText);
      hiddenPromptWindow();
    });
    sortByButtons.appendChild(buttonElement);
  }
  sortByPromptElement.style.WebkitAnimationPlayState = "running";
  showPromptWindow(1);
  document.getElementById("A-Z").focus();
};

/*************************  Modal manager  *********************************/
const showPromptWindow = (option) => {
    promptContainerElement.style.visibility = "visible";
    switch(option){
        case 1:
            blockScroll();
            sortByPromptElement.style.visibility = "visible";
        break;
        case 2:
            blockScroll();
            filterByPromptElement.style.visibility = "visible";
        break;
        case 3:
            searchByPromptElement.style.visibility = "visible";
        break;
        case 4:
            blockScroll();
            characterWindowElement.style.visibility = "visible";
        break;
        default:
        break;
    }
};

const blockScroll = () => {
    //***Bloquear scroll */
    let scrollPositionY = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
    document.body.style.top = scrollPositionY;
};

const activateScroll = () => {
  //Reactivar Scroll
  let scrollPositionY;
  if (characterWindowElement.style.visibility == "visible"){
    scrollPositionY = document.body.style.top;
  }
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollPositionY || '0') * -1);
  //*************
};

/************************  Close modal  *********************************/

promptContainerElement.addEventListener("click", element => {
  if (element.target.id === "promptContainer") {
    hiddenPromptWindow();
  }
});

promptContainerElement.addEventListener("keyup", event => { //1988
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
  activateScroll();
  typeButtonsDiv.innerHTML = "";
  promptContainerElement.style.visibility = "hidden";
  searchPromptInputElement.value = "";
  sortByPromptElement.style.visibility = "hidden";
  sortByButtons.innerHTML = "";
  filterByPromptElement.style.visibility = "hidden";
  searchByPromptElement.style.visibility = "hidden";
  characterWindowElement.style.visibility = "hidden";
  pokeballAndImagDiv.innerHTML = "";
  characterDynamicDiv.innerHTML = "";
  if(toggleFavElement.checked === true){
    showFavorites();
  }
  /**Detener voz */
  synth.cancel();
  dexterVoice.disabled = false;
  dexterVoice.classList.remove("noHover");
};

/************************ Home window ************************/
homeButtonElement.addEventListener("click", () => { //Cambio
  printHomeWindow();
  printPokemonCards(dataPokemon);
});

homeButtonElement.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    printHomeWindow();
    printPokemonCards(dataPokemon);
  }
});

const printHomeWindow = () => {
  toggleFavElement.checked = false;
  toggleChartsElement.checked = false;
  homeButtonElement.setAttribute("style", "display: none;");
  /***Cerrar Favoritos */
  floatingMenu.style.visibility = "visible";
  clearFavoritesContainer.style.display = "none";
  filterJSON = [];
  /***Cerrar Charts */
  chartsContainerElement.innerHTML = "";
  chartsContainerElement.style.visibility = "hidden";
  /***Abrir Main */
  pokemonContainerElement.style.visibility = "visible";
};

/************************ Favorites window ************************/
/** Show favorites*/
favoritesButton.addEventListener("click", () => {
  printFavoritesWindow();
  showFavorites();
});

favoritesButton.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    printFavoritesWindow();
    showFavorites();
  }
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
};

const deleteFavorite = (pokemonName) => {
    let pokemonCookiesArray = loadFavorites();
    let index = pokemonCookiesArray.indexOf(pokemonName);

    index > -1 ? pokemonCookiesArray.splice(index, 1) : console.error("No existe ese id en favoritos");
    document.cookie = "favoritePokemon=" + pokemonCookiesArray.join(" ");
};

const printFavoritesWindow = () => {
  closeFloatingMenu();
  toggleFavElement.checked = true;
  toggleChartsElement.checked = false;
  homeButtonElement.setAttribute("style", "display: initial;");
  pokemonContainerElement.style.visibility = "visible";
  /***Cerrar Main */
  pokemonContainerElement.innerHTML = "";
  floatingMenu.style.visibility = "hidden";
  activeFilterAndSortContainer.style.display = "none";
  /***Cerrar Charts */
  chartsContainerElement.innerHTML = "";
  chartsContainerElement.style.visibility = "hidden";
};


const showFavorites = () => {
  let pokemonCookiesArray = loadFavorites();
  //Usar filterJSON global
  filterJSON = [];
  // let filterJSON = [];
  dataPokemon.forEach(element => {
    pokemonCookiesArray.forEach(favoriteID => {
      if (favoriteID === element.name.toUpperCase()) {
        filterJSON.push(element);
      }
    });
  });

  if (filterJSON.length > 0) {
    printPokemonCards(filterJSON);
    clearFavoritesContainer.style.display = "flex";
  } else {
    pokemonContainerElement.innerHTML = "";    

    const favoritesWindowEmptyTemplate = `
      <div class="favoritesWindowEmptyClass">
      <p class="textFormatMedium">You haven't catch any pokemon yet!</p>
      <img class="favoritesWindowImageClass" src="image/psyduck.png" alt="Image: Favorites/Search is empty">
      </div>`;

    pokemonContainerElement.innerHTML = favoritesWindowEmptyTemplate;
  }
};

clearFavoritesButton.addEventListener("click", () => {
  // document.getElementsByTagName("BODY")[0].setAttribute("data-mode", "dark"); //dark mode 
  clearFavoritesContainer.style.display = "none";
  document.cookie = "favoritePokemon=";
  showFavorites();
});

/************************** Charts window **************************/
let chartCategory = "weight";
let chartFilter = 1;
let chartElement;

chartButton.addEventListener("click", () => {
    printChartsWindow();
    showCharts();
});

chartButton.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    printChartsWindow();
    showCharts();
  }
});

const printChartsWindow = () => {
  closeFloatingMenu();
    toggleChartsElement.checked = true;
    toggleFavElement.checked = false;
    homeButtonElement.setAttribute("style", "display: initial;");

    pokemonContainerElement.innerHTML = "";
    pokemonContainerElement.style.visibility = "hidden";
    activeFilterAndSortContainer.style.display = "none";
    clearFavoritesContainer.style.display = "none";
    chartsContainerElement.style.visibility = "visible";
    floatingMenu.style.visibility = "hidden";
};

const showCharts = () => {
    const chartsWindowTemplate = `
      <h2 class="textFormatBig" style="letter-spacing: 10px;">Charts</h2>
      <br/>
      <div class="chartDynamicContent">
          <div class="chartOptions columnAlignmentClass">
              <p class="textFormatMedium">Category</p>
              <nav>
                  <label class="container textFormatBig" tabindex="0">Weight
                      <input type="radio" name="chartCategory" value="weight" checked>
                      <span class="checkmark"></span>
                  </label>
                  <label class="container textFormatBig" tabindex="0">Height
                      <input type="radio" name="chartCategory" value="height">
                      <span class="checkmark"></span>
                  </label>
                  <label class="container textFormatBig" tabindex="0">Spawn Chances
                      <input type="radio" name="chartCategory" value="spawn_chance">
                      <span class="checkmark"></span>
                  </label>
              </nav>
              <p class="textFormatMedium">Show</p>
              <nav>
                  <label class="container textFormatBig" tabindex="0">Top ten
                      <input type="radio" name="chartFilter" value="1" checked>
                      <span class="checkmark"></span>
                  </label>
                  <label class="container textFormatBig" tabindex="0">Bottom ten
                      <input type="radio" name="chartFilter" value="2">
                      <span class="checkmark"></span>
                  </label>
              </nav>
              <!-- <section>
                <hr>
                <p class="textFormatSmall"> Average bla bla</p>
                <hr>
              </section> --!>
          </div>
          <div class="canvasContainer columnAlignmentClass ">
              <canvas id="chartCanvas"></canvas>
          </div>
      </div>`;

    chartsContainerElement.innerHTML = chartsWindowTemplate;

    let chartCategoryButton = document.querySelectorAll('[name="chartCategory"]');
    let chartFilterButton = document.querySelectorAll('[name="chartFilter"]');

    chartCategoryButton.forEach(element =>{
      element.addEventListener("change", (e) =>{
        console.log(element.checked, element.value);
        chartCategory = element.value;
        canvasChartDraw(chartCategory, chartFilter);
      });
    });

    chartFilterButton.forEach(element =>{
      element.addEventListener("change", (e) =>{
        console.log(element.checked, parseInt(element.value, 10));
        chartFilter = parseInt(element.value, 10);
        canvasChartDraw(chartCategory, chartFilter);
      });
    });

    canvasChartDraw(chartCategory, chartFilter);
};

const canvasChartDraw = (chartCategory, chartFilter) => {
  if(chartElement){
    chartElement.destroy();
  }

  let chartCanvas = document.querySelector("#chartCanvas");
  let chartData;
  let chartDataLabels;

  switch(chartFilter){
    case 1 :
        chartData = window.data.sortDataResultAsc(dataPokemon, chartCategory);
        chartData = chartData.slice(0, 10);
    break;
    case 2:
        chartData = window.data.sortDataResultDesc(dataPokemon, chartCategory);
        chartData = chartData.slice(0, 10);
    break;
    case 3:
        chartData = dataPokemon;
    break;
  }

  chartDataLabels = chartData.map(element => {
    return element.name
  });
  let chartDataContent = chartData.map(element => {
    return parseFloat(element[chartCategory]);
  });

  let chartDataColor = [];
  for(let i=0; i < chartData.length; i++){
    chartDataColor.push(typeArray[i].color);
  }

  chartElement = new Chart(chartCanvas, {
    type: 'polarArea',
    data: {
        labels: chartDataLabels,
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: chartDataColor,
            data: chartDataContent
          }
        ]
    },
    options: {
        title: {
          display: true,
          text: chartCategory.toUpperCase()
        }
    }
  });
}


/******************** Character window ********************/

const characterWindowPrint = (pokemonName) =>{
  characterWindowElement.focus();
    //Template necesario
    let evolutionPathArrowTemplate = `<div class="columnAlignmentClass evolutionPathArrow">
        <p class="textFormatSmall">&#8594;</p>
        </div>`;
    let evolutionPathIndex = 0; // Variable necesaria

    //Preparar data del pokemon elegido
    let searchPokemon = window.data.filteredByNameOrNumber(dataPokemon, pokemonName, true);
    let characterData = searchPokemon[0];

    let pokedexEntry = language == 0 ? dataPokedexArray[characterData.id-1].flavor_text_es
        : dataPokedexArray[characterData.id-1].flavor_text_en;

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
            let found = data.filteredByNameOrNumber(dataPokemon, elementArray.name);
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
            let found = data.filteredByNameOrNumber(dataPokemon, elementArray.name);
            return { "name": elementArray.name, "img": found ? found[0].img : ''};
        }));
    }
    /***** Fin de concatenación evolution path ****/

    characterWindowElement.setAttribute("style", "border-color: " + colorByType);

    //Ruta para la imagen del pokemon
    let cuteImageSRC = "https://pokeres.bastionbot.org/images/pokemon/";
    let cuteImageExt = ".png";

// characterDynamicDiv
/****************************************************************************************/
const characterWindowTemplate1 = `
  <!-- Botón animado pokeball -->
  <div id="divCatchIt" class="divCatchIt">
    <div id="divPokeballImage" class="divPokeballImage">
          <span class="tooltiptextPokeball popoverTextFormat">Catch it!</span>
          <svg id="pokeballImage" class="pokeballImage" viewbox="0 0 322 322" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="pokeball">
              <!-- Relleno rojo 1-->
              <path d="M160.63 9.44882C140.777 9.44875 121.118 13.3591 102.776 20.9567C84.4334 28.5543 67.7673 39.6902 53.7287 53.7287C39.6902 67.7673 28.5543 84.4334 20.9567 102.776C13.3591 121.118 9.44875 140.777 9.44882 160.63H311.812C311.812 140.777 307.902 121.118 300.304 102.776C292.707 84.4334 281.571 67.7673 267.532 53.7287C253.494 39.6902 236.827 28.5543 218.485 20.9567C200.143 13.3591 180.484 9.44875 160.63 9.44882V9.44882Z" fill="#800000"/>
              <!-- Border superior 2-->
              <path fill-rule="evenodd" clip-rule="evenodd" d="M99.1598 12.2271C118.648 4.1547 139.536 -7.53392e-05 160.63 1.02462e-09C181.725 -7.53392e-05 202.613 4.1547 222.101 12.2271C241.59 20.2995 259.298 32.1315 274.214 47.0474C289.129 61.9633 300.961 79.6712 309.034 99.1598C317.106 118.648 321.261 139.536 321.261 160.63C321.261 165.849 317.031 170.079 311.812 170.079H9.44882C4.23039 170.079 1.90745e-05 165.849 1.02461e-09 160.63C-7.53392e-05 139.536 4.15471 118.648 12.2271 99.1598C20.2995 79.6712 32.1315 61.9633 47.0474 47.0474C61.9634 32.1315 79.6712 20.2995 99.1598 12.2271ZM160.63 18.8976C142.018 18.8976 123.587 22.5636 106.392 29.6863C89.1957 36.809 73.5712 47.2489 60.4101 60.41C47.2489 73.5712 36.809 89.1957 29.6863 106.392C23.7715 120.671 20.2404 135.802 19.2129 151.182H302.048C301.02 135.802 297.489 120.671 291.575 106.392C284.452 89.1957 274.012 73.5712 260.851 60.41C247.69 47.2489 232.065 36.809 214.869 29.6863C197.674 22.5636 179.243 18.8976 160.63 18.8976Z" fill="black"/>
              <!-- Relleno blanco 3-->
              <path d="M160.63 311.812C180.484 311.812 200.143 307.902 218.485 300.304C236.827 292.707 253.494 281.571 267.532 267.532C281.571 253.494 292.707 236.827 300.304 218.485C307.902 200.143 311.812 180.484 311.812 160.631H9.44882C9.44875 180.484 13.3591 200.143 20.9567 218.485C28.5543 236.827 39.6902 253.494 53.7287 267.532C67.7673 281.571 84.4334 292.707 102.776 300.304C121.118 307.902 140.777 311.812 160.63 311.812V311.812Z" fill="white"/>
              <!-- Borde inferior 4-->
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.00976e-09 160.63C1.80232e-05 155.412 4.23039 151.182 9.44882 151.182H311.812C317.03 151.182 321.261 155.412 321.261 160.63C321.261 181.725 317.106 202.613 309.034 222.101C300.961 241.59 289.129 259.298 274.213 274.214C259.298 289.129 241.59 300.961 222.101 309.034C202.613 317.106 181.725 321.261 160.63 321.261C139.536 321.261 118.648 317.106 99.1598 309.034C79.6712 300.961 61.9634 289.129 47.0474 274.214C32.1315 259.298 20.2995 241.59 12.2271 222.101C4.15471 202.613 -7.47911e-05 181.725 1.00976e-09 160.63ZM19.2129 170.079C20.2404 185.459 23.7715 200.59 29.6863 214.869C36.809 232.065 47.2489 247.69 60.4101 260.851C73.5712 274.012 89.1957 284.452 106.392 291.575C123.587 298.697 142.018 302.363 160.63 302.363C179.243 302.363 197.674 298.697 214.869 291.575C232.065 284.452 247.69 274.012 260.851 260.851C274.012 247.69 284.452 232.065 291.575 214.869C297.489 200.59 301.02 185.459 302.048 170.079H19.2129Z" fill="black"/>
              <!-- Centro negro 5-->
              <path d="M160.63 217.323C191.941 217.323 217.323 191.941 217.323 160.63C217.323 129.32 191.941 103.938 160.63 103.938C129.32 103.938 103.938 129.32 103.938 160.63C103.938 191.941 129.32 217.323 160.63 217.323Z" fill="black"/>
              <!-- Centro blanco 6-->
              <path d="M160.63 198.426C181.504 198.426 198.426 181.504 198.426 160.63C198.426 139.757 181.504 122.835 160.63 122.835C139.757 122.835 122.835 139.757 122.835 160.63C122.835 181.504 139.757 198.426 160.63 198.426Z" fill="white"/>
              </g>
              <defs>
              <clippath id="clip0">
              <rect width="321.261" height="321.261" fill="white"/>
              </clippath>
              </defs>
          </svg>
    </div>
    <div id="divFavImage" class="divFavImage">
      <svg id="starFavImage" viewbox="0 0 308 293" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M145.432 5.23722C149.319 -1.22099 158.681 -1.22101 162.568 5.2372L207.773 80.3517C209.169 82.6718 211.446 84.3265 214.084 84.9375L299.492 104.718C306.835 106.419 309.728 115.323 304.787 121.015L247.318 187.219C245.543 189.264 244.673 191.941 244.907 194.639L252.487 281.979C253.138 289.488 245.564 294.991 238.623 292.051L157.901 257.853C155.408 256.796 152.592 256.796 150.099 257.853L69.3767 292.051C62.4363 294.991 54.8615 289.488 55.5132 281.979L63.0931 194.639C63.3272 191.941 62.4573 189.264 60.6822 187.219L3.21311 121.015C-1.72797 115.323 1.16533 106.419 8.50846 104.718L93.9156 84.9375C96.5536 84.3265 98.8311 82.6718 100.227 80.3517L145.432 5.23722Z" fill="#D4AF37"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M154 29.7871L117.364 90.6644C113.175 97.6247 106.342 102.589 98.4281 104.422L29.2091 120.453L75.7856 174.108C81.1108 180.243 83.7206 188.275 83.0182 196.368L76.875 267.153L142.297 239.437C149.777 236.268 158.223 236.268 165.703 239.437L231.125 267.153L224.982 196.368C224.279 188.275 226.889 180.243 232.214 174.108L278.791 120.453L209.572 104.422C201.658 102.589 194.825 97.6247 190.636 90.6644L154 29.7871ZM162.568 5.2372C158.681 -1.221 149.319 -1.22099 145.432 5.23722L100.227 80.3517C98.8311 82.6718 96.5536 84.3265 93.9156 84.9375L8.50846 104.718C1.16533 106.419 -1.72797 115.323 3.21311 121.015L60.6822 187.219C62.4573 189.264 63.3272 191.941 63.0931 194.639L55.5132 281.979C54.8615 289.488 62.4363 294.991 69.3767 292.051L150.099 257.853C152.592 256.796 155.408 256.796 157.901 257.853L238.623 292.051C245.564 294.991 253.138 289.488 252.487 281.979L244.907 194.639C244.673 191.941 245.543 189.264 247.318 187.219L304.787 121.015C309.728 115.323 306.835 106.419 299.492 104.718L214.084 84.9375C211.446 84.3265 209.169 82.6718 207.773 80.3517L162.568 5.2372Z" fill="black"/>
      </svg>
    </div>
  </div>
  <div class="characterImageDIV">
      <img id="characterImage" class="characterImageClass" src=${cuteImageSRC + characterData.id + cuteImageExt}>
  </div>
`;

pokeballAndImagDiv.innerHTML = characterWindowTemplate1;

const characterWindowTemplate2  = `
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
    <div class="columnAlignmentClass">
        <div class="columnAlignmentClass">
            <p class="textFormatSmall">Pokedex entry</p>
            <p class="textFormatPokeEntry">${pokedexEntry}</p>
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
                                '<img class="evolutionPathImgClass" src=' + element.img + '>' +
                                '<p class="textFormatSmall">' + element.name + '</p>' +
                                '</div>' + evolutionPathArrowTemplate
                            }else {
                                return '<div class="columnAlignmentClass">' +
                                '<img class="evolutionPathImgClass" src=' + element.img + '>' +
                                '<p class="textFormatSmall">' + element.name + '</p>' +
                            '</div>'
                            }
                        }).join("")
                    }
                <!-- /******* Fin map *****/ -->
            </div>
        </div>
    </div>`;

    characterDynamicDiv.innerHTML = characterWindowTemplate2;

    let elementDivPokeballImage = document.querySelector("#divPokeballImage");
    let elementPokeballImage = document.querySelector("#pokeballImage");
    let elementDivFavImage = document.querySelector("#divFavImage");
    let elementStarFavImage = document.querySelector("#starFavImage");
    let characterTitleName = document.querySelector("#characterPokemonName").innerHTML;

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

    // Llamar data de cookies favoritos
    let pokemonCookiesArray = loadFavorites();
    // Configuración de botón de favoritos
    if(pokemonCookiesArray.indexOf(pokemonName.toUpperCase()) != -1){
        catchItAnimation(1, 0); //el pokemon esta en favoritos
    }else {
        catchItAnimation(2, 0);
    }

    elementPokeballImage.addEventListener("click", () => {
      catchItAnimation(1, 1);
      //**Create cookie
      createFavoriteCookie(characterTitleName.toUpperCase());
      //** Refrescar pantalla favoritos
      if(toggleFavElement.checked === true){
        showFavorites();
      }
   });
   elementStarFavImage.addEventListener("click", () => {
      catchItAnimation(2, 1);
      //*** Remove cookie
      deleteFavorite(characterTitleName.toUpperCase().trim());
      //** Refrescar pantalla favoritos
      if(toggleFavElement.checked === true){
        showFavorites();
      }
    });

    //Links in evolution path
    let evolutionPathImgArray = document.querySelectorAll(".evolutionPathImgClass");

    for(let i=0; i < evolutionPathImgArray.length; i++){
      evolutionPathImgArray[i].addEventListener("click", () =>{
        // hiddenPromptWindow();
        characterWindowPrint(evolutionPathArray[i].name);
        characterDynamicDiv.scrollTop = 0; //TODO: limitar scroll top a modal.
      });
    }

/**********/
    showPromptWindow(4);
};

 /** Text to speech */
 dexterVoice.addEventListener("click", () =>{
  dexterVoice.disabled = true;
  dexterVoice.classList.add("noHover");
  if ('speechSynthesis' in window) {
    if(!voiceStatusFlag){
      voiceStatusFlag = true;
      console.log("Synthesis support. Make your web apps talk!");
      let array = synth.getVoices();
      let voiceEN = "";
      let voiceES = "";
      array.map(element => {
        if (element.name == "Google UK English Male"){
          voiceEN = array.indexOf(element)
        }
        if (element.name == "Google español de Estados Unidos"){
          voiceES = array.indexOf(element)
        }
      });

      let msg = new SpeechSynthesisUtterance(document.querySelector("#characterPokemonName").innerHTML);
      let msg2 = new SpeechSynthesisUtterance(document.querySelector(".textFormatPokeEntry").innerHTML);
      if(language == 0){
          msg.voice = array[voiceES];
          msg.lang = "es-US";
          msg2.voice = array[voiceES];
          msg2.lang = "es-US";
      } else {
          msg.voice = array[voiceEN];
          msg.lang = "en-GB";
          msg2.voice = array[voiceEN];
          msg2.lang = "en-GB";
      }
      msg.onend = function(){
        voiceStatusFlag = false;
      };

      msg2.onend = function(){
        voiceStatusFlag = false;
        dexterVoice.disabled = false;
        dexterVoice.classList.remove("noHover");
      };
      synth.speak(msg);
      setTimeout(() => {
        synth.speak(msg2);
      }, 200);

    } else {
      synth.cancel();
    }
   } else {
     alert("This browser does not support text-to-speech playback\nEste navegador no admite la reproducción de texto a voz");
   }
 });

 //Escape
 characterWindowElement.addEventListener("keyup", event => {
   console.log("kek");
  if (event.key === "Escape") {
    hiddenPromptWindow();
  }
});

//****** 
/********** Side menu open **********/
let sideMenu = document.querySelector(".sideMenu");
let sideMenuCloseButton = document.querySelector(".buttonCloseMenu");
let tutorialButton = document.querySelector("#tutorialButton");

document.getElementById("menuButton").addEventListener("click", () => {
  sideMenu.style.visibility = "visible";
  sideMenu.style.width = "275px";
  //document.getElementById("darkMode").focus(); //Focus algo en el side menu
});

document.getElementById("menuButton").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sideMenu.style.visibility = "visible";
    sideMenu.style.width = "275px";
    document.getElementById("darkMode").focus();
  }
});

/* Side menu close */
sideMenuCloseButton.addEventListener("click", () => {
  sideMenu.style.visibility = "hidden";
  sideMenu.style.width = "0";
});

sideMenuCloseButton.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sideMenu.style.visibility = "hidden";
    sideMenu.style.width = "0";
  }
});

/********** Tutorial **********/
let tutorialContainer = document.querySelector(".tutorialContainer");
let languageSelection = document.querySelector(".languageSelection");
let tutorialWindow = document.querySelector(".tutorialWindow");
let tutorialPageIndex = 0;

let tutorialText = [
    {
        "tutorialWelcomeLine1": "Bienvenido al mundo de pokemon",
        "tutorialWelcomeLine2": "Dejame mostrarte lo que puedes hacer en esta website",
        "mainPage": "Esta es la página principal, aquí puedes ver todos los pokemons. Si pasas el mouse sobre una carta, se dará la vuelta y revelará el tipo al que pertenece ese Pokémon.",
        "floatingMenu": "Este menú flotante le da acceso a una variedad de herramientas para filtrar y ordenar los pokemons. También puedes hacer una búsqueda de un pokemon específico por su nombre o número.",
        "characterWindow": "Si haces clic en una tarjeta de pokemon, aparecerá una ventana con información adicional.",
        "textToSpeechButton": "En la esquina inferior izquierda de esta ventana hay un botón, haz clic en el para iniciar la lectura de voz de la información que se muestra en la entrada de pokedex.",
        "pokeballButton": "En la esquina superior izquierda encontrarás una pokebola, puedes hacer clic en ella para 'atrapar' al pokemon a tu lista de favoritos. Un pokemon favorito se marcará con una estrella, si haces clic en esa marca, se eliminará de tu lista de favoritos.",
        "favoritesWindow": "Puedes ver la lista de pokemons marcados como favoritos en la sección 'Favoritos', para acceder a ella, haz clic en el botón 'Estrella' en el lado derecho del encabezado.",
        "chartsAndAbout": "Junto al botón 'Favoritos' está el botón 'Gráfico' y el botón 'Github' que lo llevarán al documento 'Read me' para saber más sobre la creación de este sitio web.",
        "sideMenu": "Por último, en el lado izquierdo del encabezado hay un botón para acceder al menú de configuración. Aquí puede cambiar el idioma, configurar el 'Modo oscuro' o acceder a este tutorial nuevamente.",
        "tutorialEnd": "Y con eso llegamos al final de este tutorial. Disfruta nuestro sitio web.",
        "skipTutorialButton": "Omitir tutorial",
        "continueButton": "Continuar",
    },
    {
        "tutorialWelcomeLine1": "Welcome to the world of Pokemon!",
        "tutorialWelcomeLine2": "Let me show you what you can do in this website",
        "mainPage": "This is the main page, in here you can see all the pokemons. If you pass the mouse over a card is going to flip and reveal the type than that pokemon belongs.",
        "floatingMenu": "This floating menu gives you access to a variety of tools to filter and sort the pokemons. You can also make a search of a specific pokemon by his name or number.",
        "characterWindow": "If you click on a pokemon card a window with additional information will pop up.",
        "textToSpeechButton": "In the bottom left corner of this window there's a button, click it to start the voice reading of the information shown in the pokedex entry.",
        "pokeballButton": "On the top left corner your going to find a pokeball, you can click on it to 'catch' the pokemon to your favorites list. A fav pokemon it's going to be marked with a star, if you click on that mark the pokemon it's goig to be deleted of your favorites list.",
        "favoritesWindow": "You can view the list of pokemons marked as favorites in the 'Favorites' section, to access it, click on the 'Star' button in the right side of the header.",
        "chartsAndAbout": "Next to the 'Favorites' button there's the 'Chart' button and the 'Github' button that will take you to the 'Read me' document to know more about the making of this website.",
        "sideMenu": "Finally, in the left side of the header there's a button to access the configuration menu. Here you can change the language, set on the 'Dark mode' or access this tutorial again.",
        "tutorialEnd": "And with that we reach the end of this tutorial. Enjoy our website.",
        "skipTutorialButton": "Skip tutorial",
        "continueButton": "Continue",
    }
];

//********** Boton para abrir tutorial **********
tutorialButton.addEventListener("click", () => {
  sideMenu.style.visibility = "hidden";
  sideMenu.style.width = "0";
  tutorialContainer.style.display = "block";
  languageSelection.style.display = "block";
  tutorialPageIndex = 0;
  blockScroll();
});

//********************
document.getElementById("setEnglishButton").addEventListener("click", () => {
  language = 1;
  languageSelection.style.display = "none";
  tutorialWindow.style.display = "block";
  printTutorialWindow();
});

document.getElementById("setSpanishButton").addEventListener("click", () => {
  language = 0;
  languageSelection.style.display = "none";
  tutorialWindow.style.display = "block";
  printTutorialWindow();
});

const printTutorialWindow = () => {
  let tutorialTemplate = "";
  switch(tutorialPageIndex){
      case 0:
              tutorialTemplate = `
              <div class="welcomeWindowImage">
                      <img class="welcomeWindowSelectionIMG" src="image\\Oak.png">
              </div>
              <div class="welcomeWindowTextContainer">
                  <p class="textFormatBig"> ${tutorialText[language].tutorialWelcomeLine1} </p>
                  <p class="textFormatSmall"> ${tutorialText[language].tutorialWelcomeLine2} </p>
              </div>
              <div class="welcomeWindowButtons buttonsContainer">
                  <div class="setEnglish">
                      <button id="skipButton"> ${tutorialText[language].skipTutorialButton} </button>
                  </div>
                  <div class="setSpanish">
                      <button id="continueButton"> ${tutorialText[language].continueButton} </button>
                  </div>
              </div> `;

      break;
      case 1:
              tutorialTemplate = `
              <div class="rowRightClass">
                  <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
              </div>
              <div class="columnClass">
                  <p class="textFormatTutorial"> ${tutorialText[language].mainPage} </p>
              </div>
              <div class="columnClass">
                  <img style="width: 60%;" src="image\\tutorial\\MainScreen hover.gif">
              </div>
              <div class="buttonsContainer" style="padding-top: 45px;">
                  <div class="setEnglish">
                          <button id="skipButton"> Skip tutorial </button>
                  </div>
                  <div class="setSpanish">
                      <button id="continueButton"> Continue </button>
                  </div>
              </div>`;
      break;
      case 2:
              tutorialTemplate = `
              <div class="rowRightClass">
                  <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
              </div>
              <div class="rowRightClass">
                  <div class="columnClass" style="flex: 1;">
                      <p class="textFormatTutorial"> ${tutorialText[language].floatingMenu} </p>
                  </div>
                  <div class="columnClass" style="flex: 1;">
                      <img style="width: 50%;" src="image\\tutorial\\FloatingMenu.gif">
                  </div>
              </div>
              <div class="buttonsContainer" style="position: absolute; bottom: 0; width: 88%;">
                  <div class="setEnglish">
                          <button id="skipButton"> Skip tutorial </button>
                  </div>
                  <div class="setSpanish">
                      <button id="continueButton"> Continue </button>
                  </div>
              </div>`;
      break;
      case 3:
              tutorialTemplate = `
              <div class="rowRightClass">
                      <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
                  </div>
                  <div class="columnClass">
                      <p class="textFormatTutorial"> ${tutorialText[language].characterWindow} </p>
                  </div>
                  <div class="columnClass">
                      <img style="width: 90%;" src="image\\tutorial\\CharacterWindow.gif">
                  </div>
                  <div class="buttonsContainer" style="padding-top: 45px;">
                      <div class="setEnglish">
                              <button id="skipButton"> Skip tutorial </button>
                      </div>
                      <div class="setSpanish">
                          <button id="continueButton"> Continue </button>
                      </div>
              </div>`;
      break;
      case 4:
              tutorialTemplate = `
              <div class="rowRightClass">
                  <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
              </div>
              <div class="columnClass">
                  <p class="textFormatTutorial"> ${tutorialText[language].textToSpeechButton} </p>
              </div>
              <div class="columnClass">
                  <img style="width: 40%;" src="image\\tutorial\\CharacterWindowSound.gif">
              </div>
              <div class="buttonsContainer" style="padding-top: 45px;">
                  <div class="setEnglish">
                          <button id="skipButton"> Skip tutorial </button>
                  </div>
                  <div class="setSpanish">
                      <button id="continueButton"> Continue </button>
              </div>`;
      break;
      case 5:
              tutorialTemplate = `
              <div class="rowRightClass">
                  <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
              </div>
              <div class="columnClass">
                  <p class="textFormatTutorial"> ${tutorialText[language].pokeballButton} </p>
              </div>
              <div class="columnClass">
                  <img style="width: 30%;" src="image\\tutorial\\CharacterWindowFav.gif">
              </div>
              <div class="buttonsContainer" style="padding-top: 45px;">
                  <div class="setEnglish">
                          <button id="skipButton"> Skip tutorial </button>
                  </div>
                  <div class="setSpanish">
                      <button id="continueButton"> Continue </button>
              </div>`;
      break;
      case 6:
              tutorialTemplate = `
              <div class="rowRightClass">
                  <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
              </div>
              <div class="columnClass">
                  <p class="textFormatTutorial"> ${tutorialText[language].favoritesWindow} </p>
              </div>
              <div class="columnClass">
                  <img style="width: 35%;" src="image\\tutorial\\FavoritesButton.gif">
              </div>
              <div class="buttonsContainer" style="padding-top: 45px;">
                  <div class="setEnglish">
                          <button id="skipButton"> Skip tutorial </button>
                  </div>
                  <div class="setSpanish">
                      <button id="continueButton"> Continue </button>
              </div>`;
      break;
      case 7:
              tutorialTemplate = `
              <div class="rowRightClass">
                  <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
              </div>
              <div class="columnClass">
                      <!-- ${tutorialText[language].chartsAndAbout} -->
                  <p class="textFormatTutorial"> Next to the 'Favorites' button there's the 'Chart' button and the 'Github' button that will take you to the 'Read me' 
                  document to know more about the making of this website. </p>
              </div>
              <div class="columnClass">
                  <img style="width: 50%;" src="image\\tutorial\\ChartsNAbout.gif">
              </div>
              <div class="buttonsContainer" style="padding-top: 45px;">
                  <div class="setEnglish">
                          <button id="skipButton"> Skip tutorial </button>
                  </div>
                  <div class="setSpanish">
                      <button id="continueButton"> Continue </button>
              </div>`;
      break;
      case 8:
              tutorialTemplate = `
              <div class="rowRightClass">
                  <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
              </div>
              <div class="rowRightClass">
                  <div class="columnClass" style="flex: 1;">
                      <p class="textFormatTutorial"> ${tutorialText[language].sideMenu} </p>
                  </div>
                  <div class="columnClass" style="flex: 1;">
                      <img style="width: 40%; " src="image\\tutorial\\SideMenu.gif">
                  </div>
              </div>
              <div class="buttonsContainer" style="position: absolute; bottom: 0; width: 88%;">
                  <div class="setEnglish">
                          <button id="skipButton"> Skip tutorial </button>
                  </div>
                  <div class="setSpanish">
                      <button id="continueButton"> Continue </button>
                  </div>
              </div>`;
      break;
      case 9:
              tutorialTemplate = `
              <div class="rowRightClass">
                  <p class="textFormatTutorial textFormatTutorialSmall"> ${tutorialPageIndex} / 9 </p>
              </div>
              <div class="columnClass">
                  <p class="textFormatTutorial"> ${tutorialText[language].tutorialEnd} </p>
              </div>
              <div class="columnClass">
                  <img style="width: 90%; margin: 40px 0 0;" src="image\\tutorial\\English_motto.png">
                  <img style="width: 40%; margin: 20px 0 100px;" src="image\\tutorial\\SignatureBlack.png">
              </div>
              <div class="buttonsContainer" style="padding-top: 45px;">
                  <div class="setEnglish">
                          <button id="skipButton"> Close </button>
                  </div>
              </div>`;
      break;
  }

  tutorialPageIndex++;
  tutorialWindow.innerHTML = tutorialTemplate;

  document.getElementById("skipButton").addEventListener("click", () => {
      tutorialWindow.style.display = "none";
      tutorialContainer.style.display = "none";
      activateScroll();
  });
  
  document.getElementById("continueButton").addEventListener("click", () => {
      tutorialWindow.innerHTML = "";
      printTutorialWindow();
  });
};