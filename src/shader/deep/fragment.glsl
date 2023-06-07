precision highp float;
uniform float uTime;
varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  float strength = 0.15 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5)) - 1.0;
  strength += 0.15 / distance(vec2((vUv.x - 0.5) * 5.0 + 0.5, vUv.y), vec2(0.5, 0.5)) - 1.0;
  gl_FragColor = vec4(strength, strength, strength, 1.0);
}