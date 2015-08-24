'use strict'

var test = require('tape')
var proxyquire = require('proxyquire')

test(function (t) {
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
