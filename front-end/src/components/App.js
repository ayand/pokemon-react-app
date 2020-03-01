import React from 'react';
import PokemonAppComponent from '../containers/PokemonApp';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h2 style={{ textAlign: 'center' }}>Pokémon Vis</h2>
                <br/>
                <PokemonAppComponent />
            </div>
        )
    }
}

export default App;
