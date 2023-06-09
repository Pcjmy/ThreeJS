uniform float uWaresFrequency;
uniform float uScale;
varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  float elevation = sin(modelPosition.x * uWaresFrequency) * sin(modelPosition.z * uWaresFrequency);
  elevation *= uScale;
  vElevation = elevation;
  modelPosition.y += elevation;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}