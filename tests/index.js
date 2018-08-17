import chai from 'chai';
import storee from '../storee';
import localStorage from 'mock-local-storage';

global.window = { localStorage: global.localStorage };

describe('plugin and its interface', () => {
	it('is a function', () => {
		chai.expect(storee).to.be.a('function');
	});

	it('has a set method', () => {
		const store = storee();
		chai.expect(store.set).to.be.a('function');
	});

	it('has a get method', () => {
		const store = storee();
		chai.expect(store.get).to.be.a('function');
	});

	it('has a remove method', () => {
		const store = storee();
		chai.expect(store.remove).to.be.a('function');
	});

	it('has a clear method', () => {
		const store = storee();
		chai.expect(store.clear).to.be.a('function');
	});
});

describe('storing values', () => {
	it('can store a string value', () => {
		const store = storee();
		const key = 'good';
		const value = 'boy';

		store.set(key, value);

		chai.expect(store.get(key)).to.equal(value);
	});

	it('can store an integer value', () => {
		const store = storee();
		const key = 'one';
		const value = 1;

		store.set(key, value);

		chai.expect(store.get(key)).to.equal(value);
	});

	it('can store an numeric value', () => {
		const store = storee();
		const key = 'pi';
		const value = 3.1415;

		store.set(key, value);

		chai.expect(store.get(key)).to.equal(value);
	});

	it('can store a boolean true value', () => {
		const store = storee();
		const key = 'isit';
		const value = true;

		store.set(key, value);

		chai.expect(store.get(key)).to.equal(value);
	});

	it('can store a boolean false value', () => {
		const store = storee();
		const key = 'orisit';
		const value = false;

		store.set(key, value);

		chai.expect(store.get(key)).to.equal(value);
	});

	it('can store an object value', () => {
		const store = storee();
		const key = 'object';
		const value = { one: [2, 3], four: 'five', six: 7 };

		store.set(key, value);

		chai.expect(store.get(key)).to.deep.equal(value);
	});

	it('can store an array value', () => {
		const store = storee();
		const key = 'array';
		const value = [1, 2, 3, 4];

		store.set(key, value);

		chai.expect(store.get(key)).to.deep.equal(value);
	});
});

describe('removing values', () => {
	it('can remove any value', () => {
		const store = storee();
		const key = 'trash';
		const value = false;

		store.set(key, value);
		store.remove(key);

		chai.expect(store.get(key)).to.be.an('null');
	});

	it('can clear all values', () => {
		const store = storee();
		const key = 'trash';
		const value = false;

		store.set(key, value);
		store.clear();

		chai.expect(store.get(key)).to.be.an('null');
	});
});

describe('handling unexpected values', () => {
	it('returns the string value with malformed JSON', () => {
		const store = storee();
		const key = 'malformed';
		const value = '{{{ test }';

		store.set(key, value);
		chai.expect(store.get(key)).to.equal(value);
	});

	it('falls back to an object store', () => {
		const faultyLocalStorage = {
			setItem: function setItem(key, value) {
				throw new Error();
			},
			getItem: function getItem(key) {
				throw new Error();
			},
		};

		window.localStorage = faultyLocalStorage;

		const store = storee();
		const key = 'foo';
		const value = 'bar';

		store.set(key, value);
		chai.expect(store.get(key)).to.equal(value);
	});

	it('can handle faulty setters', () => {
		const faultyLocalStorage = {
			setItem: function setItem(key, value) {
				throw new Error();
			},
			getItem: function getItem(key) {
				return null;
			},
		};

		window.localStorage = faultyLocalStorage;

		const store = storee();
		const key = 'foo';
		const value = 'bar';

		store.set(key, value);
		chai.expect(store.get(key)).to.equal(value);
	});
});
