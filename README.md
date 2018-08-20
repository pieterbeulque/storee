# storee

[![Build Status](https://travis-ci.com/pieterbeulque/storee.svg?branch=master)](https://travis-ci.com/pieterbeulque/storee) [![Coverage Status](https://coveralls.io/repos/github/pieterbeulque/storee/badge.svg?branch=track-code-coverage)](https://coveralls.io/github/pieterbeulque/storee?branch=track-code-coverage)

A lightweight wrapper around localStorage to make it work like you think it does

## Usage

```js
import storee from 'storee';

const store = storee();

store.set('count', 10);

const count = store.get('count'); // 10

store.set('people', ['Woody', 'Buzz']);

const [ woody, buzz ] = store.get('people');
```

## Caveats

- Storing `'true'` or `'false'` (strings) will be cast to booleans when retrieved

## License

[MIT](LICENSE)
