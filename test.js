'use strict'

var test = require('tape')
var proxyquire = require('proxyquire')

test('with orientation', function (t) {
  var orientation = proxyquire('./', {
    'global/window': {
      screen: {
        orientation: {
          type: 'landscape-primary'
        }
      }
    }
  })
  t.deepEqual(orientation(), {
    direction: 'landscape',
    version: 'primary'
  })
  t.end()
})

test('size fallback', function (t) {
  var landscape = proxyquire('./', {
    'view-size': function () {
      return {
        x: 800,
        y: 600
      }
    }
  })
  var portrait = proxyquire('./', {
    'view-size': function () {
      return {
        x: 600,
        y: 800
      }
    }
  })
  t.deepEqual(landscape(), {
    direction: 'landscape',
    version: 'primary'
  })
  t.deepEqual(portrait(), {
    direction: 'portrait',
    version: 'primary'
  })
  t.end()
})
