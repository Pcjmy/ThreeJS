import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

const uvTexture = new THREE.TextureLoader().load(
	'./textures/uv_grid_opengl.jpg'
)

const planeGeometry = new THREE.PlaneGeometry(2, 2)

const planeMaterial = new THREE.MeshBasicMaterial({
	map: uvTexture
})

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)
planeMesh.position.x = -3

const geometry = new THREE.BufferGeometry()

const vertices = new Float32Array([
	-1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0, -1.0, 1.0, 0.0
])

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const indices = new Uint16Array([0, 1, 2, 2, 3, 0])

geometry.setIndex(new THREE.BufferAttribute(indices, 1))

const uv = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0])

geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))

const material = new THREE.MeshBasicMaterial({
	map: uvTexture
})
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)
plane.position.x = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.z = 10
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
