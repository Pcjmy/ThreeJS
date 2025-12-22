import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import * as TWEEN from 'three/examples/jsm/libs/tween.module.min.js'

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

camera.position.z = 15
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
	TWEEN.update()
}

animate()

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
})

const gui = new GUI()

const sphere1 = new THREE.Mesh(
	new THREE.SphereGeometry(1, 32, 32),
	new THREE.MeshBasicMaterial({ color: 0xff00ff })
)
sphere1.position.x = -4
scene.add(sphere1)

const tween = new TWEEN.Tween(sphere1.position)
tween.to({ x: 4 }, 1000)
tween.onUpdate(() => {
	console.log(sphere1.position)
})
// tween.repeat(Infinity)
// tween.yoyo(true)
// tween.delay(3000)
tween.easing(TWEEN.Easing.Quadratic.InOut)

const tween2 = new TWEEN.Tween(sphere1.position)

tween2.to({ x: -4 }, 1000)
tween2.onUpdate(() => {
	console.log(sphere1.position)
})

tween.chain(tween2)
tween2.chain(tween)
tween.start()
tween.onStart(() => {
	console.log('tween start')
})
tween.onComplete(() => {
	console.log('tween complete')
})
tween.onStop(() => {
	console.log('tween stop')
})
tween.onUpdate(() => {
	console.log('tween update')
})

let params = {
	stop: function () {
		tween.stop()
	}
}

gui.add(params, 'stop')
