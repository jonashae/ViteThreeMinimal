import * as THREE from 'three'
import fresnelVertex from './fresnelVertex.glsl?raw'
import fresnelFragment from './fresnelFragment.glsl?raw'

export default function fresnelShader() {
  return new THREE.ShaderMaterial({
    uniforms: {
      p: { type: 'f', value: 2 },
      customVis: { type: 'f', value: 1 },
      glowColor: { type: 'c', value: new THREE.Color(0xffffff) }
    },
    vertexShader: fresnelVertex,
    fragmentShader: fresnelFragment,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  })
}
