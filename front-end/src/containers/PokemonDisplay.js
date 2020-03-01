import React, { Component, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPokemonForms } from '../actions';
import axios from 'axios';
import PokemonForms from './PokemonForms';

class PokemonDisplay extends Component {

    constructor(props) {
        super(props);
        this.scrollDiv = React.createRef();
        this.colorDict = {
            "Grass": "#5DC04E",
            "Poison": "#9328DA",
            "Fire": "#EC993B",
            "Flying": "#BAADDE",
            "Dragon": "#6600CC",
            "Water": "#2993DA",
            "Bug": "#9DC148",
            "Normal": "#C4BEAE",
            "Dark": "#5C4368",
            "Electric": "#FFDE35",
            "Psychic": "#FF007F",
            "Ground": "#DFB980",
            "Ice": "#99FFFF",
            "Steel": "#A0A0A0",
            "Fairy": "pink",
            "Fighting": "#A12C2C",
            "Rock": "#87632C",
            "Ghost": "#60447C"
        }

    }

    showTypes() {
        if (this.props.pokemon.type_2 === "None") {
            return (
                <div className="row">
                    <div className="col-12">
                        <label className="btn btn-default btn-block" style={{ backgroundColor: this.colorDict[this.props.pokemon.type_1], color: 'white' }}>{this.props.pokemon.type_1}</label>
                    </div>
                </div>
            )
        }
        return (
            <div className="row no-gutters">
                <div className="col-6">
                    <label className="btn btn-default btn-block" style={{ backgroundColor: this.colorDict[this.props.pokemon.type_1], color: 'white' }}>{this.props.pokemon.type_1}</label>
                </div>
                <div className="col-6">
                    <label className="btn btn-default btn-block" style={{ backgroundColor: this.colorDict[this.props.pokemon.type_2], color: 'white' }}>{this.props.pokemon.type_2}</label>
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        this.scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
        this.stats = [
          { "type": "Attack", "value": this.props.pokemon.attack },
          { "type": "Defense", "value": this.props.pokemon.defense },
          { "type": "Special Attack", "value": this.props.pokemon.special_attack },
          { "type": "Special Defense", "value": this.props.pokemon.special_defense },
          { "type": "Speed", "value": this.props.pokemon.speed }
        ]
    }

    render() {
        if (!this.props.pokemon) {
            return (
              <div>
                  <h4>Select a Pokémon in the scatterplot to see its stats</h4>

              </div>
            )
        }
        return (
            <div style={{ textAlign: 'center' }} ref={this.scrollDiv}>
                <h4>{this.props.pokemon.name}</h4>
                <br/>
                <div className="row">
                    <div className="col-lg-4">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.pokemon.api_id}.png`} height="150" alt="pokemon.png"/>
                        <br/>
                        {this.showTypes()}
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td style={{textAlign: 'left'}}>HP</td>
                                    <td style={{textAlign: 'right'}}>{this.props.pokemon.hp}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: 'left'}}>Attack</td>
                                    <td style={{textAlign: 'right'}}>{this.props.pokemon.attack}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: 'left'}}>Defense</td>
                                    <td style={{textAlign: 'right'}}>{this.props.pokemon.defense}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: 'left'}}>Special Attack</td>
                                    <td style={{textAlign: 'right'}}>{this.props.pokemon.special_attack}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: 'left'}}>Special Defense</td>
                                    <td style={{textAlign: 'right'}}>{this.props.pokemon.special_defense}</td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: 'left'}}>Speed</td>
                                    <td style={{textAlign: 'right'}}>{this.props.pokemon.speed}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4">
                    </div>
                    <div className="col-lg-4">
                        <h5>Forms</h5>
                        <PokemonForms/>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        pokemon: state.selectedPokemon
    }
}

export default connect(mapStateToProps)(PokemonDisplay)
