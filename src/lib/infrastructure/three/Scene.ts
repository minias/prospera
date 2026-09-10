// src/lib/infrastructure/three/Scene.ts
import * as THREE from 'three';

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05070a);
  return scene;
}
