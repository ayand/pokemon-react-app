import React from 'react';
import { connect } from 'react-redux'
import {fetchPokemon} from '../actions';
import { bindActionCreators } from 'redux';
import BarChart from './BarChart';
import Scatterplot from './Scatterplot';
import PokemonDisplay from './PokemonDisplay';

class PokemonApp extends React.Component {

    componentDidMount() {
        this.props.getPokemon();
    }

    render() {
        if (this.props.loading) {
            return <div>Loading</div>
        }
        return (
            <div>
                <div className="row">
                    <div style={{ textAlign: 'center' }} className="col-lg-6">
                        <h2 >Bar Chart</h2>
                        <BarChart />
                    </div>
                    <div style={{ textAlign: 'center' }} className="col-lg-6">
                        <h2>Scatterplot</h2>
                        <Scatterplot/>
                    </div>
                </div>
                <PokemonDisplay/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        pokemon: state.pokemon
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getPokemon: fetchPokemon
}, dispatch)

const PokemonAppComponent = connect(mapStateToProps, mapDispatchToProps)(PokemonApp);

export default PokemonAppComponent;
