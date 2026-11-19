import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { TitleCasePipe, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type FabricPreset = 'cotton' | 'silk' | 'polyester';

interface FabricSettings {
  roughness: number;
  metalness: number;
  clearcoat: number;
  sheen: number;
}

const FABRIC_PRESETS: Record<FabricPreset, FabricSettings> = {
  cotton: { roughness: 0.9, metalness: 0.0, clearcoat: 0.0, sheen: 0.45 },
  silk: { roughness: 0.25, metalness: 0.05, clearcoat: 0.2, sheen: 0.85 },
  polyester: { roughness: 0.55, metalness: 0.05, clearcoat: 0.05, sheen: 0.25 },
};

const SWATCH_COLORS: readonly { label: string; hex: string }[] = [
  { label: 'Cobalt Blue', hex: '#2563eb' },
  { label: 'Obsidian', hex: '#18181b' },
  { label: 'Ivory', hex: '#f8fafc' },
  { label: 'Crimson', hex: '#dc2626' },
  { label: 'Emerald', hex: '#059669' },
  { label: 'Amber', hex: '#d97706' },
];

@Component({
  selector: 'app-garment-viewer',
  templateUrl: './garment-viewer.component.html',
  styleUrl: './garment-viewer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GarmentViewerComponent implements AfterViewInit, OnDestroy {
  readonly modelUrl = input<string>('/t_shirt.glb');
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('viewportCanvas');

  private readonly ngZone = inject(NgZone);
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly presets: FabricPreset[] = ['cotton', 'silk', 'polyester'];
  readonly swatches = SWATCH_COLORS;
  readonly selectedColor = signal<string>('#2563eb');
  readonly selectedFabric = signal<FabricPreset>('cotton');
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);

  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private renderer?: THREE.WebGLRenderer;
  private controls?: OrbitControls;
  private garmentRoot?: THREE.Object3D;
  private garmentMaterials: THREE.MeshPhysicalMaterial[] = [];
  private animationFrameId?: number;
  private resizeObserver?: ResizeObserver;
  private isInitialized = false;

  private fittedCamPos = new THREE.Vector3(0, 1.2, 2.8);
  private fittedTarget = new THREE.Vector3(0, 1.0, 0);

  constructor() {
    effect(() => {
      const url = this.modelUrl();

      if (!this.isInitialized || !this.isBrowser) {
        return;
      }

      untracked(() => {
        queueMicrotask(() => {
          this.isLoading.set(true);
          this.errorMessage.set(null);
        });
        this.loadGarment(url);
      });
    });

    effect(() => {
      const hex = this.selectedColor();
      const preset = this.selectedFabric();

      untracked(() => {
        this.applyAppearance(hex, preset);
      });
    });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      this.isLoading.set(false);
      return;
    }

    this.initScene();
    if (this.renderer && this.scene) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.loadGarment(this.modelUrl());
      this.observeResize();
      this.startRenderLoop();
      this.isInitialized = true;
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
    this.resizeObserver?.disconnect();
    this.controls?.dispose();

    this.clearCurrentGarment();
    this.renderer?.dispose();
  }

  onColorChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    this.selectedColor.set(inputEl.value);
  }

  selectSwatch(hex: string): void {
    this.selectedColor.set(hex);
  }

  onFabricChange(preset: FabricPreset): void {
    this.selectedFabric.set(preset);
  }

  resetCamera(): void {
    if (!this.camera || !this.controls) return;
    this.camera.position.copy(this.fittedCamPos);
    this.controls.target.copy(this.fittedTarget);
    this.controls.update();
  }

  private initScene(): void {
    const canvas = this.canvasRef().nativeElement;
    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 520;

    const webglContext = canvas.getContext('webgl2');
    if (!webglContext) {
      this.isLoading.set(false);
      this.errorMessage.set('3D preview is unavailable in this browser.');
      return;
    }

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#eef2f6');

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.05, 200);
    this.camera.position.copy(this.fittedCamPos);

    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      this.isLoading.set(false);
      this.errorMessage.set('3D preview is unavailable in this browser.');
      return;
    }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.target.copy(this.fittedTarget);
    this.controls.minDistance = 0.6;
    this.controls.maxDistance = 12.0;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.45);
    keyLight.position.set(3, 5, 4);
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.55);
    fillLight.position.set(-3, 2, -3);

    this.scene.add(ambientLight, keyLight, fillLight);
  }

  private loadGarment(url: string): void {
    if (!this.scene) return;

    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        if (!this.scene) return;

        this.clearCurrentGarment();
        this.garmentMaterials = [];
        this.garmentRoot = gltf.scene;

        this.garmentRoot.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            const sourceMat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
            const matWithMaps = sourceMat as THREE.MeshStandardMaterial | undefined;

            const fabricMat = new THREE.MeshPhysicalMaterial({
              map: matWithMaps?.map ?? null,
              normalMap: matWithMaps?.normalMap ?? null,
              roughnessMap: matWithMaps?.roughnessMap ?? null,
              sheenColor: new THREE.Color('#ffffff'),
              side: THREE.DoubleSide,
            });

            this.disposeMaterial(obj.material);
            obj.material = fabricMat;
            this.garmentMaterials.push(fabricMat);
          }
        });

        this.scene.add(this.garmentRoot);
        this.fitModelToView(this.garmentRoot);
        this.applyAppearance(this.selectedColor(), this.selectedFabric());
        this.isLoading.set(false);
      },
      undefined,
      () => {
        this.isLoading.set(false);
        this.errorMessage.set('Could not load 3D model. Check the .glb path in public/.');
      }
    );
  }

  private fitModelToView(root: THREE.Object3D): void {
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    if (box.isEmpty()) return;

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 1.6;
    const scale = targetSize / maxDim;

    root.scale.multiplyScalar(scale);
    root.updateMatrixWorld(true);

    const scaledBox = new THREE.Box3().setFromObject(root);
    const center = scaledBox.getCenter(new THREE.Vector3());

    root.position.sub(center);
    root.updateMatrixWorld(true);

    this.fittedTarget.set(0, 0, 0);
    this.fittedCamPos.set(0, 0.15, 2.7);
    this.resetCamera();
  }

  private applyAppearance(hexColor: string, preset: FabricPreset): void {
    const settings = FABRIC_PRESETS[preset];
    const color = new THREE.Color(hexColor);

    for (const mat of this.garmentMaterials) {
      mat.color.copy(color);
      mat.roughness = settings.roughness;
      mat.metalness = settings.metalness;
      mat.clearcoat = settings.clearcoat;
      mat.sheen = settings.sheen;
      mat.needsUpdate = true;
    }
  }

  private observeResize(): void {
    const wrapper = this.canvasRef().nativeElement.parentElement;
    if (!wrapper || typeof ResizeObserver === 'undefined') return;

    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry || !this.renderer || !this.camera) return;

      const width = Math.max(1, Math.floor(entry.contentRect.width));
      const height = Math.max(1, Math.floor(entry.contentRect.height));

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
    });

    this.resizeObserver.observe(wrapper);
  }

  private startRenderLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      const renderFrame = () => {
        this.animationFrameId = requestAnimationFrame(renderFrame);
        this.controls?.update();

        if (this.renderer && this.scene && this.camera) {
          this.renderer.render(this.scene, this.camera);
        }
      };

      renderFrame();
    });
  }

  private clearCurrentGarment(): void {
    if (!this.garmentRoot) return;
    if (this.scene) {
      this.scene.remove(this.garmentRoot);
    }
    this.disposeObject3D(this.garmentRoot);
    this.garmentRoot = undefined;
    this.garmentMaterials = [];
  }

  private disposeMaterial(material: THREE.Material | THREE.Material[] | undefined): void {
    if (!material) return;
    const materials = Array.isArray(material) ? material : [material];
    for (const mat of materials) {
      if (!mat) continue;
      const matWithMaps = mat as THREE.MeshPhysicalMaterial;
      matWithMaps.map?.dispose();
      matWithMaps.normalMap?.dispose();
      matWithMaps.roughnessMap?.dispose();
      mat.dispose();
    }
  }

  private disposeObject3D(root?: THREE.Object3D): void {
    if (!root) return;

    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        this.disposeMaterial(obj.material);
      }
    });
  }
}