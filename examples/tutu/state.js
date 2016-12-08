define('state', () => {

	const store = {
		counter: 0
	};
	const pubs = {};

	const state = {
		get: (name) => store[name],
		set: (name, val) => {
			let isChanged = store[name] !== val;
			store[name] = val;
			if (isChanged) state.triggerChange();
		},
		on: (action, callback) => {
			if (!(action in pubs)) pubs[action] = [];
			pubs[action].push(callback);
		},
		trigger: (action) => {
			if (!(action in pubs)) return;
			pubs[action].forEach((callback) => {
				callback(state);
			});
		},
		ACTION_CHANGE: 'change',
		onChange: (callback) => state.on(state.ACTION_CHANGE, callback),
		triggerChange: () => state.trigger(state.ACTION_CHANGE)
	};

	return state;
});