var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config');

router.get('/', function (req, res, next) {
	res.render('index.html');
});

module.exports = router;