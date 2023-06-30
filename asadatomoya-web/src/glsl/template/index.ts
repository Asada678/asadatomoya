import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";
// import { Ob } from "../Ob";

// export default class extends Ob {
//   setupVertex() {
//     return vertexShader;
//   }
//   setupFragment() {
//     return fragmentShader;
//   }
// }

export function init() {
  return vertexShader;
}
