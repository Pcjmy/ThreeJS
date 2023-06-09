import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 导入dat.gui
import * as dat from 'dat.gui'
import gsap from 'gsap'

// 顶点着色器
import vertexShader from '../shader/flylight/vertex.glsl'
// 片元着色器
import fragmentShader from '../shader/flylight/fragment.glsl'

const gui = new dat.GUI()

// 创建场景
const scene = new THREE.Scene()

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)

// 设置相机位置
camera.position.set(0, 0, 2)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
scene.add(camera)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const params = {
  uWaresFrequency: 14,
  uScale: 0.03,
  uXzScale: 1.5,
  uNoiseFrequency: 10,
  uNoiseScale: 1.5,
}

// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uWaresFrequency: {
      value: params.uWaresFrequency
    },
    uScale: {
      value: params.uScale
    },
    uXzScale: {
      value: params.uXzScale
    },
    uNoiseFrequency: {
      value: params.uNoiseFrequency
    },
    uNoiseScale: {
      value: params.uNoiseScale
    },
    uTime: {
      value: params.uTime
    }
  },
  transparent: true
})

gui.add(params, 'uWaresFrequency').min(1).max(100).step(0.1).onChange((value) => {
  shaderMaterial.uniforms.uWaresFrequency.value = value
})

gui.add(params, 'uScale').min(0).max(0.2).step(0.001).onChange((value) => {
  shaderMaterial.uniforms.uScale.value = value
})

gui.add(params, 'uXzScale').min(0).max(5).step(0.1).onChange((value) => {
  shaderMaterial.uniforms.uXzScale.value = value
})

gui.add(params, 'uNoiseFrequency').min(0).max(100).step(0.1).onChange((value) => {
  shaderMaterial.uniforms.uNoiseFrequency.value = value
})

gui.add(params, 'uNoiseScale').min(0).max(5).step(0.01).onChange((value) => {
  shaderMaterial.uniforms.uNoiseScale.value = value
})

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 512, 512),
  shaderMaterial
)
plane.rotation.x = -Math.PI / 2
scene.add(plane)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()

// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器添加到body
document.body.appendChild(renderer.domElement)

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 设置时钟
const clock = new THREE.Clock()
function animate(t) {
  controls.update()
  const elapsedTime = clock.getElapsedTime()
  shaderMaterial.uniforms.uTime.value = elapsedTime
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})
