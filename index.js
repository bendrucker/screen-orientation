'use strict'

const viewSize = require('view-size')
const window = require('global/window')
const debounce = require('debounce')

let handlerCallback

function getScreenOrientation (orientationEvent) {
  const { type, angle } = orientationEvent || getOrientation()
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
    window.screen.orientation.addEventListener('change', handleOrientationChange, false)
  } else {
    window.addEventListener('resize', handleResize, false)
  }
}

function removeEventOnOrientationChange () {
  if (shouldUseOrientation()) {
    window.screen.orientation.removeEventListener('change', handleOrientationChange)
  } else {
    window.removeEventListener('resize', handleResize)
  }
}

function shouldUseOrientation () {
  return (window.screen !== undefined && window.screen.orientation !== undefined)
}

function getOrientation () {
  return shouldUseOrientation()
    ? window.screen.orientation
    : detect()
}

function detect () {
  const { x, y } = viewSize()

  return {
    type: x >= y ? 'landscape-primary' : 'portrait-primary',
    angle: 0
  }
}

function formatResizeEvent (resizeEvent) {
  const x = resizeEvent.target.innerWidth
  const y = resizeEvent.target.innerHeight

  return {
    type: x >= y ? 'landscape-primary' : 'portrait-primary',
    angle: 0
  }
}

function handleOrientationChange (event) {
  return () => handlerCallback(getScreenOrientation(event))
}

function handleResize (event) {
  return debounce(() => handlerCallback(formatResizeEvent(event)), 100)()
}

const screenOrientationModule = module.exports = getScreenOrientation

screenOrientationModule.getScreenOrientation = getScreenOrientation
screenOrientationModule.addEventOnOrientationChange = addEventOnOrientationChange
screenOrientationModule.removeEventOnOrientationChange = removeEventOnOrientationChange
