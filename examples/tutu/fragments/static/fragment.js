'use strict';
const url = require('url');
const path = require('path');
const fileToStream = require('../../stream');

module.exports = (fragmentName, fragmentUrl) => (request, response) => {
	const pathname = url.parse(request.url).pathname;

	switch (pathname) {
		case '/fragment.css':
			fileToStream(path.join(__dirname, 'style.css'), 'text/css', response);
			break;
		default:
			// serve fragment's body
			response.writeHead(200, {
				'Link': `<${fragmentUrl}/fragment.css>; rel="stylesheet"`,
				'Content-Type': 'text/html'
			});
			response.end(`
                <div class="fragment">
                    Данные, использованные на сайте, включая стоимость билетов, а также расписание самолетов, поездов и электропоездов, взяты из официальных источников. Заказы ж/д билетов и авиабилетов, включая электронные жд билеты, оформляются партнерами Туту.ру. Стоимость указана с учетом сервисного сбора Туту.ру. Окончательную сумму можно увидеть на шаге подтверждения заказа. Ж/д, авиабилеты и туры найдены с помощью КТИС (Сколково).
                </div>
            `);
	}
};
