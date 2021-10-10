'use strict'

const viewSize = require('view-size')
const getScreen = require('./getScreen')
const screenOrientation = require('./')

jest.mock('view-size', () => jest.fn())
jest.mock('./getScreen', () => jest.fn())

let events = {}

beforeEach(() => {
  events = {}
  getScreen.mockImplementation(() => {
    return undefined
  })
})

describe('With orientation', () => {
  test('Landscape Primary', () => {
    getScreen.mockImplementation(() => {
      return {
        orientation: {
          type: 'landscape-primary',
          angle: 0,
          onchange: null
        }
      }
    })

    expect(screenOrientation.getScreenOrientation()).toEqual({
      direction: 'landscape',
      version: 'primary',
      angle: 0
    })
  })

  test('Portrait Primary', () => {
    getScreen.mockImplementation(() => {
      return {
        orientation: {
          type: 'portrait-primary',
          angle: 0,
          onchange: null
        }
      }
    })

    expect(screenOrientation.getScreenOrientation()).toEqual({
      direction: 'portrait',
      version: 'primary',
      angle: 0
    })
  })

  test('addEventOnOrientationChange', (done) => {
    const mockScreenProps = {
      orientation: {
        type: 'portrait-primary',
        angle: 0,
        onchange: null,
        addEventListener (event, callback) {
          events[event] = callback
        },
        dispatchEvent (event) {
          events[event.type]()
        }
      }
    }

    getScreen.mockImplementation(() => {
      return mockScreenProps
    })

    const oldOrientation = screenOrientation.getScreenOrientation()

    screenOrientation.addEventOnOrientationChange((newOrientation) => {
      expect(newOrientation).toEqual({
        direction: 'landscape',
        version: 'primary',
        angle: 90
      })

      done()
    })

    getScreen.mockImplementation(() => {
      return {
        orientation: {
          ...mockScreenProps.orientation,
          type: 'landscape-primary',
          angle: 90
        }
      }
    })

    getScreen().orientation.dispatchEvent(new global.Event('change'))

    expect(oldOrientation).toEqual({
      direction: 'portrait',
      version: 'primary',
      angle: 0
    })
  })

  test('removeEventOnOrientationChange', () => {
    const mockScreenProps = {
      orientation: {
        type: 'portrait-primary',
        angle: 0,
        onchange: null,
        addEventListener (event, callback) {
          events[event] = callback
        },
        removeEventListener (event, callback) {
          if (events[event] === callback) {
            delete events[event]
          }
        }
      }
    }

    getScreen.mockImplementation(() => {
      return mockScreenProps
    })

    screenOrientation.addEventOnOrientationChange((newOrientation) => {
      // console.log(newOrientation)
    })
    const eventsAfterAdd = { ...events }

    screenOrientation.removeEventOnOrientationChange()

    expect(eventsAfterAdd).toHaveProperty('change')
    expect(events).not.toHaveProperty('change')
  })
})

describe('Size fallback', () => {
  test('Landscape Primary', () => {
    viewSize.mockImplementation(() => {
      return {
        x: 800,
        y: 600
      }
    })

    expect(screenOrientation.getScreenOrientation()).toEqual({
      direction: 'landscape',
      version: 'primary',
      angle: 0
    })
  })

  test('Portrait Primary', () => {
    viewSize.mockImplementation(() => {
      return {
        x: 600,
        y: 800
      }
    })

    expect(screenOrientation.getScreenOrientation()).toEqual({
      direction: 'portrait',
      version: 'primary',
      angle: 0
    })
  })

  test('addEventOnOrientationChange', (done) => {
    viewSize.mockImplementation(() => {
      return {
        x: 600,
        y: 800
      }
    })

    const oldOrientation = screenOrientation.getScreenOrientation()

    screenOrientation.addEventOnOrientationChange((newOrientation) => {
      expect(newOrientation).toEqual({
        direction: 'landscape',
        version: 'primary',
        angle: 0
      })

      done()
    })

    viewSize.mockImplementation(() => {
      return {
        x: 800,
        y: 600
      }
    })

    global.dispatchEvent(new global.Event('resize'))

    expect(oldOrientation).toEqual({
      direction: 'portrait',
      version: 'primary',
      angle: 0
    })
  })

  test('removeEventOnOrientationChange', () => {
    global.addEventListener = jest.fn().mockImplementation((event, callback) => {
      events[event] = callback
    })

    global.removeEventListener = jest.fn().mockImplementation((event, callback) => {
      if (events[event] === callback) {
        delete events[event]
      }
    })

    viewSize.mockImplementation(() => {
      return {
        x: 600,
        y: 800
      }
    })

    screenOrientation.addEventOnOrientationChange((newOrientation) => {
      // console.log(newOrientation)
    })
    const eventsAfterAdd = { ...events }

    screenOrientation.removeEventOnOrientationChange()

    expect(eventsAfterAdd).toHaveProperty('resize')
    expect(events).not.toHaveProperty('resize')
  })
})
