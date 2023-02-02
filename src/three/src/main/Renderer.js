import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Root from '../root.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export default class Renderer {
  constructor() {
    this.root = new Root()
    this.scene = this.root.scene
    this.canvas = this.root.canvas

    this.renderer = null
    this.camera = null

    this.setupRenderer()
    this.setupCamera()
    this.setupFXPass()

    this.root.mainloop.on('tick', () => this.update())
    this.root.canvas.on('resize', () => this.resize())
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.canvas,
      antialias: true,
      alpha: true
    })

    this.renderer.setSize(this.canvas.width, this.canvas.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  setupFXPass() {
    this.root.scene.fog = new THREE.FogExp2(0x000000, 0.0008)

    // add blur pass
    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)

    //add unreal bloom pass
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.canvas.width, this.canvas.height),
      0,
      0.4,
      0.85
    )
    if (this.root.debug.ui) {
      const folder = this.root.debug.ui.addFolder('Bloompass')
      folder.add(this.bloomPass, 'threshold', 0, 2, 0.01)
      folder.add(this.bloomPass, 'radius', 0, 1.5, 0.01)
      folder.add(this.bloomPass, 'strength', 0, 1.5, 0.01)
      folder.close()
    }

    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.bloomPass)
  }

  setupCamera() {

    this.camera = new THREE.PerspectiveCamera(
      40,
      this.canvas.width / this.canvas.height,
      1e10,
      1e30
    )
    this.camera.position.z = 5
    this.controls = new OrbitControls(this.camera, this.canvas.canvas)
  }

  resize() {
    // update camera

    this.renderer.setSize(this.canvas.width, this.canvas.height)
    this.composer.setSize(this.canvas.width, this.canvas.height)
    this.renderer.setPixelRatio(this.canvas.pixelRatio)

    this.camera.aspect = this.canvas.width / this.canvas.height
    this.camera.updateProjectionMatrix()
  }

  update() {
    // this.composer.render()
    this.renderer.render(this.scene, this.camera)

    this.root.store.state.distance = this.controls.getDistance()
    this.camera.near = Math.min(this.controls.getDistance() / 2, 1e17)
    this.camera.updateProjectionMatrix()
    this.controls.update()
  }
}
