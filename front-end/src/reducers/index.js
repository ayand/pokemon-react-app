import { combineReducers } from 'redux';
import {
  ADD_TYPE,
  REMOVE_TYPE,
  SELECT_POKEMON,
  LOADING_STARTED,
  LOADING_DONE,
  X_STAT,
  Y_STAT,
  ONE_TYPE,
  FORM_LOADING_START,
  FORM_LOADING_END
} from '../actions';

const pokemon = (state = [], action) => {
    if (action.type === LOADING_DONE) {
        return action.pokemon;
    }
    return state;
}

const includedTypes = (state = [], action) => {
    if (action.type === ADD_TYPE) {
        if (state.length <= 1) {
            return state.concat([action.pokemonType]);
        }
        return [state[0], action.pokemonType];
    } else if (action.type === REMOVE_TYPE) {
        return state.filter(d => d !== action.pokemonType);
    }
    return state;
}

const selectedPokemon = (state = null, action) => {
    if (action.type === SELECT_POKEMON) {
        return action.pokemon;
    }
    return state;
}

const loading = (state = true, action) => {
    switch (action.type) {
        case LOADING_STARTED:
        case FORM_LOADING_START:
            return true;
        case LOADING_DONE:
        case FORM_LOADING_END:
            return false;
        default:
            return state;
    }
    /*if (action.type === LOADING_STARTED) {
        return true;
    } else if (action.type === LOADING_DONE) {
        return false;
    }
    return state;*/
}

const xStat = (state = "Attack", action) => {
    if (action.type === X_STAT) {
        return action.stat;
    }
    return state;
}

const yStat = (state = "Defense", action) => {
    if (action.type === Y_STAT) {
        return action.stat;
    }
    return state;
}

const oneType = (state = false, action) => {
    switch (action.type) {
        case ONE_TYPE:
            return true;
        case ADD_TYPE:
        case REMOVE_TYPE:
            return false;
        default:
            return state;
    }
}

const pokemonForms = (state = [], action) => {
    if (action.type === FORM_LOADING_END) {
        return action.payload;
    }
    return state;
}

const reducer = combineReducers({
    pokemon,
    includedTypes,
    selectedPokemon,
    loading,
    xStat,
    yStat,
    oneType,
    pokemonForms
})

export default reducer;
