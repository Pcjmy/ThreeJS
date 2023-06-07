precision highp float;
uniform float uTime;
varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  float strength = ceil(vUv.x * 10.0) / 10.0 * ceil(vUv.y * 10.0) / 10.0;
  strength = random(vec2(strength, strength));
  gl_FragColor = vec4(strength, strength, strength, 1.0);
}