precision highp float;

uniform float uAlpha;
uniform sampler2D tMap;

varying vec4 vPosition;
varying vec2 vUv;

void main() {
  vec4 tex = texture2D(tMap, vUv);
// tex.b += 3.5;
  gl_FragColor = vec4(tex.rgb, tex.a * uAlpha);
}