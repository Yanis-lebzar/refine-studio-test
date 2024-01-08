attribute vec3 position;
attribute vec2 uv;

uniform vec2 uImageSizes;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
          vec3 pos = position;

          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}