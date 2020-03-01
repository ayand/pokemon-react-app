var express = require('express');
var router = express.Router();
var fs = require('file-system');


router.get('/', function(req, res, next) {
    var pokemon = JSON.parse(fs.readFileSync('data/all_pokemon.json'));

    var species = [];
    var output = [];
    pokemon.forEach(function(d) {
        if (!species.includes(d.species_id)) {
            species.push(d.species_id);
            output.push({
                "species_id": d.species_id,
                "species_name": d.species_name
            })
        }
    })


    return res.status(201).send(output);
})

router.get('/:pokemonId/forms', function(req, res, next) {
    var pokemon = JSON.parse(fs.readFileSync('data/all_pokemon.json'));
    return res.status(201).send(pokemon.filter(d => d.species_id == parseInt(req.params.pokemonId)))
})

module.exports = router;
