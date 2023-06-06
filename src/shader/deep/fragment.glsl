precision highp float;
varying vec2 vUv;

void main() {
  float barX = step(0.4, mod(vUv.x * 10.0, 1.0)) * step(0.8, mod(vUv.y * 10.0, 1.0));
  float barY = step(0.4, mod(vUv.y * 10.0, 1.0)) * step(0.8, mod(vUv.x * 10.0, 1.0));
  float strength = barX + barY;
  gl_FragColor = vec4(vUv, 1, strength);
  // gl_FragColor = vec4(strength, strength, strength, 1.0);
}