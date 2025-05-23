import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// 导入dat.gui
import * as dat from 'dat.gui'
import gsap from 'gsap'
import FireWorks from './firework'

// 顶点着色器
import vertexShader from '../shader/flylight/vertex.glsl'
// 片元着色器
import fragmentShader from '../shader/flylight/fragment.glsl'

// 导入水模块
import { Water } from 'three/examples/jsm/objects/Water2'

const gui = new dat.GUI()

// 创建场景
const scene = new THREE.Scene()

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
	90,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

// 设置相机位置
camera.position.set(0, 0, 50)
camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()
scene.add(camera)

// 创建纹理加载器对象
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('./public/assets/2k.hdr').then((texture) => {
	texture.mapping = THREE.EquirectangularReflectionMapping
	scene.background = texture
	scene.environment = texture
})

// 添加坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(5)
// scene.add(axesHelper)

// 创建着色器材质
const shaderMaterial = new THREE.ShaderMaterial({
	vertexShader: vertexShader,
	fragmentShader: fragmentShader,
	side: THREE.DoubleSide
	// transparent: true
})

// 创建平面
// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(1, 1, 64, 64),
//   shaderMaterial
// )

// scene.add(floor)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.2

const gltfLoader = new GLTFLoader()

gltfLoader.load('./public/assets/model/newyears_min.glb', (gltf) => {
	scene.add(gltf.scene)

	// 创建水面
	const waterGeometry = new THREE.PlaneGeometry(50, 50)
	const water = new Water(waterGeometry, {
		scale: 4,
		textureWidth: 1024,
		textureHeight: 1024
	})

	water.position.y = 1
	water.rotation.x = -Math.PI / 2

	scene.add(water)
})

let LightBox = null
gltfLoader.load('./public/assets/model/flyLight.glb', (gltf) => {
	// scene.add(gltf.scene)
	LightBox = gltf.scene.children[0]
	LightBox.material = shaderMaterial

	for (let i = 0; i < 150; i++) {
		let flyLight = gltf.scene.clone(true)
		let x = (Math.random() - 0.5) * 300
		let z = (Math.random() - 0.5) * 300
		let y = Math.random() * 60 + 5
		flyLight.position.set(x, y, z)
		gsap.to(flyLight.rotation, {
			y: 2 * Math.PI,
			duration: 10 + Math.random() * 10,
			repeat: -1
		})
		gsap.to(flyLight.position, {
			x: '+=' + Math.random() * 5,
			y: '+=' + Math.random() * 20,
			yoyo: true,
			duration: 5 + Math.random() * 10,
			repeat: -1
		})
		scene.add(flyLight)
	}
})

// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器添加到body
document.body.appendChild(renderer.domElement)

// 初始化控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true
// 设置自动旋转
controls.autoRotate = true
controls.autoRotateSpeed = 0.1
// controls.maxPolarAngle = (Math.PI / 3) * 2
// controls.minPolarAngle = (Math.PI / 3) * 2

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

// 管理烟花
let fireworks = []

// 设置创建烟花函数
let createFireWorks = () => {
	let color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`
	let position = {
		x: (Math.random() - 0.5) * 40,
		z: -(Math.random() - 0.5) * 40,
		y: 7 + Math.random() * 25
	}

	// 随机生成颜色和烟花放的位置
	let firework = new FireWorks(color, position)
	firework.addScene(scene, camera)
	fireworks.push(firework)
}

window.addEventListener('click', createFireWorks)

// 设置时钟
const clock = new THREE.Clock()
function animate(t) {
	controls.update()

	// 反向遍历避免索引错乱
	for (let i = fireworks.length - 1; i >= 0; i--) {
		const firework = fireworks[i]
		const shouldRemove = firework.update()
		if (shouldRemove) {
			fireworks.splice(i, 1)
		}
	}

	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

animate()
