#evntiveApp#

**Http server** certificates and keys are located in the `keys` directory. New certificates can be created for dev purposes:
	
	openssl genrsa -out localhost.key 1024
	
	cat localhost.key
	
	openssl req -new -key localhost.key -out localhost.csr
	
	openssl x509 -req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt 


### Environment variables ###
**DB_URL** variable

	$ DB_URL=mongodb://localhost/dbname


**NODE_ENV** environment

	$ NODE_ENV=production