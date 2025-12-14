import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

const cubeMaterial0 = new THREE.MeshBasicMaterial({
	color: 0x00ff00
})

const cubeMaterial1 = new THREE.MeshBasicMaterial({
	color: 0xff0000
})

const cubeMaterial2 = new THREE.MeshBasicMaterial({
	color: 0xff00ff
})

const cubeMaterial3 = new THREE.MeshBasicMaterial({
	color: 0x00ffff
})

const cubeMaterial4 = new THREE.MeshBasicMaterial({
	color: 0xffff00
})

const cubeMaterial5 = new THREE.MeshBasicMaterial({
	color: 0xffffff
})

const cube = new THREE.Mesh(cubeGeometry, [
	cubeMaterial0,
	cubeMaterial1,
	cubeMaterial2,
	cubeMaterial3,
	cubeMaterial4,
	cubeMaterial5
])
scene.add(cube)

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
