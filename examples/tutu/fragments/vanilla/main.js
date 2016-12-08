define (['state'], function (state) {

	let rootElement;

	const render = () => {
		rootElement.querySelector('.text').innerHTML = 'Vanilla JS count: ' + state.get('counter');
	};

	return function initFragment (element) {
		rootElement = element;
		state.onChange(render);

		rootElement.querySelector('.btn').addEventListener('click', () => {
			state.set('counter', state.get('counter') - 1);
		});

		render();
	};
});