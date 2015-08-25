'use strict'

var window = require('global/window')
var viewSize = require('view-size')

var screen = window.screen
if (screen) {
  var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
}

module.exports = (orientation && orientation.type) ? screenOrientation : detect

function screenOrientation () {
  var parts = orientation.type.split('-')
  return {
    direction: parts[0],
    version: parts[1]
  }
}

function detect () {
  var viewport = viewSize()
  return {
    direction: viewport.x >= viewport.y ? 'landscape' : 'portrait',
    version: 'primary'
  }
}
