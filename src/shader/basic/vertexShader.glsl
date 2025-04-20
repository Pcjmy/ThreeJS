varying vec2 vUv;

attribute float imgIndex;
attribute float aScale;
varying float vImgIndex;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  // 根据viewPosition的z坐标决定是否远离摄像机
  gl_PointSize = 200.0 * aScale / -viewPosition.z;
  vUv = uv;
  vImgIndex = imgIndex;
}
