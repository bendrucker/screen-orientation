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

test('defaults', function (t) {
  var orientation = require('./')
  t.deepEqual(orientation(), {
    direction: 'landscape',
    version: 'primary'
  })
  t.end()
})
