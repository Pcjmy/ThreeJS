import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'
// 导入dat.gui
import * as dat from 'dat.gui'

const gui = new dat.GUI()

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  1000
)

// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// 根据几何体和材料创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

cube.rotation.set(Math.PI / 4, 0, 0, 'XYZ')

// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()

// window.addEventListener('dblclick', () => {
//   const fullScreenElement = document.fullscreenElement
//   if (fullScreenElement == null) {
//     // 双击控制屏幕进入全屏，退出全屏
//     // 让画布对象全屏
//     renderer.domElement.requestFullscreen()
//   } else {
//     // 退出全屏，使用document对象
//     document.exitFullscreen()
//   }
// })

// 设置动画
gsap.to(cube.position, { x: 5, duration: 5})
gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5})

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

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
