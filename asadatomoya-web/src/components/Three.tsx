"use client";

import { type FC, useEffect } from "react";

import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Clock,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ThreeProps {}

const Three: FC<ThreeProps> = ({}) => {
  let canvas: HTMLElement;
  useEffect(() => {
    if (canvas) return;
    // canvasを取得
    canvas = document.getElementById("canvas")!;

    // シーン
    const scene = new Scene();

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };

    // カメラ
    const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

    // レンダラー
    const renderer = new WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // ボックスジオメトリー
    const boxGeometry = new BoxGeometry(1, 1, 1);
    const boxMaterial = new MeshLambertMaterial({
      color: "#2497f0",
    });
    const box = new Mesh(boxGeometry, boxMaterial);
    box.position.z = -5;
    box.rotation.set(10, 10, 10);
    scene.add(box);

    // ライト
    const ambientLight = new AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new PointLight(0xffffff, 0.2);
    pointLight.position.set(1, 2, 3);
    scene.add(pointLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    
    const axesHelper = new AxesHelper(1000);
    camera.position.z = 5;
    
    scene.add(axesHelper);
    // アニメーション
    const clock = new Clock();
    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      box.rotation.x = elapsedTime;
      box.rotation.y = elapsedTime;
      window.requestAnimationFrame(tick);
      controls.update();

      renderer.render(scene, camera);
    };
    tick();

    // ブラウザのリサイズ処理
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }, []);
  return <canvas id="canvas"></canvas>;
};

export default Three;
