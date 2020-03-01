import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { selectPokemon, getPokemonForms } from '../actions';
import {connect} from 'react-redux';

const PokemonForms = ({ selectedPokemon, pokemonForms, selectPokemon, getPokemonForms }) => {

    useEffect(() => {
        if (selectedPokemon !== null) {
            getPokemonForms(selectedPokemon);
        }
    }, [selectedPokemon])

    return (
        <Fragment>
            {pokemonForms.length > 0 && pokemonForms.map(form => {
                return (
                  <div className="row" key={form.api_id.toString()}>
                      <div className="col-lg-4">
                          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${form.api_id}.png`} height="80" alt="pokemon-form.png"/>
                      </div>
                      <div style={{textAlign: 'left', margin: 'auto'}} className="col-lg-8">
                          <a style={{'cursor': 'pointer'}} onClick={e => selectPokemon(form)}>{form.name}</a>
                      </div>
                  </div>
                )
            })}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedPokemon: state.selectedPokemon,
        pokemonForms: state.pokemonForms
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectPokemon: (pokemon) => { dispatch(selectPokemon(pokemon)) },
        getPokemonForms: (pokemon) => { dispatch(getPokemonForms(pokemon)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonForms);
