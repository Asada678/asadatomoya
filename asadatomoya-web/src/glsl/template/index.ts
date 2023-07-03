import { CylinderGeometry, Mesh, MeshBasicMaterial, Object3D } from "three";

import { Ob, Uniforms } from "@glsl/Ob";

import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

// eslint-disable-next-line import/no-anonymous-default-export
/**
 * 以下をアンコメントして使用
 */
// export default class extends Ob<Object3D> {
//   radius!: number;

//   setupMesh():  {

//   }
//   setupVertex() {
//     return vertexShader;
//   }
//   setupFragment() {
//     return fragmentShader;
//   }
//   afterInit() {}
// }
