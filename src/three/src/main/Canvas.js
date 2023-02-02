import EventEmitter from '../lib/eventEmitter.js'

export default class Canvas extends EventEmitter {
  constructor() {
    super()
    this.canvasParent = document.getElementById('outline')
    this.canvas = document.getElementById('threeCanvas')
    this.width = this.canvasParent.clientWidth
    this.height = this.canvasParent.clientHeight
    this.pixelRatio = window.devicePixelRatio

    window.addEventListener('resize', () => {
      this.width = this.canvasParent.clientWidth
      this.height = this.canvasParent.clientHeight
      this.pixelRatio = window.devicePixelRatio
      this.trigger('resize')
    })
  }
}
