'use strict'

var window = require('global/window')

module.exports = function screenOrientation () {
  var screen = window.screen
  if (!screen) return null
  var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
  var parts = orientation.type.split('-')
  return {
    direction: parts[0],
    version: parts[1]
  }
}
