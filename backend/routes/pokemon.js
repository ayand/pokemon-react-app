var express = require('express');
var router = express.Router();
var fs = require('file-system');
var utils = require("../utils/asyncHelper");
var request = require('request-promise');

router.get('/', function(req, res, next) {
    var pokemon = JSON.parse(fs.readFileSync('data/all_pokemon.json'));
    return res.status(201).send(pokemon);
})

router.get('/:pokemonId', function(req, res, next) {
    var id = req.params.pokemonId;
    var pokemon = JSON.parse(fs.readFileSync('data/all_pokemon.json'));
    return res.status(201).send(pokemon.filter(d => d.api_id == parseInt(id))[0]);
})

module.exports = router;
