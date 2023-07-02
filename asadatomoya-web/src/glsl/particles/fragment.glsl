varying vec2 vUv;

uniform sampler2D texCurrent;
uniform sampler2D texNext;
uniform float uProgress;
uniform vec4 uResolution;

// #pragma glslify: coverUv = require(../shader-util/coverUv)

vec2 coverUv(vec2 uv, vec4 resolution) {
  return (uv - 0.5) * resolution.zw + 0.5;
}

void main() {
  vec2 uv = coverUv(vUv, uResolution);
  vec4 tCurrent = texture(texCurrent, uv);
  vec4 tNext = texture(texNext, uv);
  vec4 color = mix(tCurrent, tNext, uProgress);
  // color.a = vAlpha;
  gl_FragColor = color;
}