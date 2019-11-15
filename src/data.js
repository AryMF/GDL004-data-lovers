/* Manejo de data */

// esta es una función de ejemplo

// export const example = () => {
//   return 'example';
// };

window.data =  {
  filteredByNameOrNumber: function(data, condition){
    let filterJSON = [];
    filterJSON = data.filter((array) => {
      if(("name" in array && array.name.toUpperCase().match(condition) == condition) || ("id" in array && array.id == condition)){
        return true;
      } else{
        return false;
      }
    });
    return filterJSON;
  },

  filteredByType: function(data, condition){
    let filterJSON = [];

    /*filterJSON = data.filter((array) =>{
      
      return array.type.map((element) => {
        if(element.toUpperCase() == condition.toUpperCase()){
          temporalARRAY.push(array);
          console.log(array)
          return array;
        } else{
          return false;
        }
      }

    });*/

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
  sortData: function(data, sortBy, sortOrder){
  }
};
