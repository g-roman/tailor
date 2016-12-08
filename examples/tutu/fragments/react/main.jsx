define (['react', 'react-dom', 'state'], function (React, ReactDom, state) {

	let rootElement;

	const Component = ({count, onChange}) => (
		<div>
			<div>React count: {count}</div>
			<div><button onClick={()=>onChange(count+1)}>+</button></div>
		</div>
	);

	const onChange = (val) => {
		state.set('counter', val);
	};

	const render = () => {
		ReactDom.render(
			<Component count={state.get('counter')} onChange={onChange}/>,
			rootElement
		);
	};

	return function initFragment (element) {
		rootElement = element;
		state.onChange(render);
		render();
	};
});