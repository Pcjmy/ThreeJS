varying vec2 vUv;

void main() {
  // gl_FragColor = vec4(gl_PointCoord, 0.0, 1.0);

  // 设置渐变圆
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength *= 2.0;
  strength = 1.0 - strength;
  gl_FragColor = vec4(strength);

  // 圆形点
  // float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));
  // strength = step(0.5, strength);
  // gl_FragColor = vec4(strength);
}
