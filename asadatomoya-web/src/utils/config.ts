/**
 * サイト全体の設定値
 */
// const config = {
// HTML内の主要なID属性の設定（styles/parts/_common.scss内のセレクタも合わせて要変更）
// $: {
//   canvas: "#canvas",
//   globalContainer: "#global-container",
//   pageContainer: "#page-container",
// },
// // HTML内のdata-〇〇に指定する名前の設定
// prefix: {
//   tex: "tex",
//   obj: "webgl",
//   page: "page",
//   mouse: "mouse",
//   scrollTrigger: "scroll-trigger",
// },
// // HTML内の主要なイベント名の設定
// event: {
//   resize: "resize",
//   mouseenter: "pointerenter",
//   mouse: "pointerleave",
//   mousemove: "pointermove",
//   click: "pointerdown",
// },
// モバイル判定 viewport.isMobile() の設定（breakpointより小さい場合はモバイル画面とする）
// breakpoint: { md: 768, xl: 1280 },
// nav: {
//   items: ["blog", "notequal"],
// },
// };

export const breakpoint = { md: 768, xl: 1280 };
export const links = [
  { displayName: "blog", path: "/blog" },
  { displayName: "notequal", path: "/notequal" },
];
