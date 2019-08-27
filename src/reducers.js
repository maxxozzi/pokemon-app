const initialState = {
    pokemon: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SET_OWNED_POKEMON':
        return {
            ...state,
            pokemon: [...state.pokemon, action]
        };
        case 'RELEASE_POKEMON':
        return {
            ...state,
            pokemon: [...state.pokemon.slice(0, action.index), ...state.pokemon.slice(action.index + 1)]
        }
        default: return state;
    }
}