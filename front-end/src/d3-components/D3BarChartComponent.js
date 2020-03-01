import * as d3 from 'd3';
import d3Tip from "d3-tip";
import '../css/d3-tip.css';

class D3BarChartComponent {
    constructor(element, props) {
        this.svg = d3.select(element);
        this.props = props;

        this.tip = d3Tip().attr("class", "d3-tip").html(function(d) {
            return `
              <h5>${d.type}</h5>
              <p>Count: ${d.count}</p>
              `
        }).direction('e');

        const typeDict = {
            "Grass": 0,
            "Poison": 0,
            "Fire": 0,
            "Flying": 0,
            "Dragon": 0,
            "Water": 0,
            "Bug": 0,
            "Normal": 0,
            "Dark": 0,
            "Electric": 0,
            "Psychic": 0,
            "Ground": 0,
            "Ice": 0,
            "Steel": 0,
            "Fairy": 0,
            "Fighting": 0,
            "Rock": 0,
            "Ghost": 0
        }

        const colorDict = {
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

        this.props.pokemon.forEach(pokemon => {
            typeDict[pokemon.type_1] += 1;
            if (pokemon.type_2 !== "None") {
                typeDict[pokemon.type_2] += 1;
            }
        })

        const data = [];

        Object.keys(typeDict).forEach((key, index) => {
            data.push({ "type": key, "count": typeDict[key] })
        })

        data.sort((a, b) => b.count - a.count);
        this.svg.call(this.tip);

        const types = data.map(type => type.type);

        const yScale = d3.scaleBand().domain(types).range([60, 440]).paddingInner([0.05]);
        const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.count)]).range([70, 460])

        this.svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 70)
            .attr("y", d => yScale(d.type))
            .attr("height", yScale.bandwidth())
            .attr("width", d => xScale(d.count) - xScale(0))
            .attr("fill", d => colorDict[d.type])
            .style("cursor", "pointer")
            .on("mouseover", this.tip.show)
            .on("mouseout", this.tip.hide)
            .on("click", function(d) {
                if (props.types.includes(d.type)) {
                    props.removeType(d.type);
                } else {
                    props.addType(d.type);
                }
            })

        this.svg.append('g')
            .attr('class', 'yAxis')
            .attr('transform', 'translate(70, 0)')
            .call(d3.axisLeft(yScale));

        this.svg.append('g')
            .attr('class', 'yAxis')
            .attr('transform', 'translate(0, 60)')
            .call(d3.axisTop(xScale));

        this.svg.append("text")
            .attr("x", 250)
            .attr("y", 20)
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .text("Pokémon Type Count");
    }

    update(element, props) {
        this.svg.selectAll(".bar")
            .on("click", function(d) {
                if (props.types.includes(d.type)) {
                    props.removeType(d.type);
                } else {
                    props.addType(d.type);
                }
            })
            .style("opacity", d => (props.types.includes(d.type) || props.types.length === 0) ? 1 : 0.2)
    }
}

export default D3BarChartComponent;
