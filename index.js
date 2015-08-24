'use strict'

var window = require('global/window')

var screen = window.screen
if (screen) {
  var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
}

module.exports = orientation ? screenOrientation : defaults

function screenOrientation () {
  var parts = orientation.type.split('-')
  return {
    direction: parts[0],
    version: parts[1]
  }
}

function defaults () {
  return {
    direction: 'landscape',
    version: 'primary'
  }
}
