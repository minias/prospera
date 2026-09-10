// src/lib/infrastructure/three/Camera.ts

import * as THREE from 'three';

export function createCamera(
  width: number,
  height: number
): THREE.PerspectiveCamera {
  const aspect = width > 0 && height > 0 ? width / height : 1;

  const camera = new THREE.PerspectiveCamera(
    60,
    aspect,
    0.1,
    100
  );

  camera.position.set(0, 1.5, 5);
  camera.lookAt(0, 0, 0);

  return camera;
}

export function resizeCamera(
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number
): void {
  const safeHeight = height > 0 ? height : 1;

  camera.aspect = width / safeHeight;
  camera.updateProjectionMatrix();
}