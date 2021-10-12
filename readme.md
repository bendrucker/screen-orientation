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
const screenOrientation = require('screen-orientation')
```

```js
screenOrientation()
//=> {direction: 'landscape', version: 'primary', angle: 0}
```
Or
```js
screenOrientation.getScreenOrientation()
//=> {direction: 'landscape', version: 'primary', angle: 0}
```

```js
screenOrientation.addEventOnOrientationChange((newOrientation) => {
  console.log(newOrientation)
  //=> {direction: 'landscape', version: 'primary', angle: 0}
})
```

```js
screenOrientation.removeEventOnOrientationChange()
//=> void
```

## API

#### `screenOrientation()` -> `object`

Returns the current screen orientation (direction, version and angle).

#### `screenOrientation.getScreenOrientation()` -> `object`

Returns the current screen orientation (direction, version and angle).

#### `screenOrientation.addEventOnOrientationChange(callback)` -> `void`

Add a callback function when screen orientation is changed

Example:
```js
const refreshFrames(newOrientation) {
  // myFunction (newOrientation.direction, newOrientation.version)
};

screenOrientation.addEventOnOrientationChange(refreshFrames)
```

#### `screenOrientation.removeEventOnOrientationChange()` -> `void`

Remove a callback function when screen orientation is changed
```

## License

MIT © [Ben Drucker](http://bendrucker.me)
