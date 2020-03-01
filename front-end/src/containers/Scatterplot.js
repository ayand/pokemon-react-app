import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeXStat, changeYStat, selectPokemon, getPokemonForms } from '../actions';
import D3ScatterplotComponent from '../d3-components/D3ScatterplotComponent';

class ScatterplotComponent extends Component {

    componentDidMount() {
        this.chart = new D3ScatterplotComponent(this.svg, this.props);
    }

    componentDidUpdate() {
        this.chart.update(this.svg, this.props);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <h5>X Stat</h5>
                        <select value={this.props.xStat} onChange={this.props.changeX}>
                            <option value="Attack">Attack</option>
                            <option value="Defense">Defense</option>
                            <option value="Special Attack">Special Attack</option>
                            <option value="Special Defense">Special Defense</option>
                            <option value="Speed">Speed</option>
                            <option value="HP">HP</option>
                        </select>
                    </div>
                    <div className="col-lg-6" >
                        <h5>Y Stat</h5>
                        <select value={this.props.yStat} onChange={this.props.changeY}>
                            <option value="Attack">Attack</option>
                            <option value="Defense">Defense</option>
                            <option value="Special Attack">Special Attack</option>
                            <option value="Special Defense">Special Defense</option>
                            <option value="Speed">Speed</option>
                            <option value="HP">HP</option>
                        </select>
                    </div>
                </div>
                <svg height="500" width="500" ref={svg => this.svg = svg} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokemon,
        includedTypes: state.includedTypes,
        xStat: state.xStat,
        yStat: state.yStat,
        oneType: state.oneType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeX: (event) => { dispatch(changeXStat(event.target.value)) },
        changeY: (event) => { dispatch(changeYStat(event.target.value)) },
        selectPokemon: (pokemon) => {
            dispatch(selectPokemon(pokemon));
        }
    }
}

const Scatterplot = connect(mapStateToProps, mapDispatchToProps)(ScatterplotComponent);

export default Scatterplot;
