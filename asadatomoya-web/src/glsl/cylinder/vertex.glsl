varying vec2 vUv;
uniform float uRadius;

void main() {
    vUv = uv;
    vec3 pos = position;

    float roundZ = uRadius - sqrt(pow(uRadius, 2.) -pow(pos.x, 2.));
    pos.z -= roundZ;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}