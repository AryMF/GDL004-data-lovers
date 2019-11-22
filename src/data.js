/* Manejo de data */

// esta es una función de ejemplo

// econditionport const example = () => {
//   return 'example';
// };

window.data = {
  filteredByNameOrNumber: function(data, condition) {
    let filterJSON = [];
    filterJSON = data.filter(array => {
      if (
        ("name" in array &&
          array.name.toUpperCase().match(condition) == condition) ||
        ("id" in array && array.id == condition)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filterJSON;
  },

  filteredByType: function(data, condition) {
    let filterJSON = [];
    data.forEach(element => {
      element.type.forEach(type => {
        if (type.toUpperCase() == condition.toUpperCase()) {
          filterJSON.push(element);
        } else {
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

// sortData: function(data, condition) {
//     let sortDataResult = [];
//     switch(condition){
//       case "A-Z":
//         sortDataResult = sortDataAZ(data);
//       break;
//       case "Z-A":
//         sortDataResult = sortDataZA(data);
//       break;
//       case "Height + to -":
//         sortDataResult = sortDataHeightTallToShort(data);
//       break;
//       case "Height - to +":
//         sortDataResult = sortDataHeightShortToTall(data);
//       break;
//       case "Weight + to -":
//         sortDataResult = sortDataWeightHeavyToLight(data);
//       break;
//       case "Weight - to +":
//         sortDataResult = sortDataWeightLightToHeavy (data);
//       break;
//       case "Number":
//         sortDataResult = sortDataIdInverse(data);
//       break;
//       default:
//         console.log("Error al recibir sorData condition");
//     }
//     return sortDataResult;
//   }
// };

// /********FUNCIÓN AZ****************/
// const sortDataAZ = (data) => {
//   let sortedResultAZ = [];
//   for (name in data) {
//     if (data.hasOwnProperty(name)) {
//       sortedResultAZ.push(data[name]);
//     }
//   }
//   sortedResultAZ
//   .sort(function(a, b) {
//     if (a.name < b.name) {
//     return -1;
//     } else if (a.name > b.name) {
//     return 1;
//     }
//     return 0;
//   }).forEach(function(element) {
//     return element;
//   });

//   return sortedResultAZ;
// };

// /************FUNCIÓN ZA************/
// const sortDataZA = (data) => {
//   let sortedResultZA = [];
//   for (name in data) {
//     if (data.hasOwnProperty(name)) {
//       sortedResultZA.push(data[name]);
//     }
//   }
//   sortedResultZA.sort(function(a, b) {
//     if (a.name > b.name) {
//       return -1;
//     } else if (a.name < b.name) {
//       return 1;
//     }
//       return 0;
//   }).forEach(function(element) {
//     return element;
//   });
//   return sortedResultZA;
// };

// /*********************FUNCIÓN PESO + A - ***********/
// const sortDataWeightHeavyToLight = (data) => {
//   let sortByWeightMtoL = [];
//   let weight;
//   for (weight in data) {
//     if (data.hasOwnProperty(weight)) {
//       sortByWeightMtoL.push(data[weight]);
//     }
//   }
//   sortByWeightMtoL.sort(function(a, b) {
//     if (a.weight > b.weight) {
//       return -1;
//     } else if (a.weight < b.weight) {
//       return 1;
//     }
//       return 0;
//   }).forEach(function(element) {
//     return element;
//   });
//   return sortByWeightMtoL;
// };

// /*****************FUNCIÓN PESO - A + ******/
// const sortDataWeightLightToHeavy = (data) => {
//   let sortByWeightLtoM = [];
//   let weight;
//   for (weight in data) {
//     if (data.hasOwnProperty(weight)) {
//       sortByWeightLtoM.push(data[weight]);
//     }
//   }
//   sortByWeightLtoM.sort(function(a, b) {
//     if (a.weight < b.weight) {
//       return -1;
//     } else if (a.weight > b.weight) {
//       return 1;
//     }
//       return 0;
//   }).forEach(function(element) {
//     return element;
//   });
//   return sortByWeightLtoM;
// };

// /*************FUNCIÓN ALTURA - a +  ********/
// const sortDataHeightShortToTall = (data) => {
//   let sortByHeightLtoM = [];
//   let height;
//   for (height in data) {
//     if (data.hasOwnProperty(height)) {
//       sortByHeightLtoM.push(data[height]);
//     }
//   }
//   sortByHeightLtoM.sort(function(a, b) {
//     if (a.height < b.height) {
//       return -1;
//     } else if (a.height > b.height) {
//       return 1;
//     }
//       return 0;
//   }).forEach(function(element) {
//     return element;
//   });
//   return sortByHeightLtoM;
// };

// /*************FUNCIÓN ALTURA + A -*********/
// const sortDataHeightTallToShort = (data) => {
//   let sortByHeightMtoL = [];
//   let height;
//   for (height in data) {
//     if (data.hasOwnProperty(height)) {
//       sortByHeightMtoL.push(data[height]);
//     }
//   }
//   sortByHeightMtoL.sort(function(a, b) {
//     if (a.height > b.height) {
//       return -1;
//     } else if (a.height < b.height) {
//       return 1;
//     }
//       return 0;
//   }).forEach(function(element) {
//     return element;
//   });
//   return sortByHeightMtoL;
// };

// /*función INVERTIR tarjetas #151 a #1*/
// const sortDataIdInverse = (data) => {
//   const DataIDReverse = data.reverse();
//   return DataIDReverse;
// };
