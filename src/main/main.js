import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入dat.gui
import * as dat from 'dat.gui'

// 顶点着色器
import basicVertexShader from '../shader/raw/vertex.glsl'
// 片元着色器
import basicFragmentShader from '../shader/raw/fragment.glsl'

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

// 创建纹理加载器对象
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./public/ca.jpeg')
const params = {
  uFrequency: 10,
  uScale: 0.1
}

// 创建着色器材质
const rawShaderMaterial = new THREE.RawShaderMaterial({
  vertexShader: basicVertexShader,
  fragmentShader: basicFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    }
  }
})

// 创建平面
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 64, 64),
  rawShaderMaterial
)

scene.add(floor)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

// 设置时钟
const clock = new THREE.Clock()
function animate(t) {
  const elapsedTime = clock.getElapsedTime()
  rawShaderMaterial.uniforms.uTime.value = elapsedTime / 3.0
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
