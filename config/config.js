module.exports = function(){
	
	var config,
			devConfig, 
			prodConfig;

	devConfig = {
		mongodb: {
			path: process.env.MONGO_DB || 'mongodb://hackd:hackd@staff.mongohq.com:10045/hackd'
		},
		loggly: {
			subdomain:'kevbook'
		},
		fb: {
    	appId: '123',
    	appSecret: '123'
		},
		twitter: {
			appId: '123',
    	appSecret: '123'
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
			path: process.env.MONGO_DB || 'mongodb://hackd:hackd@staff.mongohq.com:10045/hackd'
		},
		loggly: {
			subdomain:'kevbook'
		},
		fb: {
    	appId: '123',
    	appSecret: '123'
		},
		twitter: {
			appId: '123',
    	appSecret: '123'
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
	//return config;
};