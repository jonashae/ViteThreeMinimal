import * as THREE from 'three'
import Root from '../root.js'
import EventEmitter from './eventEmitter'

export default class Controls extends EventEmitter {
  constructor() {
    super()

    this.root = new Root()
    this.sizes = this.root.sizes
    this.mouse = new THREE.Vector2()
    this.click = false
    this.scrollY = 0
    this.wheel = 0
    this.zoomLevel = 1
    this.canvas = this.root.sizes.canvas

    this.mouse.x = 1000000
    this.mouse.y = 1000000

    this.canvas.addEventListener('mousemove', (_event) => {
      this.mouse.x = (_event.clientX / this.sizes.width) * 2 - 1
      this.mouse.y = -(_event.clientY / this.sizes.height) * 2 + 1
    })

    window.addEventListener('click', () => {
      this.click = true
      this.trigger('click')
      window.requestAnimationFrame(() => {
        this.click = false
      })
    })

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY / (window.outerHeight + 70)
    })

    window.addEventListener('wheel', (_event) => {
      let output = this.zoomLevel

      output -= _event.deltaY / 100 / 100
      output = Math.min(output, 1)
      output = Math.max(output, 0)

      this.zoomLevel = output
    })
  }
}
