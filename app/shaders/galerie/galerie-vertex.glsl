#define PI 3.1415926535897932384626433832795

attribute vec3 position;
attribute vec2 uv;

uniform float uStrenght;
uniform float uSpeed;
uniform float uInitialEffect;
uniform vec2 uViewportSizes;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;



void main() {
    vUv = uv;

    vec4 newPosition = modelViewMatrix * vec4(position, 1.);

    //  newPosition.z -= sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uSpeed;
    //  newPosition.x -= sin(newPosition.x / uViewportSizes.x * PI + PI / 2.0) * -uSpeed;
    //  newPosition.y -= sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0) * -uSpeed;

    // newPosition.z -= sin(newPosition.x * uSpeed) + sin(newPosition.y * uSpeed) * PI / 2.;


    //  newPosition.z += (sin(newPosition.x / uViewportSizes.y * PI + PI / 2.0) * PI  ) * uSpeed;


    //       newPosition.z += (sin(newPosition.y / uViewportSizes.x * PI + PI / 2.0) * PI  ) * uSpeed;

    //       newPosition.y -= sin(uv.y * 2.0 * PI/2.  * 1.5) * 0.4;

    //  newPosition.z -= (sin(newPosition.z / uViewportSizes.x * PI + PI / 2.0) ) * -uSpeed;
    //  newPosition.z -= (sin(newPosition.x / uViewportSizes.y * PI + PI / 2.0) ) * -uSpeed;


    //effect de fou  explain : 30.5 refers to the number of waves, add more and you get more waves, less and you knvw.  9.5 is a cool number to try
    // circleFactor2 scale up the waves and circleFactor1 is the speed of the waves and also the form of the waves
    // La valeur / 2.0 joue sur la vague horizontale de tout l'écran sur laquelle se base chaque mesh
    // float circleFactor1 = (sin(newPosition.y * (30.5) / (uViewportSizes.y ) * PI + PI / 2.0) * sin((newPosition.x  ) / (uViewportSizes.x ) *  PI + PI / 2.0)) * abs(uSpeed + (0.4*uStrenght));

    // float circleFactor2 = (sin(newPosition.y  / (uViewportSizes.y *2.  ) * PI + PI / 2.0) * sin(newPosition.x   / (uViewportSizes.x *2.) *  PI + PI / 2.0)) * abs(uStrenght *3.);
   
   //wavy on the sides

//  float circleFactor1 = (sin(newPosition.y * (-30.5) / (uViewportSizes.y ) * PI + PI / 2.0) * sin((newPosition.x  ) / (uViewportSizes.x ) *  PI + PI / 2.0)) * abs(uSpeed + (0.4*uStrenght));

//     float circleFactor2 = (sin(newPosition.y  / (uViewportSizes.y *2.  ) * PI + PI / 2.0) * sin(newPosition.x   / (uViewportSizes.x *2.) *  PI + PI / 2.0)) * abs(uStrenght *3.);

    // float circleFactor1 = (sin(newPosition.x * (1.5) / (uViewportSizes.y ) * PI + PI / 2.0) * sin((newPosition.x / 2.  ) / (uViewportSizes.y ) *  PI + PI / 2.0)) * abs(uSpeed + (0.4*uStrenght));

    float circleFactor4 = sin(newPosition.y * (1.5) / (uViewportSizes.y ) * PI + PI / 1.75)  * abs(uSpeed + (0.4*uStrenght))*2.;

    float circleFactor1 = sin(newPosition.y * (1.5) / (uViewportSizes.y ) * PI + PI / 2.0)  * abs(uSpeed + (0.4*uStrenght))*3.;

    float circleFactor3 = sin(newPosition.x * (1.5) / (uViewportSizes.y ) * PI + PI / 2.0)  * abs(uSpeed + (0.4*uStrenght))*3.;

    float circleFactor2 = (sin(newPosition.x  / (uViewportSizes.y *2.  ) * PI + PI / 2.0) * sin(newPosition.y   / (uViewportSizes.x *2.) *  PI + PI / 2.0)) * abs(uStrenght *1.5);
   
    newPosition.z += circleFactor4 +circleFactor2 ;

      // newPosition.z += (sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0)) * (uSpeed + uInitialEffect);



    
    gl_Position = projectionMatrix * newPosition;
    
   
}
