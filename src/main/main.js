import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'
// 导入dat.gui
import * as dat from 'dat.gui'
// 导入cannon引擎
import * as CANNON from 'cannon-es'

const gui = new dat.GUI()

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
  0.1,
  300
)

// 设置相机位置
camera.position.set(0, 0, 20)
scene.add(camera)

const cubeArr = [];
// 设置物体材质
const cubeWorldMaterial = new CANNON.Material('cube');

function createCube() {
  // 创建立方体和平面
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  scene.add(cube);
  // 创建物理cube形状
  const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));

  // 创建物理世界的物体
  const cubeBody = new CANNON.Body({
    shape: cubeShape,
    position: new CANNON.Vec3(0, 0, 0),
    // 小球质量
    mass: 1,
    // 物体材质
    material: cubeWorldMaterial,
  });
  cubeBody.applyLocalForce(
    new CANNON.Vec3(100, 0, 0), //添加的力的大小和方向
    new CANNON.Vec3(0, 0, 0) //施加的力所在的位置
  );

  // 将物体添加至物理世界
  world.addBody(cubeBody);
  // 添加监听碰撞事件
  function HitEvent(e) {
    // 获取碰撞的强度
    // console.log("hit", e);
    const impactStrength = e.contact.getImpactVelocityAlongNormal();
    // console.log(impactStrength);
    if (impactStrength > 2) {
      //   重新从零开始播放
      hitSound.currentTime = 0;
      hitSound.volume = Math.min(1.0, impactStrength / 12);
      hitSound.play();
    }
  }
  cubeBody.addEventListener('collide', HitEvent);
  cubeArr.push({
    mesh: cube,
    body: cubeBody,
  });
}

window.addEventListener('click', createCube);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial()
);

floor.position.set(0, -5, 0);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);

// 创建击打声音
const hitSound = new Audio('public/assets/metalHit.mp3');

// 物理世界创建地面
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
const floorMaterial = new CANNON.Material('floor');
floorBody.material = floorMaterial;
// 当质量为0的时候，可以使得物体保持不动
floorBody.mass = 0;
floorBody.addShape(floorShape);
// 地面位置
floorBody.position.set(0, -5, 0);
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(floorBody);

// 设置2种材质碰撞的参数
const defaultContactMaterial = new CANNON.ContactMaterial(
  cubeWorldMaterial,
  floorMaterial,
  {
    // 摩擦力
    friction: 0.1,
    // 弹性
    restitution: 0.7,
  }
);

// 讲材料的关联设置添加的物理世界
world.addContactMaterial(defaultContactMaterial);

// 设置世界碰撞的默认材料，如果材料没有设置，都用这个
world.defaultContactMaterial = defaultContactMaterial;

// 添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.castShadow = true;
scene.add(dirLight);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({alpha: true});
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;

// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
// 设置时钟
const clock = new THREE.Clock();

// window.addEventListener('dblclick', () => {
//   const fullScreenElement = document.fullscreenElement
//   if (fullScreenElement == null) {
//     // 双击控制屏幕进入全屏，退出全屏
//     // 让画布对象全屏
//     renderer.domElement.requestFullscreen()
//   } else {
//     // 退出全屏，使用document对象
//     document.exitFullscreen()
//   }
// })

function render() {
  let deltaTime = clock.getDelta()
  controls.update()
  // 更新物理引擎里世界的物体
  world.step(1/120, deltaTime)
  cubeArr.forEach((item) => {
    item.mesh.position.copy(item.body.position);
    // 设置渲染的物体跟随物理的物体旋转
    item.mesh.quaternion.copy(item.body.quaternion);
  });
  renderer.render(scene, camera)
  //  渲染下一帧的时候就会调用render函数
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
