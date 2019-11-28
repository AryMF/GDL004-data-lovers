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
    let sortedResultAscAlpha = [];
    let sortedResultAscNum = [];
    
    let x = condition;
    let numEnd = 2;

    if(condition == "height" || condition == "weight"){
      for (condition in data) {
        if (data.hasOwnProperty(condition)) {
          sortedResultAscNum.push(data[condition]);
        }
      }
    }else {
      for (condition in data) {
        if (data.hasOwnProperty(condition)) {
          //console.log(data[condition]);
          sortedResultAscAlpha.push(data[condition]);
        }
      }
    }
    
    sortedResultAscNum
      .sort(function(a, b) {
        let auxA = a[x].length - numEnd;
        let auxB = b[x].length - numEnd
        if (parseFloat( a[x].substring(0, auxA) ) > parseFloat( b[x].substring(0, auxB) ) ){
          return -1;
        } else if (parseFloat( a[x].substring(0, auxA) ) < parseFloat( b[x].substring(0, auxB) ) ) {
          return 1;
        }
      })
      .forEach(function(element) {
        return element;
      });

    sortedResultAscAlpha
      .sort(function(a, b) {
        if (a[x] > b[x]) {
          return -1;
        } else if (a[x] < b[x]) {
          return 1;
        }
      })
      .forEach(function(element) {
        return element;
      });

    if(sortedResultAscNum != ""){
      return sortedResultAscNum
    }
    else{
      return sortedResultAscAlpha

    }
  },

  sortDataResultDesc: function(data, condition) {
    let sortedResultDescAlpha = [];
    let sortedResultDescNum = [];
    let x = condition;
    let numEnd = 2;

    if(condition == "height" || condition == "weight"){
      for (condition in data) {
        if (data.hasOwnProperty(condition)) {
          sortedResultDescNum.push(data[condition]);
        }
      }
    }else {
      for (condition in data) {
        if (data.hasOwnProperty(condition)) {
          sortedResultDescAlpha.push(data[condition]);
        }
      }
    }
    
    sortedResultDescNum
      .sort(function(a, b) {
        let auxA = a[x].length - numEnd;
        let auxB = b[x].length - numEnd
        if (parseFloat( a[x].substring(0, auxA) ) < parseFloat( b[x].substring(0, auxB) ) ){
          return -1;
        } else if (parseFloat( a[x].substring(0, auxA) ) > parseFloat( b[x].substring(0, auxB) ) ) {
          return 1;
        }
      })
      .forEach(function(element) {
        return element;
      });

    sortedResultDescAlpha
      .sort(function(a, b) {
        if (a[x] < b[x]) {
          return -1;
        } else if (a[x] > b[x]) {
          return 1;
        }
      })
      .forEach(function(element) {
        return element;
      });

    if(sortedResultDescNum != ""){
      return sortedResultDescNum
    }
    else{
      return sortedResultDescAlpha

    }
  }
};