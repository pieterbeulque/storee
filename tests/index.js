import 'mock-local-storage';
import test from 'ava';
import storee from '../storee';

global.window = { localStorage: global.localStorage };

test('exports a function', (t) => {
	t.is(typeof storee, 'function');
});

test('has a set method', (t) => {
	const store = storee();
	t.is(typeof store.set, 'function');
});

test('has a get method', (t) => {
	const store = storee();
	t.is(typeof store.get, 'function');
});

test('has a remove method', (t) => {
	const store = storee();
	t.is(typeof store.remove, 'function');
});

test('has a clear method', (t) => {
	const store = storee();
	t.is(typeof store.clear, 'function');
});

test('can store a string value', (t) => {
	const store = storee();
	const key = 'good';
	const value = 'boy';

	store.set(key, value);

	t.is(store.get(key), value);
});

test('can store an integer value', (t) => {
	const store = storee();
	const key = 'one';
	const value = 1;

	store.set(key, value);

	t.is(store.get(key), value);
});

test('can store an numeric value', (t) => {
	const store = storee();
	const key = 'pi';
	const value = 3.1415;

	store.set(key, value);

	t.is(store.get(key), value);
});

test('can store a boolean true value', (t) => {
	const store = storee();
	const key = 'isit';
	const value = true;

	store.set(key, value);

	t.is(store.get(key), value);
});

test('can store a boolean false value', (t) => {
	const store = storee();
	const key = 'orisit';
	const value = false;

	store.set(key, value);

	t.is(store.get(key), value);
});

test('can store an object value', (t) => {
	const store = storee();
	const key = 'object';
	const value = { one: [2, 3], four: 'five', six: 7 };

	store.set(key, value);

	t.deepEqual(store.get(key), value);
});

test('can store an array value', (t) => {
	const store = storee();
	const key = 'array';
	const value = [1, 2, 3, 4];

	store.set(key, value);

	t.deepEqual(store.get(key), value);
});

test('can remove any value', (t) => {
	const store = storee();
	const key = 'trash';
	const value = false;

	store.set(key, value);
	store.remove(key);

	t.is(store.get(key), null);
});

test('can clear all values', (t) => {
	const store = storee();
	const key = 'trash';
	const value = false;

	store.set(key, value);
	store.clear();

	t.is(store.get(key), null);
});

test('returns the string value with malformed JSON', (t) => {
	const store = storee();
	const key = 'malformed';
	const value = '{{{ test }';

	store.set(key, value);

	t.is(store.get(key), value);
});

test('falls back to an object store', (t) => {
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

	t.is(store.get(key), value);
});

test('can handle faulty setters', (t) => {
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

	t.is(store.get(key), value);
});
