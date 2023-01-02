import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建场景
const scence = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

// 设置相机位置
camera.position.set(0,0,10)
scence.add(camera)

let div = document.createElement('div')
div.style.width = '200px'
div.style.height = '200px'
div.style.position = 'fixed'
div.style.right = 0
div.style.top = 0
div.style.color = '#fff'
document.body.appendChild(div)

let event = {};
// 单张纹理图的加载
event.onLoad = function () {
  console.log("图片加载完成");
};
event.onProgress = function (url, num, total) {
  console.log("图片加载完成:", url);
  console.log("图片加载进度:", num);
  console.log("图片总数:", total);
  let value = ((num / total) * 100).toFixed(2) + "%";
  console.log("加载进度的百分比：", value);
  div.innerHTML = value;
};
event.onError = function (e) {
  console.log("图片加载出现错误");
  console.log(e);
};

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(
  event.onLoad,
  event.onProgress,
  event.onError
);
// 导入纹理
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorColorTexture = textureLoader.load(
  "./door/color.jpg"
  //   event.onLoad,
  //   event.onProgress,
  //   event.onError
);

const doorAplhaTexture = textureLoader.load("./door/alpha.jpg");
const doorAoTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
//导入置换贴图
const doorHeightTexture = textureLoader.load("./door/height.jpg");
// 导入粗糙度贴图
const roughnessTexture = textureLoader.load("./door/roughness.jpg");
// 导入金属贴图
const metalnessTexture = textureLoader.load("./door/metalness.jpg");
// 导入法线贴图
const normalTexture = textureLoader.load("./door/normal.jpg");

// 添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 100, 100, 100);
// 材质
const material = new THREE.MeshStandardMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  transparent: true,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  displacementMap: doorHeightTexture,
  displacementScale: 0.1,
  roughness: 1,
  roughnessMap: roughnessTexture,
  metalness: 1,
  metalnessMap: metalnessTexture,
  normalMap: normalTexture,
  //   opacity: 0.3,
  //   side: THREE.DoubleSide,
});
material.side = THREE.DoubleSide;
const cube = new THREE.Mesh(cubeGeometry, material);
scence.add(cube);
// 给cube添加第二组uv
cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

// 添加平面
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 200, 200);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(1.5, 0, 0);

scence.add(plane);
// console.log(plane);
// 给平面设置第二组uv
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

// 灯光
// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scence.add(light);
//直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scence.add(directionalLight);

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
// 设置控制器阻尼，让控制器更有真实效果，必须在动画循环里调用update()
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scence.add(axesHelper)

// 设置时钟
const clock = new THREE.Clock()

window.addEventListener('dblclick', () => {
  const fullScreenElement = document.fullscreenElement
  if (fullScreenElement == null) {
    // 双击控制屏幕进入全屏，退出全屏
    // 让画布对象全屏
    renderer.domElement.requestFullscreen()
  } else {
    // 退出全屏，使用document对象
    document.exitFullscreen()
  }
})

function render() {
  controls.update()
  renderer.render(scence, camera)
  // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render)
}

render()

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
