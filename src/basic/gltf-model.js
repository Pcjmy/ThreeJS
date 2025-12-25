import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

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

scene.background = new THREE.Color(0x999999)

const gltfLoader = new GLTFLoader()
gltfLoader.load('./model/duck.glb', (gltf) => {
	scene.add(gltf.scene)
})

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load('./model/city.glb', (gltf) => {
	scene.add(gltf.scene)
})

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./assets/050.hdr', (texture) => {
	texture.mapping = THREE.EquirectangularReflectionMapping
	scene.environment = texture
	scene.background = texture
})
