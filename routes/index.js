var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

router.get('/characters', function(req, res, next)  {
	var url = 'https://rickandmortyapi.com/api/character';
	var queryParamAdded = 0; 
	if (req.query.gender) {
		url += queryParamAdded === 0 ? '?gender=' + req.query.gender : '&gender=' + req.query.gender; 
		queryParamAdded++;
	}
	if (req.query.species) {
		url += queryParamAdded === 0 ? '?species=' + req.query.species : '&species=' + req.query.species; 
		queryParamAdded++;
	}
	if (req.query.origin) {
		url += queryParamAdded === 0 ? '?origin=' + req.query.origin : '&origin=' + req.query.origin; 
		queryParamAdded++;
	}
	request.get({
		headers: { 'content-type' : 'application/json', 'Accept': 'application/json' },
		url: url
	},function(error, response, body) {
		var obj = JSON.parse(body);
		return res.send(obj);
	});    
});

module.exports = router;
