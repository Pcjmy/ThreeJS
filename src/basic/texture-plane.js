import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

let textureLoader = new THREE.TextureLoader()
let texture = textureLoader.load('./public/door.png')
let alphaMap = textureLoader.load('./public/door/height.jpg')
let lightMap = textureLoader.load('./public/colors.png')
let rgbeLoader = new RGBELoader()
rgbeLoader.load('./assets/050.hdr', (envMap) => {
	envMap.mapping = THREE.EquirectangularReflectionMapping
	scene.background = envMap
	scene.environment = envMap
})
let planeGeometry = new THREE.PlaneGeometry(1, 1)
let planeMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	map: texture,
	transparent: true
	// alphaMap: alphaMap,
	// lightMap: lightMap
})
let plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 5
camera.position.y = 3
camera.position.x = 2
camera.lookAt(0, 0, 0)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 开启阻尼效果
controls.enableDamping = true
// 设置阻尼系数
controls.dampingFactor = 0.05
// 开启自动旋转
// controls.autoRotate = true
// 设置自动旋转速度
// controls.autoRotateSpeed = 0.5

function animate() {
	controls.update()
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
})
