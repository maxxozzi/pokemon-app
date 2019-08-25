export function setOwnedPokemon(pokemon) {
    return {
      type: 'SET_OWNED_POKEMON',
      pokemon
    };
}

export function releasePokemon(index) {
    return {
      type: 'RELEASE_POKEMON',
      index
    };
}

