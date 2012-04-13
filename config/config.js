module.exports = function(){
	
	var config,
			devConfig, 
			prodConfig;

	devConfig = {
		mongodb: {
			url: process.env.MONGO_DB || 'mongodb://kevin:kevin@staff.mongohq.com:10004/node_test'
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
			apiKey: 'MQNVrlQalbQQHJLFmfoDUSreLsYemgYp'
		},
		viewOptions: {
			pretty: true,
    	assetVersion: '?v1',
    	assetUrl: ''
		},
	};


	prodConfig = {
		mongodb: {
			url: process.env.MONGO_DB || 'mongodb://kevin:kevin@staff.mongohq.com:10004/node_test'
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
			apiKey: 'MQNVrlQalbQQHJLFmfoDUSreLsYemgYp'
		},
		viewOptions: {
			pretty: false,
    	assetVersion: '?v1',
    	assetUrl: 'https://s3.amazonaws.com/hackd/assets/'
		},
	};

	return config = (process.env.NODE_ENV === undefined) ? devConfig : prodConfig;
};