/* Manejo de data */

// esta es una función de ejemplo

// export const example = () => {
//   return 'example';
// };

window.data =  {
  filterData: function(data, condition){
    let filterJSON = [];
    let dataLength = Object.keys(data.pokemon); //Por si se necesita
  

    const filteredByNameOrNumber = (array) =>{
      if(("name" in array && array.name == condition) || ("id" in array && array.id == condition)){
        return true;
      } else{
        return false;
      }
    }    

    filterJSON = data.pokemon.filter(filteredByNameOrNumber);

    return filterJSON;

  },
  sortData: function(data, sortBy, sortOrder){

  }
};
