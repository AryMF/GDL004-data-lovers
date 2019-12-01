// import data from '../src/data';
const DATA_URL = "https://raw.githubusercontent.com/AryMF/GDL004-data-lovers/master/src/data/pokemon/pokemon.json";
const DATA_API = "https://pokeapi.co/api/v2/pokemon?limit=151";
let dataPokemon = [];
let filterJSON = [];
let dataPokedexArray = [];

/***********Main window *********************/
let pokemonContainerElement = document.getElementById("pokemonContainer");
let homeButtonElement = document.getElementById("homeButton");
let toggleFavElement = document.getElementById("toggleFav");
let toggleChartsElement = document.getElementById("toggleCharts");
let activeFilterAndSortContainer = document.getElementById("activeFilterAndSort");
let activeFilterAndSortTags= document.querySelectorAll("#activeFilterAndSort p");
let chartsContainerElement = document.getElementById("chartsContainer");
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
/*********** Text to speech *********************/
let language = 1; //TODO: Valor que debe almacenarse en cookie
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

/******************** Llamada de datos ********************/
/**** Pokedex entries ****/
const apiCallFunction = (url = "", option = {}) => {
  const http_method = option.method || "GET"; //Código de defensa
  return fetch(url, {method: http_method});
};

async function getPokemonData (){
  let dataRequest = await apiCallFunction(DATA_API, {method: "GET"});
  let call1 = await dataRequest.json();
  for(let i=0; i< call1.results.length; i++){
      let call2 = await apiCallFunction(call1.results[i].url, {method: "GET"});
      let pokemonData = await call2.json();
      let call3 = await apiCallFunction(pokemonData.species.url, {method: "GET"});
      let flavorText = await call3.json();
      let flavorTextArrayES = flavorText.flavor_text_entries.filter(element => {
          if(element.language.name == "es" && element.version.name == "omega-ruby"){
              return true;
          }
          return false;
      });
      let flavorTextArrayEN = flavorText.flavor_text_entries.filter(element => {
          if(element.language.name == "en" && element.version.name == "omega-ruby"){
              return true;
          }
          return false;
      });
      dataPokedexArray.push(
      {
          "id": pokemonData.id,
          "flavor_text_es": flavorTextArrayES[0].flavor_text,
          "flavor_text_en": flavorTextArrayEN[0].flavor_text
      });
  };
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
        printPokemonCards(dataPokemon); /**Comentar para animación intro */
      });      
    })
    .catch(error => {
      console.error("Error al cargar JSON por fetch");
      console.error(error);
    });
};

window.addEventListener("load", main);

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
/*
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

    //impresion en pantalla
    pokemonContainerElement.innerHTML = concatTemplateElements;

    pokemonContainerElement.innerHTML = concatTemplateElements;

    let backCards = document.getElementsByClassName("divPokemonCardFaceClass--back");
  
    for(let i=0; i< backCards.length;i++){
      backCards[i].addEventListener("click", function() {
        characterWindowPrint(orderArray[i]);
      });
    }

    /* Intentando camiar a querySelector para usar forEach
    let backCards = document.querySelectorAll(".divPokemonCardFaceClass--back");
    // console.log(backCards)
    backCards.forEach((element, index) => {
        // console.log(index);
        element.addEventListener("click", function() {
            console.log("hola: " + orderArray[index])
            // characterWindowPrint(orderArray[index].toUpperCase());
        });
        index++;
    });
    */

    let frontCards = document.getElementsByClassName("divPokemonCardFaceClass--front");
    for(let i=0; i< frontCards.length; i++){
        frontCards[i].addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            characterWindowPrint(orderArray[i]);
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
  activeFilterAndSortContainer.style.visibility = "hidden";
});

/**** Reset with short cut ****/
document.addEventListener("keyup", function(event) {
  if (event.altKey && event.key === "r") {
    closeFloatingMenu();
    filterJSON = [];
    printPokemonCards(dataPokemon);
    activeFilterAndSortContainer.style.visibility = "hidden";
  }
});

/**********Mandar a home con click en titulo */

document.getElementById("titleText").addEventListener("click", () => {
  printPokemonCards(dataPokemon);
  activeFilterAndSortContainer.style.visibility = "hidden";
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
  activeFilterAndSortContainer.style.visibility = "visible";
};

document.getElementById("searchPromptButton").addEventListener("click", () => {
  if (searchPromptInputElement.value != "") {
    filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
    if(filterJSON == ""){
      printPokemonCards(dataPokemon);
    } else {
      printPokemonCards(filterJSON), "\"" + searchPromptInputElement.value + "\"";
    }
    hiddenPromptWindow();
  } else {
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
        printPokemonCards(filterJSON, "\"" + searchPromptInputElement.value + "\"");
    }else {
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

const searchByInput = () =>{
    /*** Regresar al principio de la pagina ***/
    document.documentElement.scrollTop = 0;
    if(searchPromptInputElement.value != ""){
        filterJSON = window.data.filteredByNameOrNumber(dataPokemon, searchPromptInputElement.value);
        if(filterJSON == ""){
          printPokemonCards(dataPokemon);
        } else {
          printPokemonCards(filterJSON, "\"" + searchPromptInputElement.value + "\"");
        }
        hiddenPromptWindow();
    }else {
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
            activeFilterAndSortContainer.style.visibility = "visible";
            /*** Regresar al principio de la pagina ***/
            document.documentElement.scrollTop = 0;
            filterJSON = window.data.filteredByType(dataPokemon, buttonElement.value);
            filterJSON == "" ? printPokemonCards(dataPokemon): printPokemonCards(filterJSON, "\"" + buttonElement.value + "\"");
            hiddenPromptWindow();
        });
        buttonElement.addEventListener('keyup',function(e){
            if (e.keyCode === 13) {
                /*** Regresar al principio de la pagina ***/
                document.documentElement.scrollTop = 0;
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
    activeFilterAndSortContainer.style.visibility = "visible";
      
        /*** Regresar al principio de la pagina ***/
        document.documentElement.scrollTop = 0;
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
  characterImageElement.setAttribute("src", "");
  if(toggleFavElement.checked === true){
    showFavorites();
  }
  /**Detener voz */
  synth.cancel();
};

/************************ Favorites window ************************/
/** Show favorites*/


document.getElementById("favoritesButton").addEventListener("click", () => {
  toggleFavElement.checked = true;
  toggleChartsElement.checked = false;
  homeButtonElement.style.visibility = "visible";
  pokemonContainerElement.style.visibility = "visible";
  /***Cerrar Main */
  pokemonContainerElement.innerHTML = "";
  floatingMenu.style.visibility = "hidden";
  activeFilterAndSortContainer.style.visibility = "hidden";
  /***Cerrar Charts */
  chartsContainerElement.style.visibility = "hidden";
  showFavorites();  
});

document.getElementById("homeButton").addEventListener("click", () => {
  toggleFavElement.checked = false;
  toggleChartsElement.checked = false;
  homeButtonElement.style.visibility = "hidden";
  /***Cerrar Favoritos */
  floatingMenu.style.visibility = "visible";
  /***Cerrar Charts */
  chartsContainerElement.style.visibility = "hidden";
  /***Abrir Main */
  pokemonContainerElement.style.visibility = "visible";
  activeFilterAndSortContainer.style.visibility = "visible";

  printPokemonCards(dataPokemon);  
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

/************************** Charts window **************************/
document.getElementById("chartButton").addEventListener("click", () => {
    toggleChartsElement.checked = true;
    toggleFavElement.checked = false;
    homeButtonElement.style.visibility = "visible";

    pokemonContainerElement.innerHTML = "";
    pokemonContainerElement.style.visibility = "hidden";
    activeFilterAndSortContainer.style.visibility = "hidden";
    chartsContainerElement.style.visibility = "visible";
    floatingMenu.style.visibility = "hidden";
    chartsWindowPrint();
});

const generateData = () =>{
    let data = "Mock data";
    
    return data;    
};

const chartsWindowPrint = () => {
    let dataForCharts = generateData();


    const chartWindowTemplate = `
        <h1>Charts</h1>
        <br/><br/>
        <div class="chartDynamicContent">
            <p>${dataForCharts}</p>
            <!--
            <canvas id="weightNHeight" width="200px" height="150px" style="border:1px solid #000000;">
            </canvas>
            <canvas id="line-chart" width="200px" height="150px" style="border:1px solid #000000;">
            </canvas>
            <canvas id="polar-chart" width="200px" height="150px" style="border:1px solid #000000;">
            </canvas>
            <button id="buttonData"> Data </button>
            -->
        </div>
    `;

    chartsContainerElement.innerHTML = chartWindowTemplate;
    /*
    //Ejemplo 01
    let ctx = document.getElementById('weightNHeight').getContext('2d');

    let data = {
    labels: ['20-30', "10-20", "0-10"],
    datasets: [{
        label: "Male",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: [-65, -59, -20],
        }, {
        label: "Female",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        data: [72, 45, 18],
        },

    ]
    };

    let myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            yAxes: [{
              stacked: false
            }],
            xAxes: [{
                ticks: {
                   callback: function(value, index, values) {
                    return Math.abs(value);
                }
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItems, data) {
                  return data.datasets[tooltipItems.datasetIndex].label  + ": " +  Math.abs(tooltipItems.xLabel);
              }
            }
          }
        }
    });

    // Our labels along the x-axis
    var years = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
    // For drawing the lines
    var africa = [86,114,106,106,107,111,133,221,783,2478];
    var asia = [282,350,411,502,635,809,947,1402,3700,5267];
    var europe = [168,170,178,190,203,276,408,547,675,734];
    var latinAmerica = [40,20,10,16,24,38,74,167,508,784];
    var northAmerica = [6,3,2,2,7,26,82,172,312,433];

    //Ejemplo 02
    var ctx2 = document.getElementById("line-chart");

    var myChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: years,
        datasets: [
            { 
                data: africa,
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
              },
              { 
                data: asia,
                label: "Asia",
                borderColor: "#3e95cd",
                fill: false
              },
              { 
                data: europe,
                label: "Europe",
                borderColor: "#3e95cd",
                fill: false
              },
              { 
                data: latinAmerica,
                label: "Latin America",
                borderColor: "#3e95cd",
                fill: false
              },
              { 
                data: northAmerica,
                label: "North America",
                borderColor: "#3e95cd",
                fill: false
              }
        ]
        
    }
    });
    

    //Ejemplo 03
    new Chart(document.getElementById("polar-chart"), {
        type: 'polarArea',
        data: {
          labels: ["Normal", "Fire", "Water", "Flying", "Grass"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: [24, 12, 32, 19, 14]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Algún dato genial sobre Pokémon [Sección en construcción]'
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItems, data) {
                  return data.datasets[tooltipItems.datasetIndex].labels;
              }
            }
          }
        }
    });

    /*************** Event listener boton *********************** */

    /*
    let button = document.getElementById("buttonData");
    button.addEventListener("click", () => {
        generateData();
    });
    */
};


/******************** Character window ********************/
let elementDivPokeballImage = document.getElementById("divPokeballImage");
let elementPokeballImage = document.getElementById("pokeballImage");
let elementDivFavImage = document.getElementById("divFavImage");
let elementStarFavImage = document.getElementById("starFavImage");

let characterImageElement = document.getElementById("characterImage");

const characterWindowPrint = (pokemonName) =>{
    characterTitleName = ""; //Asegurar que este vació
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
    
    // Llamar data de cookies favoritos 
    let pokemonCookiesArray = loadFavorites();
    // Configuración de botón de favoritos
    if(pokemonCookiesArray.indexOf(pokemonName.toUpperCase()) != -1){
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
            let found = data.filteredByNameOrNumber(dataPokemon, elementArray.name);  
            /*
            let found = dataPokemon.filter((element) => {
                return element.name === elementArray.name;
            });*/
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
    /***** Fin de concatenación evolution path ****/
    

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
    characterTitleName = document.getElementById("characterPokemonName").innerHTML;
                
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
    createFavoriteCookie(characterTitleName.toUpperCase());
    /** Refrescar pantalla favoritos **/
    if(toggleFavElement.checked === true){
      showFavorites();
    }
 });
 elementStarFavImage.addEventListener("click", () => {
    catchItAnimation(2, 1);
    /*** Remove cookie */
    deleteFavorite(characterTitleName.toUpperCase().trim());
    /** Refrescar pantalla favoritos **/
    if(toggleFavElement.checked === true){
      showFavorites();
    }
 });

 /** Text to speech */
 document.getElementById("dexterVoice").addEventListener("click", () =>{
  
  if ('speechSynthesis' in window) {
    if(!voiceStatusFlag){
      voiceStatusFlag = true;
      console.log("Synthesis support. Make your web apps talk!");
      let msg = new SpeechSynthesisUtterance(document.querySelector(".textFormatPokeEntry").innerHTML);
      msg.voice = synth.getVoices()[3]; // Es: 5 || EN-GB Male: 3 || EN-GB FEM: 2
      msg.onend = function(){
        voiceStatusFlag = false;
      };
      synth.speak(msg);

      /*synth.getVoices().forEach(voice => {
        console.log(voice.name, voice.lang);
      })*/
    } else {
      synth.cancel();
    }
   }   
 });