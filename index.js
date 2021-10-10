'use strict'

const viewSize = require('view-size')
const window = require('global/window')
const debounce = require('debounce')
const getScreen = require('./getScreen')

let handlerCallback

function shouldUseOrientation () {
  return (getScreen() !== undefined && getScreen().orientation !== undefined)
}

function getOrientation () {
  return shouldUseOrientation()
    ? getScreen().orientation
    : detect()
}

function detect () {
  const { x, y } = viewSize()

  return {
    type: x >= y ? 'landscape-primary' : 'portrait-primary',
    angle: 0
  }
}

function getScreenOrientation () {
  const { type, angle } = getOrientation()
  const [direction, version] = type.split('-')

  return {
    direction,
    version,
    angle
  }
}

function addEventOnOrientationChange (callback) {
  handlerCallback = callback

  if (shouldUseOrientation()) {
    getScreen().orientation.addEventListener('change', handleOrientationChange, false)
  } else {
    window.addEventListener('resize', handleOrientationChange, false)
  }
}

function removeEventOnOrientationChange () {
  if (shouldUseOrientation()) {
    getScreen().orientation.removeEventListener('change', handleOrientationChange)
  } else {
    window.removeEventListener('resize', handleOrientationChange)
  }
}

function handleOrientationChange () {
  return debounce(() => handlerCallback(getScreenOrientation()), 100)()
}

module.exports = {
  getScreenOrientation,
  addEventOnOrientationChange,
  removeEventOnOrientationChange
}
