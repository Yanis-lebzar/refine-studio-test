uniform vec3 uColor;
uniform sampler2D tMap;
 
varying vec2 vUv;
 
void main() {
  vec3 tex = texture2D(tMap, vUv).rgb;
 
  float signed = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
  float d = fwidth(signed);
  float alpha = smoothstep(-d, d, signed);
 
  if (alpha < 0.01) discard;
 
  gl_FragColor = vec4(uColor, alpha);
}