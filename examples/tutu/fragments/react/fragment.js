'use strict';
const url = require('url');
const path = require('path');
const fileToStream = require('../../stream');

module.exports = (fragmentName, fragmentUrl) => (request, response) => {
	const pathname = url.parse(request.url).pathname;

	if (/.+\.js$/g.test(pathname)) {
		fileToStream(path.join(__dirname, pathname), 'application/javascript', response);
	} else if (/.+\.css$/g.test(pathname)) {
		fileToStream(path.join(__dirname, pathname), 'text/css', response);
	} else {
		response.writeHead(200, {
			'Link': `<${fragmentUrl}/style.css>; rel="stylesheet",` +
			`<${fragmentUrl}/main.js>; rel="fragment-script"`,
			'Content-Type': 'text/html'
		});
		response.end(`
            <div class="content">
                Loading...
            </div>
        `);
	}
};
