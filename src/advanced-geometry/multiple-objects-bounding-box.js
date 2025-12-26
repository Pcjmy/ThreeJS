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

const box = new THREE.Box3()

const arrSphere = [sphere1, sphere2, sphere3]

for (let i = 0; i < arrSphere.length; i++) {
	// // 计算每个球体的边界框
	// arrSphere[i].geometry.computeBoundingBox()
	// const box3 = arrSphere[i].geometry.boundingBox
	// // 更新球体的世界矩阵
	// arrSphere[i].updateWorldMatrix(true, true)
	// // 将球体的边界框应用到球体的世界矩阵
	// box3.applyMatrix4(arrSphere[i].matrixWorld)
	// // 合并所有球体的边界框
	// box.union(box3)

	// 第二种方式
	const box3 = new THREE.Box3().setFromObject(arrSphere[i])
	box.union(box3)
}

const boxHelper = new THREE.Box3Helper(box, 0xffff00)
scene.add(boxHelper)
