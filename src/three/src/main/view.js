import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Root from '../root.js'
import anime from 'animejs'
import vvv from '../../js/vvv'
import InfoGraphicMode from './infoGraficMode'
import SliderNavigationMode from './sliderNavigationMode'

export default class View {
  constructor() {
    this.root = new Root()
    this.scene = this.root.scene
    this.time = this.root.time

    this.gui = this.root.debugLayer.gui
    this.sizes = this.root.sizes
    this.canvas = this.root.canvas
    this.events = this.root.events
    this.setupCamera()

    this.infoGraficMode = new InfoGraphicMode()
    this.sliderNavigationMode = new SliderNavigationMode()

    this.sizes.on('resize', () => this.resize())
    this.time.on('tick', () => this.update())

    this.gui = this.root.debugLayer.ui

    this.bufferPosition = new THREE.Vector3()
    this.bufferRotation = new THREE.Vector3()
    this.infoGraficModeOn = false
    this.activeCameraNumber = 0

    this.events.on('newState', () => this.checkState())
    this.events.on('newSliderPos', () => this.checkState())

    if (this.gui) {
      this.addDebugLayer()
    }
  }

  checkState() {
    if (
      this.activeCameraNumber === 0 &&
      this.infoGraficMode.enableInfoGraphicMode
    ) {
      anime({
        targets: this,
        activeCameraNumber: 1,
        easing: 'easeInOutQuad',
        duration: 1000
      })
    }
    if (
      this.activeCameraNumber === 1 &&
      !this.infoGraficMode.enableInfoGraphicMode
    ) {
      anime({
        targets: this,
        activeCameraNumber: 0,
        easing: 'easeInOutQuad',
        duration: 1000
      })
    }
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      10000
    )

    this.camera.position.set(-42.0, 2, 10.0)
    this.camera.lookAt(new THREE.Vector3(0, 0, 0))
    this.scene.add(this.camera)
  }

  resize() {
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()
  }

  update() {
    this.bufferPosition = this.bufferPosition.lerpVectors(
      this.sliderNavigationMode.camera.position,
      this.infoGraficMode.camera.position,
      this.activeCameraNumber
    )

    this.bufferRotation = this.bufferRotation.lerpVectors(
      this.sliderNavigationMode.camera.rotation,
      this.infoGraficMode.camera.rotation,
      this.activeCameraNumber
    )

    this.camera.position.set(
      this.bufferPosition.x,
      this.bufferPosition.y,
      this.bufferPosition.z
    )

    this.camera.rotation.set(
      this.bufferRotation.x,
      this.bufferRotation.y,
      this.bufferRotation.z
    )
  }

  addDebugLayer() {
    const cameraFolder = this.gui.addFolder('Choose Camera')
    cameraFolder.close()
  }
}
