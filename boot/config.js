module.exports = function(){
	
	var config,
			devConfig, 
			prodConfig;

	/**
	 * config variables
	 * @ development environment 
	 **/

	devConfig = {
		baseUrl: 'http://localhost:8000/',
		mongodb: {
			url: process.env.MONGO_DB || 'mongodb://kevin:kevin@staff.mongohq.com:10004/test-node'
			//'mongodb://Kevin-Sakhujas-MacBook-Air.local:27017/data/db/'
		},
		redis: {
			host: 'guppy.redistogo.com',
			pass: '2b3ea48b8ae24d449f99ffffc4a9892d',
			port: 9382
		},
		loggly: {
			subdomain:'kevbook'
		},
		fb: {
    	appId: '410624428961423',
    	appSecret: 'ad89b192f98e1768e22ea08ad882d921',
    	callback: 'http://localhost:8000/login/fb',
    	cookieSecret: '12324'
		},
		twitter: {
			consumerKey: 'XozxVcMxlnzI456zimcrg',
    	consumerSecret: 'Ei6RTbOUu9Y4fsOOq3qju6yTPjPr2xjxPy8JtsGbPA'
		},
		postageapp: {
			apiKey: 'bGXPh45Q8DtxH8KBuqnEp68fC0zB083i'
		},
		viewOptions: {
			pretty: true,
    	assetVersion: '?v2',
    	assetUrl: 'http://127.0.0.1:8000/',
    	baseUrl: 'localhost:8000/'
    	//debug: true
		},
	};


	/**
	 * config variables
	 * @ production environment 
	 **/

	prodConfig = {
		baseUrl: 'http://localhost:8000/',
		mongodb: {
			url: process.env.MONGO_DB || 'mongodb://kevin:kevin@staff.mongohq.com:10004/test-node'
		},
		redis: {
			host: 'guppy.redistogo.com',
			pass: '2b3ea48b8ae24d449f99ffffc4a9892d',
			port: 9382
		},
		loggly: {
			subdomain:'kevbook'
		},
		fb: {
    	appId: '410624428961423',
    	appSecret: 'ad89b192f98e1768e22ea08ad882d921',
    	callback: 'http://localhost:8000/login/fb',
    	cookieSecret: '12324'
		},
		twitter: {
			consumerKey: 'XozxVcMxlnzI456zimcrg',
    	consumerSecret: 'Ei6RTbOUu9Y4fsOOq3qju6yTPjPr2xjxPy8JtsGbPA'
		},
		postageapp: {
			apiKey: 'bGXPh45Q8DtxH8KBuqnEp68fC0zB083i'
		},
		viewOptions: {
			pretty: false,
    	assetVersion: '?v1',
    	assetUrl: 'https://s3.amazonaws.com/hackd/assets/',
    	baseUrl: 'localhost:8000/'
		},
	};

	return config = (process.env.NODE_ENV === undefined) ? devConfig : prodConfig;
};