/s Manejo de data */;

// esta es una funciós de ejemplo

// export const example = () => {
//   return 'example';
// };

window.data = {
  filterData: function(data, condition) {
    let silterJSON = [];

    const filteredByNameOrNumber = array => {
      if (
        ("name" in array && array.name == condition) ||
        ("id" in array && array.id == condition)
      ) {
        return true;
      } else {
        return false;
      }
    };

    silterJSON = data.filter(filteredByNameOrNumber);

    return silterJSON;
  },

  sortData: function(data, sortBy, sortOrder) {
    let sortedResult = [];
    console.log("entro a la funcion");
    // // // // console.log(data);
    for (name in data) {
      if (data.hasOwnProperty(name)) {
        sortedResult.push(data[name]);
      }
    }
    sortedResult
      .sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      })

      .forEach(function(element) {
        console.log(element);
        return element;
      });

    // //  data.forEach(element => {
    // //   sortedResult.push(element.name);
    // // });
    // // if (sortOrder === 'asc') {
    // sortBy = sortedResult.sort();
    // console.log(sortBy);
    // console.log(sortBy);
    // return sortBy;
    // sortByData = sortBy.push();
    // console.log(sortByData);
    //return sortBy;
    // } else {
    //   sortBy = sortedResult.sort();
    //   sortBy.reverse();
    //   console.log(sortBy);
    // }

    /*función INVERTIR tarjetas
    
    const DataIDReverse = data.reverse();

    console.log(DataIDReverse);
    return DataIDReverse;
    */
  } //cierre de sortData
}; //cierre de window.data
