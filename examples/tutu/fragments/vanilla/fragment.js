'use strict';
const url = require('url');
const path = require('path');
const fileToStream = require('../../stream');

module.exports = (fragmentName, fragmentUrl) => (request, response) => {
    const pathname = url.parse(request.url).pathname;
    switch (pathname) {
        case '/fragment.js':
            // serve fragment's JavaScript
            fileToStream(path.join(__dirname, 'main.js'), 'application/javascript', response);
            break;
        case '/fragment.css':
            fileToStream(path.join(__dirname, 'style.css'), 'text/css', response);
            break;
        default:
            // serve fragment's body
            response.writeHead(200, {
                'Link': `<${fragmentUrl}/fragment.css>; rel="stylesheet",` +
                        `<${fragmentUrl}/fragment.js>; rel="fragment-script"`,
                'Content-Type': 'text/html'
            });
            response.end(`
                <div class="menu">
                    <div class="text"></div>
                    <button class="btn">-</button>
                </div>
            `);
    }
};
