window.data =  {
  filteredByNameOrNumber: function(data, condition, wholeWord = false){
    let filterJSON = [];
    let pokemonName = condition;

    if (isNaN(condition)) {
      pokemonName = condition.toUpperCase();
      pokemonName = pokemonName.replace(" ♀ ","").replace(" ♂ ","").replace("(", "").replace(")", "");
    }

    if (wholeWord){
      pokemonName = "\\b" + pokemonName + "\\b";
    }

    filterJSON = data.filter((array) => {
      let nullValidation = array.name.toUpperCase().replace(" ♀ ","").replace(" ♂ ","").replace("(", "").replace(")", "").match(pokemonName); 

      if(("name" in array && nullValidation && array.name.toUpperCase()
      .replace(" ♀ ","").replace(" ♂ ","").replace("(", "").replace(")", "")
      .match(pokemonName).length > 0) || ("id" in array && array.id == condition)){
          return true;
      } else {
        return false;
      }
    });

    return filterJSON;
  },

  
  
   filteredByType: function(data, condition){
    let filterJSON = [];
    data.forEach((element) => {
      element.type.forEach((type) => {
        if(type.toUpperCase() == condition.toUpperCase()){
          filterJSON.push(element);
        } else{
          return false;
        }
      });
    });
    return filterJSON;
  },

  sortDataResultAsc: function(data, condition) {
    let sortedResultAsc = [];
    let x = condition;

    for (condition in data) {
      if (data.hasOwnProperty(condition)) {
        sortedResultAsc.push(data[condition]);
      }
    }
    sortedResultAsc
      .sort(function(a, b) {
        if (a[x] > b[x]) {
          return -1;
        } else if (a[x] < b[x]) {
          return 1;
        }
        return 0;
      })
      .forEach(function(element) {
        return element;
      });
    return sortedResultAsc;
  },

  sortDataResultDesc: function(data, condition) {
    let sortedResultAsc = [];
    let x = condition;
    
    for (condition in data) {
      if (data.hasOwnProperty(condition)) {
        sortedResultAsc.push(data[condition]);
      }
    }
    sortedResultAsc
      .sort(function(a, b) {
        if (a[x] < b[x]) {
          return -1;
        } else if (a[x] > b[x]) {
          return 1;
        }
        return 0;
      })
      .forEach(function(element) {
        return element;
      });
    return sortedResultAsc;
  }
};