import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 导入动画库
import gsap from 'gsap'
import { Scene } from 'three';

// 创建场景
const scence = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0,0,10);
scence.add(camera);

// 导入纹理
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('door.png')

const texture = textureLoader.load('minecraft.png')

// // 设置纹理偏移
// doorColorTexture.offset.x = 0.5
// doorColorTexture.offset.y = 0.5
// // 纹理旋转
// // 设置旋转的原点
// doorColorTexture.center.set(0.5, 0.5)
// // 旋转45deg
// doorColorTexture.rotation = Math.PI / 4
// // 设置纹理的重复
// doorColorTexture.repeat.set(2, 3)
// // 设置纹理重复的模式
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping
// doorColorTexture.wrapT = THREE.RepeatWrapping

// texture纹理显示设置
// texture.minFilter = THREE.NearestFilter
// texture.magFilter = THREE.NearestFilter
texture.minFilter = THREE.LinearFilter
texture.magFilter = THREE.LinearFilter

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: '#ffff00',
  map: texture
})

const cube = new THREE.Mesh(cubeGeometry, basicMaterial)

scence.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas添加到body
document.body.appendChild(renderer.domElement);
// 使用渲染器，通过相机将场景渲染出来
// renderer.render(scence, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果，必须在动画循环里调用update()
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scence.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()

window.addEventListener('dblclick', () => {
  const fullScreenElement = document.fullscreenElement
  if (fullScreenElement == null) {
    // 双击控制屏幕进入全屏，退出全屏
    // 让画布对象全屏
    renderer.domElement.requestFullscreen()
  } else {
    // 退出全屏，使用document对象
    document.exitFullscreen()
  }
})

function render() {
  controls.update()
  renderer.render(scence, camera)
  // 渲染下一帧的时候就会调用render函数
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
