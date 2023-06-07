precision highp float;
uniform float uTime;
varying vec2 vUv;

void main() {
  float strength = ceil(vUv.y * 10.0) / 10.0 * ceil(vUv.x * 10.0) / 10.0;
  gl_FragColor = vec4(strength, strength, strength, 1.0);
}