precision highp float;
uniform float uTime;
varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  float strength = 1.0 - length(vec2(vUv.x - 0.5, vUv.y - 0.5));
  gl_FragColor = vec4(strength, strength, strength, 1.0);
}