import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from '../shader/basic/vertexShader.glsl'
import fragmentShader from '../shader/basic/fragmentShader.glsl'

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

const geometry = new THREE.BufferGeometry()
const positions = new Float32Array([0, 0, 0])

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// 点材质
// const material = new THREE.PointsMaterial({
//   color: 0xff0000,
//   size: 1,
//   sizeAttenuation: true
// })

// 点着色器材质
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true
})

// 生成点
const points = new THREE.Points(geometry, material);

scene.add(points);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()

// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器添加到body
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
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
