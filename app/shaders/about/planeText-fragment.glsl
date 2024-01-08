 precision highp float;
 uniform float uAlpha;
 uniform sampler2D tMap;

uniform vec2 uImageSizes;

uniform vec2 uPlaneRes;

// Background cover UV
 
//  vec2 getUvs(vec2 planeRes, vec2 mediaRes, vec2 uv) {
//     vec2 ratio = vec2(
//         min((planeRes.x / planeRes.y) / (mediaRes.x / mediaRes.y), 1.0),
//         min((planeRes.y / planeRes.x) / (mediaRes.y / mediaRes.x), 1.0)
//     );
//     vec2 finalUv = vec2(
//         uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
//         uv.y * ratio.y + (1.0 - ratio.y) * 0.5
//     );
//     return finalUv;
// }


      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }

 // Border radius
 
 float udRoundBox( vec2 p, vec2 b, float r ){
    return length(max(abs(p)-b+r,0.0))-r;
}

float roundCorners(vec2 planeRes, vec2 uv, float radius) {
    float iRadius = min(planeRes.x, planeRes.y) * radius;
    vec2 halfRes = 0.5 * planeRes.xy;
    float b = udRoundBox( (uv * planeRes) - halfRes, halfRes, iRadius );
    return clamp(1.0 - b, 0.0, 1.0);
}

 varying vec2 vUv;
 float PI = 3.141592653589793238;

void main() {
// cover
    vec2 uv = CoverUV(vUv, uPlaneRes, uImageSizes);


    vec4 texture = texture2D(tMap, uv);

    //displacement with water effect

 

    gl_FragColor =  texture;






}