 precision highp float;
 uniform float uAlpha;
 uniform sampler2D tMap;

uniform vec2 uImageSizes;
uniform vec2 uPlaneSizes;

uniform vec2 uPlaneRes;
uniform float uBorderRadius;

 varying vec2 vUv;
 
 float udRoundBox( vec2 p, vec2 b, float r ){
    return length(max(abs(p)-b+r,0.0))-r;
}

float roundCorners(vec2 planeRes, vec2 uv, float radius) {
    float iRadius = min(planeRes.x, planeRes.y) * radius;
    vec2 halfRes = 0.5 * planeRes.xy;
    float b = udRoundBox( (uv * planeRes) - halfRes, halfRes, iRadius );
    return clamp(1.0 - b, 0.0, 1.0);
}

void main() {
     vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );
 
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
 

vec4 texture = texture2D(tMap, uv);
  gl_FragColor = texture;
  gl_FragColor.a = uAlpha;

  float roundC = roundCorners(uPlaneRes, vUv, uBorderRadius / min(uPlaneRes.x, uPlaneRes.y));
    gl_FragColor.a *= roundC;

}