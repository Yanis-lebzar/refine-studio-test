 precision highp float;
 uniform float uAlpha;
 uniform sampler2D tMap;


uniform vec2 uImageSizes;
// uniform vec2 uPlaneSizes;
uniform float uIndex;
uniform vec2 uPlaneRes;
uniform float uBorderRadius;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord;

varying float distanceZ;

//  uniform vec2 uOffset;



// vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
//    float r = texture2D(textureImage,uv + offset).r;
//    vec2 gb = texture2D(textureImage,uv).gb;
//    return vec3(r,gb);
//  }


/*------------------------------
Background Cover UV
--------------------------------
u = basic UV
s = plane size
i = image size
------------------------------*/
vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
  float rs = s.x / s.y; // Aspect plane size
  float ri = i.x / i.y; // Aspect image size
  vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
  vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
  return u * s / st + o;
}

// Background cover UV
 
 vec2 getUvs(vec2 planeRes, vec2 mediaRes, vec2 uv) {
    vec2 ratio = vec2(
        min((planeRes.x / planeRes.y) / (mediaRes.x / mediaRes.y), 1.0),
        min((planeRes.y / planeRes.x) / (mediaRes.y / mediaRes.x), 1.0)
    );
    vec2 finalUv = vec2(
        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
    return finalUv;
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

//  varying float distanceZ;

 varying vec2 vUv;

void main() {

        // vec2 uv = getUvs(uPlaneRes, uImageSizes, vUv);

        // vec4 texture = texture2D(tMap, uv);

        // gl_FragColor = texture;
        // gl_FragColor.a = uAlpha;

        // float roundC = roundCorners(uPlaneRes, vUv, uBorderRadius / min(uPlaneRes.x, uPlaneRes.y));

        // gl_FragColor.a *= roundC;


    vec2 uv = getUvs(uPlaneRes, uImageSizes, vUv);
    vec4 textureColor = texture2D(tMap, uv);

if (uIndex == 0.0 || uIndex == 7.0){

    // Ajouter un filtre noir avec une opacité de 0.5
    vec4 blackFilter = vec4(0.0, 0.0, 0.0, 1.);
    vec4 finalColor = mix(textureColor, blackFilter, blackFilter.a *0.3);

    // Appliquer l'opacité générale
    finalColor.a *= uAlpha;
    // Appliquer le masque de coins arrondis
    float roundC = roundCorners(uPlaneRes, vUv, uBorderRadius / min(uPlaneRes.x, uPlaneRes.y));
    finalColor.a *= roundC;

    gl_FragColor = finalColor;
} else {

    gl_FragColor = textureColor;
  gl_FragColor.a = uAlpha;
  float roundC = roundCorners(uPlaneRes, vUv, uBorderRadius / min(uPlaneRes.x, uPlaneRes.y));
    gl_FragColor.a *= roundC;

}


}
