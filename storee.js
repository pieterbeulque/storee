export default function storee() {
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
			console.error(e);
		}
	};

	const get = (key) => {
		try {
			const value = window.localStorage.getItem(key);

			if (value) {
				let parsedValue = value.trim();

				if (!Number.isNaN(Number(parsedValue))) {
					parsedValue = Number(parsedValue);
				} else if (parsedValue.startsWith('{') && parsedValue.endsWith('}')) {
					try {
						parsedValue = JSON.parse(parsedValue);
					} catch (e) {
						parsedValue = value.trim();
					}
				}

				return parsedValue;
			}

			return value;
		} catch (e) {
			return undefined;
		}
	};

	return { set, get };
}
