'use strict';

const http = require('http');
const fs = require('fs');
const server = http.createServer(function($request, $response){
	var origin = 'WebContent',
		contentType = 'text/html',
		path = $request.url == '/' ? 'WebContent/html/collection_dev.html' : $request.url;

	if( path.indexOf('.css') > 0 ) contentType = 'text/css';
	if( path.indexOf('.js') > 0 ) contentType = 'text/javascript';
	if( path.indexOf('.png') > 0 ) contentType = 'image/png';
	if( path.indexOf('.jpg') > 0 ) contentType = 'image/jpeg';
	
	fs.readFile(origin + path, function($err, $contents){
		if($err){
			$response.writeHead(404);
			$response.end();
			return;
		}

		$response.writeHead(200, {'Content-Type' : contentType});
		$response.end($contents, 'utf-8');
		// $response.write($contents);
		$response.end();
	});
});

server.listen(3000);

console.log('Server is now starting...');