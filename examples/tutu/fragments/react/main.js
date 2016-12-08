define(['react', 'react-dom', 'state'], function (React, ReactDom, state) {

	let rootElement;

	const Component = ({ count, onChange }) => React.createElement(
		'div',
		null,
		React.createElement(
			'div',
			null,
			'React count: ',
			count
		),
		React.createElement(
			'div',
			null,
			React.createElement(
				'button',
				{ onClick: () => onChange(count + 1) },
				'+'
			)
		)
	);

	const onChange = val => {
		state.set('counter', val);
	};

	const render = () => {
		ReactDom.render(React.createElement(Component, { count: state.get('counter'), onChange: onChange }), rootElement);
	};

	return function initFragment(element) {
		rootElement = element;
		state.onChange(render);
		render();
	};
});

//# sourceMappingURL=main.js.map