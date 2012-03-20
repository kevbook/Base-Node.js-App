openssl genrsa -des3 -out localhost.key 1024

cat localhost.key

openssl req -new -key localhost.key -out localhost.csr

openssl x509 -req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt
