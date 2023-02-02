import * as THREE from 'three'

import MainLoop from './main/MainLoop.js'
import Debug from './main/Debug.js'
import Renderer from './main/Renderer.js'
import Canvas from './main/Canvas.js'

let instance = null

export default class Root {
  constructor(store) {
    // System
    if (instance) return instance
    instance = this
    window.experience = this

    this.store = store

    //root scene
    this.scene = new THREE.Scene()

    // Main Setup
    this.mainloop = new MainLoop()
    this.canvas = new Canvas()
    this.debug = new Debug()

    //add threejs grid
    const gridHelper = new THREE.GridHelper(100, 10)
    this.scene.add(gridHelper)

    this.renderer = new Renderer()
  }
}
