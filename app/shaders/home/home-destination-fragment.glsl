// precision highp float;
// uniform float uAlpha;
// uniform float uBorderRadius;
// uniform sampler2D tMap;
//     varying float vWave;

// varying vec2 vUv;

// void main() {
    
//      float wave = vWave * 0.1;
//       vec3 texture = texture2D(tMap, vUv + wave).rgb;
// //   vec4 texture = texture2D(tMap, vUv);
  
//   // Create a mask for the border radius.
//   float radius = 0.5 - uBorderRadius;
//   vec2 position = vUv - vec2(0.5);
//   float dist = length(position);
  
//   // Apply the mask to the texture.
//   if (dist > radius) {
//     discard;
//   } else {
// gl_FragColor = vec4(texture, 1.0);

//     gl_FragColor.a *= uAlpha;
//   }
// }
