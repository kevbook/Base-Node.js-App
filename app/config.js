module.exports = function(){
	
	var config,
			devConfig, 
			prodConfig;

	devConfig = {
		baseUrl: 'localhost:8000/',
		mongodb: {
			url: process.env.MONGO_DB || 'mongodb://kevin:kevin@staff.mongohq.com:10004/nodetest'
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
    	appId: '111565172259433',
    	appSecret: '85f7e0a0cc804886180b887c1f04a3c1'
		},
		twitter: {
			consumerKey: 'JLCGyLzuOK1BjnKPKGyQ',
    	consumerSecret: 'GNqKfPqtzOcsCtFbGTMqinoATHvBcy1nzCTimeA9M0'
		},
		instagram: {
      clientId: 'be147b077ddf49368d6fb5cf3112b9e0',
      clientSecret: 'b65ad83daed242c0aa059ffae42feddd'
    },
		postageapp: {
			apiKey: 'bGXPh45Q8DtxH8KBuqnEp68fC0zB083i'
		},
		viewOptions: {
			pretty: true,
    	assetVersion: '?v1',
    	assetUrl: '',
    	//debug: true
		},
	};


	prodConfig = {
		baseUrl: 'localhost:8000/',
		mongodb: {
			url: process.env.MONGO_DB || 'mongodb://kevin:kevin@staff.mongohq.com:10004/nodetest'
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
    	appId: '111565172259433',
    	appSecret: '85f7e0a0cc804886180b887c1f04a3c1'
		},
		twitter: {
			consumerKey: 'JLCGyLzuOK1BjnKPKGyQ',
    	consumerSecret: 'GNqKfPqtzOcsCtFbGTMqinoATHvBcy1nzCTimeA9M0'
		},
		instagram: {
      clientId: 'be147b077ddf49368d6fb5cf3112b9e0',
      clientSecret: 'b65ad83daed242c0aa059ffae42feddd'
    },
		postageapp: {
			apiKey: 'bGXPh45Q8DtxH8KBuqnEp68fC0zB083i'
		},
		viewOptions: {
			pretty: false,
    	assetVersion: '?v1',
    	assetUrl: 'https://s3.amazonaws.com/hackd/assets/'
		},
	};

	return config = (process.env.NODE_ENV === undefined) ? devConfig : prodConfig;
};