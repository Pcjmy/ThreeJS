void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;

  gl_Position = projectionMatrix * viewPosition;

  // 根据viewPosition的z坐标决定是否远离摄像机
  gl_PointSize = 50.0;
}
