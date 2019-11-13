/* Manejo de data */

// esta es una función de ejemplo

// export const example = () => {
//   return 'example';
// };

window.data =  {
  filterData: function(data, condition){
    let filterJSON = [];  

    const filteredByNameOrNumber = (array) =>{
      if(("name" in array && array.name == condition) || ("id" in array && array.id == condition)){
        return true;
      } else{
        return false;
      }
    }    

    filterJSON = data.filter(filteredByNameOrNumber);

    return filterJSON;

  },
  sortData: function(data, sortBy, sortOrder){

  }
};
