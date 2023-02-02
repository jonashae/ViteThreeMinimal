import EventEmitter from '../lib/eventEmitter.js'

export default class MainLoop extends EventEmitter {
  constructor() {
    super()
    this.start = Date.now()
    this.fps = 100
    this.lastTick = 0

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    const currentTime = Date.now()

    if (currentTime - this.lastTick >= 16) {
      this.fps = Math.floor(1000 / (currentTime - this.lastTick))
      this.trigger('tick')
      this.lastTick = currentTime
    }

    requestAnimationFrame(() => {
      this.tick()
    })
  }
}
