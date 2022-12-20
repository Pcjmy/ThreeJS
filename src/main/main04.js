import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 目标：Clock跟踪时间

// 创建场景
const scence = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0,0,10);
scence.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体的位置
// cube.position.set(0, 2.5, 0)
// cube.position.x = 3

// 缩放
// cube.scale.set(3, 2, 1)
// cube.scale.x = 5

// 旋转
// cube.rotation.set(Math.PI/4, 0, 0)

// 将几何体添加到场景中
scence.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas添加到body
document.body.appendChild(renderer.domElement);
// 使用渲染器，通过相机将场景渲染出来
// renderer.render(scence, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scence.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()

function render() {
  // 获取时钟运行的总时长
  let time = clock.getElapsedTime()
  console.log('时钟运行总时长：', time)
  let deltaTime = clock.getDelta()
  console.log('两次获取时间的时间间隔', deltaTime)
  renderer.render(scence, camera)
  requestAnimationFrame(render)
}

render()
