const DATA_URL = "https://raw.githubusercontent.com/AryMF/GDL004-data-lovers/master/src/data/pokemon/pokemon.json";
let dataPokemon = {};

async function getData (){
    const dataRequest = await fetch(DATA_URL);
    const dataJSON = await dataRequest.json(); 
    return dataJSON;
};

const main = ()  =>{
    getData()
        .then(dataJSON => {
            dataPokemon = dataJSON.pokemon;
            console.log("Tu JSON obtenido por fetch es:");
            console.log(dataPokemon);
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
        // randomColor = "background-color: #" + Math.floor(Math.random()*16777215).toString(16) + ";";
        // divContainer.setAttribute("style", randomColor);
        divContainer.classList.add("divContainerClass");
        document.getElementById("pokemonContainer").appendChild(divContainer);

        divPokemonCard = document.createElement("DIV");
        randomColor = "background-color: #" + Math.floor(Math.random()*16777215).toString(16) + ";";
        divPokemonCard.setAttribute("style", randomColor);
        divPokemonCard.classList.add("divPokemonCardClass");
        divContainer.appendChild(divPokemonCard);

        pokemonImage = document.createElement("IMG");
        // pokemonImage.className = "imagen";
        pokemonImage.setAttribute("id", element.id);
        pokemonImage.setAttribute("src", element.img);
        pokemonImage.setAttribute("alt", element.name);
        pokemonImage.classList.add("imagePokemon");
        pokemonImage.addEventListener("click", function() {
            alert("Hola yo soy " + element.name);
        });
        divPokemonCard.appendChild(pokemonImage);

        pokemonName = document.createElement("SPAN");
        pokemonName.innerHTML = element.name;
        pokemonName.classList.add("TextFormat");
        divPokemonCard.appendChild(pokemonName);
        
    });
}

document.getElementById("filterButton").addEventListener("click", () =>{
    let searchCondition = prompt("Nombre del Pokemon:", "Bulbasaur");
    let filterJSON = window.data.filterData(dataPokemon, searchCondition);
    console.log("Tu JSON filtrado es:");
    console.log(filterJSON);
    printPokemonCards(filterJSON);
});