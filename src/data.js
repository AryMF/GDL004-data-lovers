/* Manejo de data */

// esta es una función de ejemplo

// econditionport const example = () => {
//   return 'example';
// };


window.data =  {
  filteredByNameOrNumber: function(data, condition){
    let filterJSON = [];
    filterJSON = data.filter((array) => {
      if(("name" in array && array.name.toUpperCase().match(condition) == condition) || ("id" in array && array.id == condition)){

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
