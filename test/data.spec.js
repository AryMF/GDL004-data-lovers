// global.window = global;
import data from '../src/data';
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
    }); // cierre describe: "data.sortDataResultAsc"
}); //cierre describe: "data"