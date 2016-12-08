'use strict';
const fs = require('fs');

module.exports = (filePath, contentType, response) => {
	const readStream = fs.createReadStream(filePath);
	response.writeHead(200, {'Content-Type': contentType});
	readStream.pipe(response);
};
