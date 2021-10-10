# screen-orientation [![Build Status](https://travis-ci.org/bendrucker/screen-orientation.svg?branch=master)](https://travis-ci.org/bendrucker/screen-orientation) [![Greenkeeper badge](https://badges.greenkeeper.io/bendrucker/screen-orientation.svg)](https://greenkeeper.io/)

> Get the current screen orientation


## Install

```
$ npm install --save screen-orientation
```

or 

```
$ npm add screen-orientation
```


## Usage

Import module

```js
const sc = require('screen-orientation')
```

```js
sc.getScreenOrientation()
//=> {direction: 'landscape', version: 'primary', angle: 0}
```

```js
sc.addEventOnOrientationChange((newOrientation) => {
  console.log(newOrientation)
  //=> {direction: 'landscape', version: 'primary', angle: 0}
})
```

```js
sc.removeEventOnOrientationChange()
//=> void
```

## API

#### `getScreenOrientation()` -> `object`

Returns the current screen orientation (direction, version and angle).

#### `addEventOnOrientationChange(callback)` -> `void`

Add a callback function when screen orientation is changed

Example:
```js
const refreshFrames(newOrientation) {
  // myFunction (newOrientation.direction, newOrientation.version)
};

sc.addEventOnOrientationChange(refreshFrames)
```

#### `removeEventOnOrientationChange()` -> `void`

Remove a callback function when screen orientation is changed
```

## License

MIT © [Ben Drucker](http://bendrucker.me)
