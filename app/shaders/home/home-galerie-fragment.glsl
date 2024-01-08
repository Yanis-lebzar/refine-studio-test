// // precision highp float;
// // uniform float uAlpha;
// // uniform float uBorderRadius;
// // uniform sampler2D tMap;

// // varying vec2 vUv;

// // void main() {
// //   vec4 texture = texture2D(tMap, vUv);
  
// //   // Create a mask for the border radius.
// // //   float radius = 0.5 - uBorderRadius;
// // //   vec2 position = vUv - vec2(0.5);
// // //   float dist = length(position);
// // //   float mask = smoothstep(radius, radius + 0.01, dist);

// //   // Apply the mask to the texture.
// // //   if (dist > radius) {
// // //     discard;
// // //   } else {
// // //     gl_FragColor = texture;
// // //     gl_FragColor.a *= uAlpha;
// // //   }
// // // gl_FragColor = vec4(texture.rgb, texture.a * uAlpha * mask);

// // vec2 position = vUv * 2.0 - 1.0;  // move uv coordinates from [0,1] to [-1,1] 
// //   float dist = max(abs(position.x), abs(position.y));

// //   // Apply the mask to the texture.
// //   if (dist > (1.0 - 0.3)) {
// //     discard;
// //   } else {
// //     gl_FragColor = vec4(texture.rgb, texture.a * uAlpha);
// //   }

// // }

// precision highp float;
// uniform float uAlpha;
// uniform sampler2D tMap;
// uniform vec2 uSize;
// uniform float uRadius;

// varying vec2 vUv;

// // Signed Distance Function for a rounded box.
// float roundedBoxSDF(vec2 centerPosition, vec2 size, float radius) {
//     return length(max(abs(centerPosition)-size+radius,0.0))-radius;
// }

// void main() {
//   vec4 texture = texture2D(tMap, vUv);
  
//   float radius = (sin(1.0) + 1.0) * 2.0;
//   // Calculate distance to edge.
//   float distance = roundedBoxSDF(vUv.xy  - (uSize / 2.0), uSize / 2.0, radius);

//   // Smooth the result for free antialiasing.
//   float smoothedAlpha = 1.0 - smoothstep(0.0, 10.0 , distance);
//     //   vec4 quadColor		= mix(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 0.2, 1.0, smoothedAlpha), smoothedAlpha);

//   // Apply the mask to the texture.
//   gl_FragColor = texture;
//   gl_FragColor.a *= smoothedAlpha * uAlpha;
// //   gl_FragColor.a = mix( quadColor  ,smoothedAlpha, uAlpha);

// }






// // precision highp float;
// // uniform float uAlpha;
// // uniform float uBorderRadius;
// // uniform sampler2D tMap;

// // varying vec2 vUv;

// // void main() {
// //   vec4 texture = texture2D(tMap, vUv);
  
// //   // Create a mask for the border radius.
// //   float radius = 0.6 - uBorderRadius;
// //   vec2 position = vUv - vec2(0.5);
// //   float dist = length(position);
  
// //   // Apply the mask to the texture.
// //   if (dist > radius) {
// //     discard;
// //   } else {
// //     gl_FragColor = texture;
// //     gl_FragColor.a *= uAlpha;
// //   }
// // }
