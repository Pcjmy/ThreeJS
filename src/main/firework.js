import * as THREE from 'three'
import startPointVertex from '../shader/startpoint/vertex.glsl'
import startPointFragment from '../shader/startpoint/fragment.glsl'
import fireWorksVertex from '../shader/fireworks/vertex.glsl'
import fireWorksFragment from '../shader/fireworks/fragment.glsl'

export default class FireWorks {
  constructor(color, to, from = { x: 0, y: 0, z: 0 }) {
    console.log('创建烟花：', color, to)
    this.color = new THREE.Color(color)

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

    const astepArray = new Float32Array(3)
    astepArray[0] = to.x - from.x
    astepArray[1] = to.y - from.y
    astepArray[2] = to.z - from.z
    this.startGeometry.setAttribute(
      'aStep',
      new THREE.BufferAttribute(astepArray, 3)
    )

    // 设置着色器材质
    this.startMaterial = new THREE.ShaderMaterial({
      vertexShader: startPointVertex,
      fragmentShader: startPointFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: {
          value: 0
        },
        uSize: {
          value: 20
        },
        uColor: {
          value: this.color
        }
      }
    })

    console.log('this.startMaterial=', this.startMaterial)

    // 创建烟花点球
    this.startPoint = new THREE.Points(this.startGeometry, this.startMaterial)

    // 开始计时
    this.clock = new THREE.Clock()

    // 创建爆炸的烟花
    this.fireWorksGeometry = new THREE.BufferGeometry()
    this.fireWorksCount = 180 + Math.floor(Math.random() * 180)
    const positionFireWorksArray = new Float32Array(this.fireWorksCount * 3)
    const scaleFireWorksArray = new Float32Array(this.fireWorksCount)
    const directionArray = new Float32Array(this.fireWorksCount * 3)

    for (let i = 0; i < this.fireWorksCount; i++) {
      // 一开始烟花的位置
      positionFireWorksArray[i * 3 + 0] = to.x
      positionFireWorksArray[i * 3 + 1] = to.y
      positionFireWorksArray[i * 3 + 2] = to.z

      // 设置烟花所有粒子初始化大小
      scaleFireWorksArray[i] = Math.random()

      // 设置四周发射的角度
      let theta = Math.random() * Math.PI * 2
      let beta = Math.random() * Math.PI * 2
      let radius = Math.random()

      directionArray[i * 3 + 0] = radius * Math.sin(theta) + radius * Math.sin(beta)
      directionArray[i * 3 + 1] = radius * Math.cos(theta) + radius * Math.cos(beta)
      directionArray[i * 3 + 2] = radius * Math.sin(theta) + radius * Math.cos(beta)
    }
    this.fireWorksGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionFireWorksArray, 3)
    )

    this.fireWorksGeometry.setAttribute(
      'aScale',
      new THREE.BufferAttribute(scaleFireWorksArray, 1)
    )

    this.fireWorksGeometry.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(directionArray, 3) 
    )

    this.fireWorkMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0
        },
        uSize: {
          value: 0
        },
        uColor: {
          value: this.color
        }
      },
      vertexShader: fireWorksVertex,
      fragmentShader: fireWorksFragment,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    this.fireWorks = new THREE.Points(
      this.fireWorksGeometry,
      this.fireWorkMaterial
    )

    // 创建音频
    this.listener = new THREE.AudioListener()
    this.sound = new THREE.Audio(this.listener)
    this.sendSound = new THREE.Audio(this.listener)

    // 创建音频加载器
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load(
      `./assets/audio/pow${Math.floor(Math.random() * 4 + 1)}.ogg`,
      (buffer) => {
        this.sound.setBuffer(buffer)
        this.sound.setLoop(false)
        this.sound.setVolume(1)
      },
    )

    audioLoader.load(
      `./assets/audio/send.mp3`,
      (buffer) => {
        this.sendSound.setBuffer(buffer)
        this.sendSound.setLoop(false)
        this.sendSound.setVolume(1)
      },
    )
  }

  // 添加到场景
  addScene(scene, camera) {
    scene.add(this.startPoint)
    scene.add(this.fireWorks)
    this.scene = scene
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime()
    if (elapsedTime > 0.2 && elapsedTime < 1) {
      if (!this.sendSound.isPlaying && !this.sendSoundPlay) {
        this.sendSound.play()
        this.sendSoundPlay = true
      }
      this.startMaterial.uniforms.uTime.value = elapsedTime
      this.startMaterial.uniforms.uSize.value = 20
    } else if (elapsedTime > 1) {
      const time = elapsedTime - 1
      this.startMaterial.uniforms.uSize.value = 0
      this.startPoint.clear()
      this.startGeometry.dispose()
      this.startMaterial.dispose()

      if (!this.sound.isPlaying && !this.play) {
        this.sound.play()
        this.play = true
      }

      // 设置烟花显示
      this.fireWorkMaterial.uniforms.uSize.value = 20
      this.fireWorkMaterial.uniforms.uTime.value = time

      if (time > 3) {
        this.scene.remove(this.fireWorks)
        this.scene.remove(this.startPoint)
        this.fireWorks.clear()
        this.fireWorksGeometry.dispose()
        this.fireWorkMaterial.dispose()
        return true
      }
      return false
    }
  }
}
