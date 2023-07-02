export interface Viewport {
  canvas: HTMLCanvasElement | undefined | null;
  width: number;
  height: number;
  near: number;
  far: number;
  cameraZ: number;
  aspect: number;
  rad: number;
  fov: number;
  devicePixelRatio: number;
  isMobile: boolean;
  actions: Set<(viewport?: Viewport) => void>;
  isLoaded: boolean;
}
DOMRect