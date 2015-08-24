# screen-orientation [![Build Status](https://travis-ci.org/bendrucker/screen-orientation.svg?branch=master)](https://travis-ci.org/bendrucker/screen-orientation)

> Get the current screen orientation


## Install

```
$ npm install --save screen-orientation
```


## Usage

```js
var screenOrientation = require('screen-orientation')

screenOrientation()
//=> {direction: 'landscape', version: 'primary'}
```

## API

#### `screenOrientation()` -> `object`

Returns the current screen orientation (direction and version).

## License

MIT © [Ben Drucker](http://bendrucker.me)
