# storee
A lightweight wrapper around localStorage to make it work like you think it does

## Usage

```js
import storee from 'storee';

const store = store();

store.set('count', 10);

const count = store.get('count'); // 10

store.set('people', ['Woody', 'Buzz']);

const [ woody, buzz ] = store.get('people');
```

## Caveats

- Storing `'true'` or `'false'` (strings) will be cast to booleans when retrieved

## License

[MIT](LICENSE)
