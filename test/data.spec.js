global.window = global;
// import data  from '../src/data'
require('../src/data'); // preguntar wtf?
import dataPokemon from '../src/data/pokemon/pokemon.json';
const pokemon = dataPokemon.pokemon;
describe("data", () => {
    it("Data debería ser un object", () => {
        expect(typeof data).toBe("object");
    })
    describe("data.filteredByNameOrNumber", () => {
        it("filteredByNameOrNumber debería ser una función", () => {
            expect(typeof data.filteredByNameOrNumber).toBe("function");
        });
        it("Debería retornar 'Bulbasaur' para 'BULBASAUR'", () => {
            expect(data.filteredByNameOrNumber(pokemon, 'BULBASAUR', true)[0])
            .toHaveProperty('name', "Bulbasaur");
        });
        it("Debería retornar 'Mewtwo' para número 150", () => {
            expect(data.filteredByNameOrNumber(pokemon, 150)[0])
            .toHaveProperty("name", "Mewtwo");
        });
    });
    describe("data.filteredByType", () => {
        it("Debería ser una función", () => {
          expect(typeof data.filteredByType).toBe("function");
        });
        it("Debería retornar 'Squirtle' en la primera posición para tipo 'Water'", () => {
          expect(data.filteredByType(pokemon, "Water")[0])
          .toHaveProperty('name', "Squirtle");
        });
        it("Debería retornar 11 elementos para tipo 'Rock'", () => {
          expect(data.filteredByType(pokemon, "Rock"))
          .toHaveLength(11);
        });
    });
    //TEST orderData

    describe("data.sortDataResultAsc", () => {
        it("Debería ser una función", () => {
          expect(typeof data.sortDataResultAsc).toBe("function");
        });
        it("Debería retornar 'Zubat' en la primera posición para orden 'Z-A'", () => {
          expect(data.sortDataResultAsc(pokemon, "name")[0])
          .toHaveProperty('name', "Zubat");
        });
        it("Debería retornar 'Abra' en la ultima posición para orden 'Z-A'", () => {
          expect(data.sortDataResultAsc(pokemon, "name")[150])
          .toHaveProperty('name', "Abra");
        });
        it('returns `Should return: 8.79 m as the first item from the array.`', () => {
          expect(data.sortDataResultAsc(pokemon, 'height')[0]).toHaveProperty("height",'8.79 m');
        });
        it('returns `Should return: 0.20 m as the last item from the array.`', () => {
          expect(data.sortDataResultAsc(pokemon, 'height')[150]).toHaveProperty("height",'0.20 m');
        });
    }); // cierre describe: "data.sortDataResultAsc"

    describe("data.sortDataResultDesc", () => {
      it("Debería ser una función", () => {
        expect(typeof data.sortDataResultDesc).toBe("function");
      });
      it("Debería retornar '0.1 kg' en la primera posición para orden 'peso'", () => {
        expect(data.sortDataResultDesc(pokemon, "weight")[0])
        .toHaveProperty('weight', "0.1 kg");
      });
      it("Debería retornar '460.0 kg' en la última posición para orden 'peso'", () => {
        expect(data.sortDataResultDesc(pokemon, "weight")[150])
        .toHaveProperty('weight', "460.0 kg");
      });
      it("Debería retornar '1' en la primera posición para orden 'peso'", () => {
        expect(data.sortDataResultDesc(pokemon, "id")[0])
        .toHaveProperty('id', 1 );
      });
      it("Debería retornar '151' en la última posición para orden 'peso'", () => {
        expect(data.sortDataResultDesc(pokemon, "id")[150])
        .toHaveProperty('id', 151);
      });
    });//cierre describe:"data.sortDataResultDesc" 
}); //cierre describe: "data"


