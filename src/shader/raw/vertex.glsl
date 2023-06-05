precision lowp float;
attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

// 获取时间
uniform float uTime;

varying vec2 vUv;

varying float vElevation;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.x += 1.0;
  // modelPosition.z += 1.0;
  modelPosition.z += sin((modelPosition.x + uTime) * 10.0) * 0.05;
  modelPosition.z += sin((modelPosition.y + uTime) * 10.0) * 0.05;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
  vElevation = modelPosition.z;
}