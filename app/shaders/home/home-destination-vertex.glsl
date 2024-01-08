// attribute vec3 position;
// attribute vec2 uv;

// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform float uTime;

// varying vec2 vUv;
// varying float vWave;

// #pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);

// void main() {
//  vUv = uv;

//       vec3 pos = position;
//       float noiseFreq = 7.0;//7.0 nombres de vagues
//       float noiseAmp = 0.09; //0.14 
//       vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
//       pos.z += snoise3(noisePos) * noiseAmp;
//       vWave = pos.z;

//       gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);  
// }