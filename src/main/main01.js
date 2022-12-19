import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 目标：使用控制器查看3D物体

// 1、创建场景
const scence = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// 3、设置相机位置
camera.position.set(0,0,10);
scence.add(camera);

// 4、添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 5、根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// 6、将几何体添加到场景中
scence.add(cube);

// 7、初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 8、设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 9、将webgl渲染的canvas添加到body
document.body.appendChild(renderer.domElement);
// 10、使用渲染器，通过相机将场景渲染出来
// renderer.render(scence, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scence.add(axesHelper)

function render() {
  renderer.render(scence, camera)
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
}

render()
