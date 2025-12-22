import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
}

animate()

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
})

const sphere1 = new THREE.Mesh(
	new THREE.SphereGeometry(1, 32, 32),
	new THREE.MeshBasicMaterial({ color: 0xff00ff })
)
sphere1.position.x = -4
scene.add(sphere1)

const sphere2 = new THREE.Mesh(
	new THREE.SphereGeometry(1, 32, 32),
	new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
scene.add(sphere2)

const sphere3 = new THREE.Mesh(
	new THREE.SphereGeometry(1, 32, 32),
	new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
sphere3.position.x = 4
scene.add(sphere3)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener('click', (e) => {
	mouse.x = (e.clientX / window.innerWidth) * 2 - 1
	mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

	raycaster.setFromCamera(mouse, camera)
	const intersects = raycaster.intersectObjects(scene.children)
	if (intersects.length > 0) {
		console.log(intersects[0].object)
		if (intersects[0].object._isSelect) {
			intersects[0].object._isSelect = false
			intersects[0].object.material.color.set(
				intersects[0].object._originalColor
			)
		} else {
			intersects[0].object._isSelect = true
			intersects[0].object._originalColor =
				intersects[0].object.material.color.getHex()
			intersects[0].object.material.color.set(0xff0000)
		}
	}
})
