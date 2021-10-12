'use strict'

const test = require('tape')
const proxyquire = require('proxyquire')

test('With orientation - Landscape primary', (t) => {
  const orientation = proxyquire('./', {
    'global/window': {
      screen: {
        orientation: {
          type: 'landscape-primary',
          angle: 0
        }
      }
    }
  })
  t.deepEqual(orientation(), {
    direction: 'landscape',
    version: 'primary',
    angle: 0
  })
  t.end()
})

test('With orientation - Portrait primary', (t) => {
  const orientation = proxyquire('./', {
    'global/window': {
      screen: {
        orientation: {
          type: 'portrait-primary',
          angle: 0
        }
      }
    }
  })
  t.deepEqual(orientation(), {
    direction: 'portrait',
    version: 'primary',
    angle: 0
  })
  t.end()
})

test('With orientation - getScreenOrientation - Portrait primary', (t) => {
  const orientation = proxyquire('./', {
    'global/window': {
      screen: {
        orientation: {
          type: 'portrait-primary',
          angle: 0
        }
      }
    }
  })
  t.deepEqual(orientation.getScreenOrientation(), {
    direction: 'portrait',
    version: 'primary',
    angle: 0
  })
  t.end()
})

test('Size fallback - Landscape primary', (t) => {
  const landscape = proxyquire('./', {
    'view-size': () => {
      return {
        x: 800,
        y: 600
      }
    }
  })
  t.deepEqual(landscape(), {
    direction: 'landscape',
    version: 'primary',
    angle: 0
  })
  t.end()
})

test('Size fallback - Portrait primary', (t) => {
  const portrait = proxyquire('./', {
    'view-size': () => {
      return {
        x: 600,
        y: 800
      }
    }
  })
  t.deepEqual(portrait(), {
    direction: 'portrait',
    version: 'primary',
    angle: 0
  })
  t.end()
})
