export default function storee() {
	const backup = {};

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
			window.localStorage.setItem(key, parsedValue);
		} catch (e) {
			backup[key] = parsedValue;
		}
	};

	const get = (key) => {
		const value = (() => {
			try {
				const v = window.localStorage.getItem(key);

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

			if (!Number.isNaN(Number(parsedValue))) {
				parsedValue = Number(parsedValue);
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
