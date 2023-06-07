precision highp float;
uniform float uTime;
varying vec2 vUv;

// 随机函数
float random (vec2 st)
{
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 旋转函数
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
  return vec2(
    cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
    cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
  );
}

void main() {
  vec2 waveUv = vec2(
    vUv.x,
    vUv.y + sin(vUv.x * 30.0) * 0.1
  );
  float strength = 1.0 - step(0.01, abs(distance(waveUv, vec2(0.5, 0.5)) - 0.25));
  gl_FragColor = vec4(strength, strength, strength, 1.0);
}