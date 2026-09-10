// src/lib/infrastructure/three/Renderer.ts

import * as THREE from 'three';

export interface RendererOptions {
  antialias?: boolean;
  alpha?: boolean;
}

export function createRenderer(
  canvas: HTMLCanvasElement,
  options: RendererOptions = {}
): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: options.antialias ?? true,
    alpha: options.alpha ?? false,
    powerPreference: 'high-performance'
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  return renderer;
}

export function disposeRenderer(renderer: THREE.WebGLRenderer): void {
  renderer.setAnimationLoop(null);
  renderer.dispose();
}