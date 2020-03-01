import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addType, removeType, showOneType } from '../actions';
import D3BarChartComponent from '../d3-components/D3BarChartComponent';
import * as d3 from 'd3';

class BarChartComponent extends Component {

    seeSingleType(types) {
        d3.selectAll(".dot")
            .style("display", function(d) {
                if (d.type_1 === types[0] && d.type_2 === "None") {
                    return "block";
                }
                return "none";
            })
        this.props.showOneType();
    }

    componentDidMount() {
        this.chart = new D3BarChartComponent(this.svg, this.props);
    }

    componentDidUpdate() {
        this.chart.update(this.svg, this.props);
    }

    render() {
      return (
        <div>
            <svg width="500" height="500" ref={svg => this.svg = svg} />
            <br/>

            <button style={{ "display": (this.props.types.length === 1) ? "block" : "none" }} className="btn btn-success" onClick={e => {this.seeSingleType(this.props.types)} }>See single typed Pokémon</button>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokemon,
        types: state.includedTypes,
        oneType: state.oneType
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addType: (type) => { dispatch(addType(type)) },
        removeType: (type) => { dispatch(removeType(type)) },
        showOneType: () => { dispatch(showOneType()) }
    }
}

const BarChart = connect(mapStateToProps, mapDispatchToProps)(BarChartComponent);

export default BarChart;
