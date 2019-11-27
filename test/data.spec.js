global.window = global;
const isData = require('../src/data');

const pokemon = [{
    "id": 1,
    "name": "Bulbasaur",
    "type": [
      "Grass",
      "Poison"
    ],
    "height": "0.71 m",
    "weight": "6.9 kg",
  },
  {
    "id": 4,
    "name": "Charmander",
    "type": [
      "Fire"
    ],
    "height": "0.61 m",
    "weight": "8.5 kg",
  },
  {
    "id": 7,
    "name": "Squirtle",
    "type": [
      "Water"
    ],
    "height": "0.51 m",
    "weight": "9.0 kg",
  },
 
  {
    "id": 12,
    "name": "Butterfree",
    "type": [
      "Bug",
      "Flying"
    ],
    "height": "1.09 m",
    "weight": "32.0 kg",
  },
  {
    "id": 14,
    "name": "Kakuna",
    "type": [
      "Bug",
      "Poison"
    ],
    "height": "0.61 m",
    "weight": "10.0 kg",
  },
  {
    "id": 17,
    "name": "Pidgeotto",
    "type": [
      "Normal",
      "Flying"
    ],
    "height": "1.09 m",
    "weight": "30.0 kg",
  }, 
  {
    "id": 19,
    "name": "Rattata",
    "type": [
      "Normal"
    ],
    "height": "0.30 m",
    "weight": "3.5 kg",
  }
];

describe("data", () => {
    it("Data debería ser un object", () => {
        expect(typeof data).toBe("object");
    })
    describe("data.filteredByNameOrNumber", () => {
        it("filteredByNameOrNumber debería ser una función", () => {
            expect(typeof data.filteredByNameOrNumber).toBe("function");
        });
        it("Debería retornar 'Bulbasaur' para 'BULBASAUR'", () => {
            expect(data.filteredByNameOrNumber(pokemon, 'BULBASAUR')[0])
            .toHaveProperty('name', "Bulbasaur");
        });

        it("Debería retornar 'Squirtle' para número 7", () => {
            expect(data.filteredByNameOrNumber(pokemon, 7)[0])
            .toHaveProperty('name', "Squirtle");
        });
    });

    describe("data.filteredByType", () => {
        it("Debería ser una función", () => {
            expect(typeof data.filteredByType).toBe("function");
        });
        it("Debería retornar todos los pokemons tipo 'Normal' para 'Normal'", () => {
            expect(data.filteredByType(pokemon, "Normal"))
            .toStrictEqual(
                [{
                    "id": 17,
                    "name": "Pidgeotto",
                    "type": [
                      "Normal",
                      "Flying"
                    ],
                    "height": "1.09 m",
                    "weight": "30.0 kg",
                  }, 
                  {
                    "id": 19,
                    "name": "Rattata",
                    "type": [
                      "Normal"
                    ],
                    "height": "0.30 m",
                    "weight": "3.5 kg",
                }]
            );
        });
    });

    describe("data.sortedByAlphabeticalOrderAsc", () => {
      it("sortedByAlphabeticalOrderAsc debería ser una función", () => {
          expect(typeof data.sortedByAlphabeticalOrderAsc).toBe("function");
      });
      //TODO: Test de funcionalidad de sortedByAlphabeticalOrderAsc pokemon
      it("Debería retornar 'Bulbasaur' para 'BULBASAUR'", () => {
          expect(data.sortedByAlphabeticalOrderAsc(pokemon, 'BULBASAUR')[0])
          .toHaveProperty('name', "Bulbasaur");
      });

      it("Debería retornar 'Squirtle' para número 7", () => {
          expect(data.sortedByAlphabeticalOrderAsc(pokemon, 7)[0])
          .toHaveProperty('name', "Squirtle");
      });
  });
});