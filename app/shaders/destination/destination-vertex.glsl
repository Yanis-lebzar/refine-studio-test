
attribute vec3 position;
attribute vec2 uv;


uniform vec2 uViewportSizes;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
 uniform sampler2D tMap;

uniform float uStrenght;
uniform float uSpeed;

uniform vec2 uOffset;
uniform float uScrollEffect;


varying vec2 vUv;

#define PI 3.1415926535897932384626433832795

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
   position.x = position.x + (sin(uv.y * PI) * offset.x);
   position.y = position.y + (sin(uv.x * PI) * offset.y);
   return position;
}



void main() {

    
     vUv = uv;
  
    vec4 newPosition = modelViewMatrix * vec4(position, 1.);

//matrix effect scroll rapide
   //  newPosition.z += cos( -uScrollEffect * 0.02 + newPosition.y * 20.5) * (uScrollEffect * 0.01);
   //  newPosition.y += sin(-uScrollEffect / 600.0);

    newPosition.z += cos( -uScrollEffect * 0.02 + newPosition.y * 1.5) * (uScrollEffect * 0.007);
    newPosition.y += sin(-uScrollEffect / 300.0);

//idée slider dezoom : 
//float circleFactor4 = sin(newPosition.y * (1.5) / (uViewportSizes.y )  + PI / 1.75)  * abs(uSpeed + (0.4*uStrenght))* -35.;

   //  float circleFactor4 = sin(newPosition.y * (1.5) / (uViewportSizes.y )  + PI / 1.75)  * abs(uSpeed  + (0.4*uStrenght))* -5.;

   //last : 
   //  float circleFactor4 = sin(newPosition.y * (1.5) / (uViewportSizes.y ) * PI + PI / 1.75)  * abs(uSpeed + (0.4*uStrenght))*5.;

   //  float circleFactor1 = sin(newPosition.y * (1.5) / (uViewportSizes.y ) * PI )  * abs(uSpeed + (0.4*uStrenght))*3.;




   
   //  newPosition.z += circleFactor4 ;
   //  newPosition.z += cos( -uOffset.y * 0.00001 * time + newPosition.y * 5.0) * (uOffset.y * 0.5);

   //   vec3 newPosition = deformationCurve(position, uv, uOffset);
    gl_Position = projectionMatrix * newPosition;




}
