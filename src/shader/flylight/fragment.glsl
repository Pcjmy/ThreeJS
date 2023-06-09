varying float vElevation;
void main() {
  float opacity = (vElevation + 1.0) / 2.0;
  gl_FragColor = vec4(0, 1, 1, opacity);
}