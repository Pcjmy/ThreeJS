void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = distanceToCenter * 2.0;
  strength = 1.0 - strength;
  gl_FragColor = vec4(strength);
  gl_FragColor = vec4(1, 0, 0, strength);
}
