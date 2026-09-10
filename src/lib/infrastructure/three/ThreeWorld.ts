// src/lib/infrastructure/three/ThreeWorld.ts

import * as THREE from 'three';
import { WorldState } from '$lib/domain/world/WorldState';
import { createCamera, resizeCamera } from './Camera';
import { createRenderer, disposeRenderer } from './Renderer';
import { createScene } from './Scene';

export interface ThreeWorldOptions {
  antialias?: boolean;
  alpha?: boolean;
}

export class ThreeWorld {
  readonly state = new WorldState();

  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;

  private readonly core: THREE.Mesh<
    THREE.SphereGeometry,
    THREE.MeshStandardMaterial
  >;

  private readonly orbit: THREE.Mesh<
    THREE.TorusGeometry,
    THREE.MeshStandardMaterial
  >;

  private readonly resizeObserver: ResizeObserver;
  private readonly container: HTMLElement;

  private disposed = false;
  private elapsed = 0;

  private pointerTarget = new THREE.Vector2();
  private pointerCurrent = new THREE.Vector2();

  constructor(container: HTMLElement, options: ThreeWorldOptions = {}) {
    this.container = container;

    this.scene = createScene();

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);

    this.camera = createCamera(width, height);

    const canvas = document.createElement('canvas');

    this.renderer = createRenderer(canvas, {
      antialias: options.antialias,
      alpha: options.alpha
    });

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setSize(width, height, false);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(3, 5, 4);
    this.scene.add(keyLight);

    const coreGeometry = new THREE.SphereGeometry(0.55, 48, 48);

    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x7fd8ff,
      roughness: 0.3,
      metalness: 0.2,
      emissive: 0x16445a,
      emissiveIntensity: 0.6
    });

    this.core = new THREE.Mesh(coreGeometry, coreMaterial);
    this.scene.add(this.core);

    const orbitGeometry = new THREE.TorusGeometry(
      1.15,
      0.012,
      8,
      128
    );

    const orbitMaterial = new THREE.MeshStandardMaterial({
      color: 0x8edfff,
      roughness: 0.4,
      metalness: 0.3,
      emissive: 0x16445a,
      emissiveIntensity: 0.35
    });

    this.orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    this.orbit.rotation.x = THREE.MathUtils.degToRad(68);
    this.orbit.rotation.z = THREE.MathUtils.degToRad(-12);

    this.scene.add(this.orbit);

    container.replaceChildren(this.renderer.domElement);

    container.addEventListener('pointermove', this.handlePointerMove);

    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
    });

    this.resizeObserver.observe(container);

    this.resize();

    this.state.start();

    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  private readonly handlePointerMove = (event: PointerEvent): void => {
    if (this.disposed) return;

    const rect = this.container.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    this.pointerTarget.set(
      THREE.MathUtils.clamp((x - 0.5) * 2, -1, 1),
      THREE.MathUtils.clamp((y - 0.5) * 2, -1, 1)
    );
  };

  private resize(): void {
    if (this.disposed) return;

    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);

    resizeCamera(this.camera, width, height);
    this.renderer.setSize(width, height, false);
  }

  private render(): void {
    if (this.disposed) return;

    this.elapsed += 0.016;

    this.pointerCurrent.lerp(this.pointerTarget, 0.035);

    this.core.rotation.y += 0.002;

    const pulse = 1 + Math.sin(this.elapsed * 1.2) * 0.025;
    this.core.scale.setScalar(pulse);

    this.core.position.x = this.pointerCurrent.x * 0.08;
    this.core.position.y = -this.pointerCurrent.y * 0.05;

    this.orbit.rotation.y += 0.0015;
    this.orbit.rotation.z += 0.0003;

    this.orbit.position.x = this.pointerCurrent.x * 0.12;
    this.orbit.position.y = -this.pointerCurrent.y * 0.08;

    this.state.tick();

    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    if (this.disposed) return;

    this.disposed = true;

    this.state.dispose();

    this.container.removeEventListener('pointermove', this.handlePointerMove);
    this.resizeObserver.disconnect();

    this.core.geometry.dispose();
    this.core.material.dispose();

    this.orbit.geometry.dispose();
    this.orbit.material.dispose();

    this.scene.clear();

    disposeRenderer(this.renderer);
    this.renderer.domElement.remove();
  }
}