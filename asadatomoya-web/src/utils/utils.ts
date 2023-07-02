// import { detect as detectBrowser } from "detect-browser";
// import { getGPUTier } from "detect-gpu";
// import { Mesh, Quaternion, Vector3, Vector4 } from "three";

import { Vector4 } from "three";

// interface Rectangle {
//   width: number;
//   height: number;
// }

// // const isTouchDevices: boolean =  Boolean("ontouchstart" in window);
// const isTouchDevices: boolean = false;

// function lerp(a: number, b: number, n: number, limit: number = 0.001): number {
//   let current: number = (1 - n) * a + n * b;
//   if (Math.abs(b - current) < limit) current = b;
//   return current;
// }

// function getResolutionUniform(
//   toRect: Rectangle,
//   mediaRect?: Rectangle
// ): Vector4 {
//   const { width: toW, height: toH } = toRect;
//   const resolution = new Vector4(toW, toH, 1, 1);

//   if (!mediaRect) return resolution;

//   const { width: mediaW, height: mediaH } = mediaRect;

//   const mediaAspect = mediaH / mediaW;
//   const toAspect = toH / toW;

//   let xAspect, yAspect;
//   if (toAspect > mediaAspect) {
//     xAspect = (1 / toAspect) * mediaAspect;
//     yAspect = 1;
//   } else {
//     xAspect = 1;
//     yAspect = toAspect / mediaAspect;
//   }

//   resolution.z = xAspect;
//   resolution.w = yAspect;
//   return resolution;
// }

// function getDiagonalVertices(
//   hSeg: number,
//   wSeg: number,
//   getValue: (a: any, b: number) => any,
//   defaultValue: any
// ): any[] {
//   // TODO
//   const hSeg1 = hSeg + 1,
//     wSeg1 = wSeg + 1;
//   let array = [],
//     currentValue = defaultValue;
//   for (let i = 0; i < hSeg1 + wSeg1 - 1; i++) {
//     for (
//       let j = Math.min(hSeg1, i + 1) - 1;
//       j >= Math.max(0, i - wSeg1 + 1);
//       j--
//     ) {
//       let currentIndex = j * wSeg1 + i - j;
//       currentValue = getValue(currentValue, currentIndex);
//       array[currentIndex] = currentValue;
//     }
//   }
//   return array;
// }

// function pointTo(_mesh: Mesh, originalDir: Vector3, targetDir: Vector3): void {
//   // 回転軸の計算
//   const _originalDir = new Vector3(
//     originalDir.x,
//     originalDir.y,
//     originalDir.z
//   ).normalize();
//   const _targetDir = new Vector3(
//     targetDir.x,
//     targetDir.y,
//     targetDir.z
//   ).normalize();
//   const dir = new Vector3().crossVectors(_originalDir, _targetDir).normalize();

//   // 回転角の計算
//   const dot = _originalDir.dot(_targetDir);
//   const rad = Math.acos(dot);

//   // クォータニオンの作成
//   const q = new Quaternion();
//   q.setFromAxisAngle(dir, rad);

//   // メッシュを回転
//   _mesh.rotation.setFromQuaternion(q);
// }

// function isSafari(): boolean {
//   const browser = detectBrowser();
//   return !!browser && browser.name === "safari";
// }

// function isIOS(): boolean {
//   const userAgent = navigator.userAgent;

//   if (userAgent.match(/iPhone/i) || userAgent.match(/iPad/i)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// let _isHighPerformanceMode: boolean | undefined;
// async function definePerformanceMode(
//   _tier: number = 2,
//   _fps: number = 50
// ): Promise<void> {
//   const gpuTier = await getGPUTier();
//   if (window) {
//     console.log(gpuTier);
//   }
//   if (typeof gpuTier.fps !== "undefined") {
//     _isHighPerformanceMode = gpuTier.tier >= _tier && gpuTier.fps >= _fps;
//   } else {
//     _isHighPerformanceMode = false;
//   }
// }

// function isLowPerformanceMode(): boolean {
//   // implementation
//   return !_isHighPerformanceMode;
// }

// function toCamelCase(s: string): string {
//   return s.replace(/-./g, (x) => {
//     return x[1].toUpperCase();
//   });
// }

// const utils = {
//   lerp,
//   getResolutionUniform,
//   getDiagonalVertices,
//   pointTo,
//   isSafari,
//   isIOS,
//   definePerformanceMode,
//   isLowPerformanceMode,
//   toCamelCase,
//   isTouchDevices,
// };

// export { utils };

export const isDebug = process.env.NEXT_PUBLIC_DEBUG === "true";
export const isTouchDevices: boolean =
  typeof window !== "undefined" && Boolean("ontouchstart" in window);

// テクスチャのアスペクト値の算出
export const getResolutionUniform = (htmlRect: DOMRect, mediaRect: DOMRect) => {
  const { width: htmlW, height: htmlH } = htmlRect;
  const resolution = new Vector4(htmlW, htmlH, 1, 1);

  if (!mediaRect) return resolution;

  const { width: mediaW, height: mediaH } = mediaRect;

  const mediaAspect = mediaH / mediaW;
  const toAspect = htmlH / htmlW;

  let xAspect, yAspect;
  if (toAspect > mediaAspect) {
    xAspect = (1 / toAspect) * mediaAspect;
    yAspect = 1;
  } else {
    xAspect = 1;
    yAspect = toAspect / mediaAspect;
  }

  resolution.z = xAspect;
  resolution.w = yAspect;
  return resolution;
};

export const removeDuplicateArray = <T>(array: T[]): T[] => {
  const set = new Set<T>(array);
  const newArray = [...set];
  return newArray;
};
