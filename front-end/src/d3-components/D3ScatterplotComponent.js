import * as d3 from 'd3';
import d3Tip from "d3-tip";
import '../css/d3-tip.css';

class D3ScatterplotComponent {
    constructor(element, props) {
        this.svg = d3.select(element);

        this.tip = d3Tip().attr("class", "d3-tip").html(function(d) {
            return `
              <div style="text-align:center">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${d.api_id}.png" height="75"/>
                  <h6>${d.name}</h6>
              </div>
              `
        }).direction('s');

        this.svg.call(this.tip);

        this.statData = {
            "Attack": {
                "field": "attack",
                "xScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["attack"])]).range([40, 420]),
                "yScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["attack"])]).range([390, 10])
            },
            "Defense": {
                "field": "defense",
                "xScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["defense"])]).range([40, 420]),
                "yScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["defense"])]).range([390, 10])
            },
            "Special Attack": {
                "field": "special_attack",
                "xScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["special_attack"])]).range([40, 420]),
                "yScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["special_attack"])]).range([390, 10])
            },
            "Special Defense": {
                "field": "special_defense",
                "xScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["special_defense"])]).range([40, 420]),
                "yScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["special_defense"])]).range([390, 10])
            },
            "Speed": {
                "field": "speed",
                "xScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["speed"])]).range([40, 420]),
                "yScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["speed"])]).range([390, 10])
            },
            "HP": {
                "field": "hp",
                "xScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["hp"])]).range([40, 420]),
                "yScale": d3.scaleLinear().domain([0, d3.max(props.pokemon, d => d["hp"])]).range([390, 10])
            }
        }

        this.svg.selectAll(".dot")
            .data(props.pokemon, d => d.api_id.toString())
            .enter().append("circle")
            .attr("class", "dot")
            .attr("fill", "green")
            .attr("r", 5)
            .attr("cx", d => this.statData[props.xStat]["xScale"](d[this.statData[props.xStat]["field"]]))
            .attr("cy", d => this.statData[props.yStat]["yScale"](d[this.statData[props.yStat]["field"]]))
            .style("cursor", "pointer")
            .style("stroke", "black")
            .style("opacity", 0.4)
            .style("display", function(d) {
                let condition = true;
                if (props.includedTypes.length === 2) {
                    condition = props.includedTypes.includes(d.type_1) && props.includedTypes.includes(d.type_2);
                } else if (props.includedTypes.length === 1) {
                    condition = props.includedTypes.includes(d.type_1) || props.includedTypes.includes(d.type_2);
                }
                if (props.oneType === true) {
                    condition = condition && d.type_2 === "None";
                }
                return condition ? "block" : "none";
            })
            .on("mouseover", this.tip.show)
            .on("mouseout", this.tip.hide)
            .on("click", props.selectPokemon)

        this.xAxis = this.svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0, 390)");

        this.yAxis = this.svg.append("g")
            .attr("class", "yAxis")
            .attr("transform", "translate(40, 0)");

        this.xAxis.call(d3.axisBottom(this.statData[props.xStat]["xScale"]));
        this.yAxis.call(d3.axisLeft(this.statData[props.yStat]["yScale"]));

    }

    update(element, props) {

        this.svg.selectAll(".dot")
            .transition()
            .duration(1000)
            .attr("cx", d => this.statData[props.xStat]["xScale"](d[this.statData[props.xStat]["field"]]))
            .attr("cy", d => this.statData[props.yStat]["yScale"](d[this.statData[props.yStat]["field"]]))
            .style("display", function(d) {
                let condition = true;
                if (props.includedTypes.length === 2) {
                    condition = props.includedTypes.includes(d.type_1) && props.includedTypes.includes(d.type_2);
                } else if (props.includedTypes.length === 1) {
                    condition = props.includedTypes.includes(d.type_1) || props.includedTypes.includes(d.type_2);
                }
                if (props.oneType === true) {
                    condition = condition && d.type_2 === "None";
                }
                return condition ? "block" : "none";
            })

        this.xAxis.transition().duration(1000).call(d3.axisBottom(this.statData[props.xStat]["xScale"]));
        this.yAxis.transition().duration(1000).call(d3.axisLeft(this.statData[props.yStat]["yScale"]));
    }
}

export default D3ScatterplotComponent;
