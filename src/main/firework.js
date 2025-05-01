import * as THREE from 'three'
import startPointVertex from '../shader/startpoint/vertex.glsl'
import startPointFragment from '../shader/startpoint/fragment.glsl'

export default class FireWorks {
  constructor(color, to, from = { x: 0, y: 0, z: 0 }) {
    console.log('创建烟花：', color, to)

    // 创建烟花
    this.startGeometry = new THREE.BufferGeometry()
    const startPositionArray = new Float32Array(3)
    startPositionArray[0] = from.x
    startPositionArray[1] = from.y
    startPositionArray[2] = from.z
    this.startGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(startPositionArray, 3)
    );

    // 设置着色器材质
    this.startMaterial = new THREE.ShaderMaterial({
      vertexShader: startPointVertex,
      fragmentShader: startPointFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    // 创建烟花点球
    this.startPoint = new THREE.Points(this.startGeometry, this.startMaterial)
  }

  // 添加到场景
  addScene(scene, camera) {
    scene.add(this.startPoint)
    this.scene = scene
  }
}
