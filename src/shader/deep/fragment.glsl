precision highp float;
uniform float uTime;
varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  float strength = 0.15 / distance(vUv, vec2(0.5, 0.5)) - 1.0;
  gl_FragColor = vec4(strength, strength, strength, strength);
}