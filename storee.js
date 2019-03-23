if (typeof Number.isNaN !== 'function') {
	// eslint-disable-next-line no-self-compare, eqeqeq
	Number.isNaN = (value) => value !== null && (value != value || +value != value);
}

export default function storee(options = {}) {
	const backup = {};

	if (typeof options !== 'undefined' && typeof options !== 'object') {
		throw new Error('invalid options');
	}

	const store = (() => {
		if (typeof options.store === 'undefined') {
			return window.localStorage;
		}

		if (typeof options.store !== 'object') {
			throw new Error('invalid store');
		}

		if (typeof options.store.setItem !== 'function') {
			throw new Error('invalid store');
		}

		if (typeof options.store.getItem !== 'function') {
			throw new Error('invalid store');
		}

		return options.store;
	})();

	const set = (key, value) => {
		const type = typeof value;
		let parsedValue = value;

		if (type === 'string') {
			parsedValue = value.trim();
		} else if (type === 'number') {
			parsedValue = value.toString();
		} else if (type === 'object') {
			parsedValue = JSON.stringify(parsedValue);
		}

		try {
			store.setItem(key, parsedValue);
		} catch (e) {
			backup[key] = parsedValue;
		}
	};

	const get = (key) => {
		const value = (() => {
			try {
				const v = store.getItem(key);

				if (v === null && typeof backup[key] !== 'undefined') {
					return backup[key];
				}

				return v;
			} catch (e) {
				return backup[key];
			}
		})();

		if (value) {
			let parsedValue = value.trim();

			const valueCastAsNumber = Number(parsedValue);

			if (!Number.isNaN(valueCastAsNumber)) {
				parsedValue = valueCastAsNumber;
			} else if (parsedValue.match(/[{|[].*[}|\]]/)) {
				try {
					parsedValue = JSON.parse(parsedValue);
				} catch (e) {
					parsedValue = value.trim();
				}
			} else if (parsedValue === 'true') {
				parsedValue = true;
			} else if (parsedValue === 'false') {
				parsedValue = false;
			}

			return parsedValue;
		}

		return value;
	};

	const remove = (key) => {
		localStorage.removeItem(key);
	};

	const clear = () => {
		localStorage.clear();
	};

	return {
		set, get, remove, clear,
	};
}
