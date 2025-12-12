import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

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

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
parentMaterial.wireframe = true

let parentCube = new THREE.Mesh(geometry, parentMaterial)
const cube = new THREE.Mesh(geometry, material)
parentCube.add(cube)
parentCube.position.set(-3, 0, 0)
parentCube.rotation.x = Math.PI / 4
parentCube.scale.set(2, 2, 2)

cube.position.set(3, 0, 0)

// cube.scale.set(2, 2, 2)

cube.rotation.x = Math.PI / 4

scene.add(parentCube)

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

const eventObj = {
	FullScreen: () => {
		document.body.requestFullscreen()
	},
	ExitFullScreen: () => {
		document.exitFullscreen()
	}
}

const gui = new GUI()
gui.add(eventObj, 'FullScreen').name('全屏')
gui.add(eventObj, 'ExitFullScreen').name('退出全屏')
let folder = gui.addFolder('立方体位置')
folder.add(cube.position, 'x').min(-10).max(10).step(1).name('立方体x轴位置')
folder.add(cube.position, 'y').min(-10).max(10).step(1).name('立方体y轴位置')
folder.add(cube.position, 'z').min(-10).max(10).step(1).name('立方体z轴位置')

gui.add(parentMaterial, 'wireframe').name('父元素线框模式')

let colorParams = {
	cubeColor: '#ff0000'
}

gui
	.addColor(colorParams, 'cubeColor')
	.name('立方体颜色')
	.onChange((value) => {
		material.color.set(value)
	})
