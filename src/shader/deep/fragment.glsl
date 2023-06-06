precision highp float;
varying vec2 vUv;

void main() {
  // float strength = mod(vUv.y * 5.0, 1.0);
  // strength = step(0.2, strength);
  float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
  strength *= step(0.8, mod(vUv.y * 10.0, 1.0));
  gl_FragColor = vec4(strength, strength, strength, 1.0);
}