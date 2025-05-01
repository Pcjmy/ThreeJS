precision lowp float;
varying vec4 vPosition;
varying vec4 gPosition;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1);
  vPosition = modelPosition;
  gPosition = vec4(position, 1);
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
