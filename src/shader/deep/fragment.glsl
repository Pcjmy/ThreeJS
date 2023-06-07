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
  vec2 rotateUv = rotate(vUv, -uTime * 5.0, vec2(0.5, 0.5));
  float alpha = 1.0 - step(0.5, abs(distance(rotateUv, vec2(0.5, 0.5))));
  float angle = atan(rotateUv.x - 0.5, rotateUv.y - 0.5);
  float strength = (angle + 3.14) / 6.28;
  gl_FragColor = vec4(strength, strength, strength, alpha);
}