import React, { useEffect, useRef, useState } from 'react';

interface RotatingModelProps {
  modelPath: string;
  language?: 'es' | 'en';
  className?: string;
  verticalOffset?: number;
  targetSize?: number;
  cameraDistanceMultiplier?: number;
  cameraHeightMultiplier?: number;
  yzPlaneRotation?: number;
  rotationOffsetX?: number;
  rotationOffsetY?: number;
  rotationOffsetZ?: number;
  interactive?: boolean;
  enableZoom?: boolean;
  autoRotate?: boolean;
  autoRotateAxis?: 'x' | 'y' | 'z';
  lazyLoad?: boolean;
}

const BASE_MODEL_ROTATION_X = Math.PI / 2;
const BASE_MODEL_ROTATION_Z = Math.PI;
const YZ_PLANE_FLIP_ROTATION = Math.PI;
const MODEL_VERTICAL_OFFSET = 32.5;
const CAMERA_DISTANCE_MULTIPLIER = 2.4;
const CAMERA_HEIGHT_MULTIPLIER = 0.28;

const RotatingModel: React.FC<RotatingModelProps> = ({
  modelPath,
  language = 'es',
  className = '',
  verticalOffset = MODEL_VERTICAL_OFFSET,
  targetSize = 105,
  cameraDistanceMultiplier = CAMERA_DISTANCE_MULTIPLIER,
  cameraHeightMultiplier = CAMERA_HEIGHT_MULTIPLIER,
  yzPlaneRotation = YZ_PLANE_FLIP_ROTATION,
  rotationOffsetX = 0,
  rotationOffsetY = 0,
  rotationOffsetZ = 0,
  interactive = false,
  enableZoom = true,
  autoRotate = true,
  autoRotateAxis = 'z',
  lazyLoad = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const copy =
    language === 'es'
      ? {
          interactiveHint: enableZoom ? 'Arrastra / Zoom' : 'Arrastra',
          idle: 'Modelo 3D en espera...',
          loading: 'Cargando modelo 3D...',
          error: 'No se pudo cargar el modelo 3D.',
        }
      : {
          interactiveHint: enableZoom ? 'Drag / Zoom' : 'Drag',
          idle: '3D model on standby...',
          loading: 'Loading 3D model...',
          error: 'Unable to load the 3D model.',
        };

  useEffect(() => {
    if (!lazyLoad) {
      return;
    }

    const container = containerRef.current;
    if (!container || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [lazyLoad, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    let isDisposed = false;
    let frameId = 0;
    let renderer: any;
    let scene: any;
    let controls: any;
    let cleanupResize: (() => void) | null = null;
    let modelMesh: any;
    let camera: any;

    setStatus('loading');
    const correctedRotationX = BASE_MODEL_ROTATION_X + yzPlaneRotation + rotationOffsetX;
    const correctedRotationY = rotationOffsetY;
    const correctedRotationZ = BASE_MODEL_ROTATION_Z + rotationOffsetZ;

    const initScene = async () => {
      try {
        const THREE = await import('three');
        const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');

        if (isDisposed || !container) {
          return;
        }

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x050505, 120, 260);

        camera = new THREE.PerspectiveCamera(34, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 35, 120);
        camera.lookAt(0, verticalOffset, 0);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        if (interactive) {
          const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
          controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.06;
          controls.enableZoom = enableZoom;
          controls.rotateSpeed = 0.8;
          controls.zoomSpeed = 0.9;
          controls.panSpeed = 0.7;
          controls.minDistance = 55;
          controls.maxDistance = 210;
          controls.target.set(0, verticalOffset, 0);
          controls.update();
        }

        const ambient = new THREE.AmbientLight(0x88aacc, 0.45);
        scene.add(ambient);

        const keyLight = new THREE.DirectionalLight(0x00d9ff, 1.1);
        keyLight.position.set(35, 45, 40);
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0xffffff, 0.45);
        rimLight.position.set(-20, 25, -35);
        scene.add(rimLight);

        const group = new THREE.Group();
        scene.add(group);

        const pedestalGeometry = new THREE.CylinderGeometry(42, 55, 4, 64, 1, true);
        const pedestalMaterial = new THREE.MeshBasicMaterial({
          color: 0x00bcd4,
          transparent: true,
          opacity: 0.14,
          side: THREE.DoubleSide,
        });
        const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
        pedestal.position.y = -28;
        group.add(pedestal);

        const renderFrame = () => {
          if (!renderer || !scene || !camera) {
            return;
          }

          renderer.render(scene, camera);
        };

        const loader = new STLLoader();
        loader.load(
          modelPath,
          (geometry: any) => {
            if (isDisposed) {
              geometry.dispose();
              return;
            }

            geometry.computeVertexNormals();
            geometry.center();

            const material = new THREE.MeshPhysicalMaterial({
              color: 0xb8f2ff,
              metalness: 0.82,
              roughness: 0.18,
              clearcoat: 1,
              clearcoatRoughness: 0.1,
              envMapIntensity: 1.2,
            });

            modelMesh = new THREE.Mesh(geometry, material);
            const bounds = new THREE.Box3().setFromObject(modelMesh);
            const size = bounds.getSize(new THREE.Vector3()).length();
            const scale = targetSize / Math.max(size, 1);
            modelMesh.scale.setScalar(scale);
            modelMesh.position.y = verticalOffset;
            modelMesh.rotation.set(correctedRotationX, correctedRotationY, correctedRotationZ);
            group.add(modelMesh);

            // Fit camera and controls to the model's final transformed bounds.
            const fittedBounds = new THREE.Box3().setFromObject(modelMesh);
            const fittedCenter = fittedBounds.getCenter(new THREE.Vector3());
            const fittedRadius = Math.max(fittedBounds.getSize(new THREE.Vector3()).length() * 0.5, 1);
            const fittedDistance = Math.max(fittedRadius * cameraDistanceMultiplier, 90);

            camera.position.set(
              fittedCenter.x,
              fittedCenter.y + fittedRadius * cameraHeightMultiplier,
              fittedCenter.z + fittedDistance,
            );
            camera.lookAt(fittedCenter);

            if (controls) {
              controls.target.copy(fittedCenter);
              controls.minDistance = Math.max(fittedRadius * 0.9, 45);
              controls.maxDistance = Math.max(fittedRadius * 4.8, 240);
              controls.update();
            }

            setStatus('ready');

            if (!interactive && !autoRotate) {
              renderFrame();
            }
          },
          undefined,
          () => {
            if (!isDisposed) {
              setStatus('error');
            }
          },
        );

        const onResize = () => {
          if (!container || !renderer) {
            return;
          }

          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          renderFrame();
        };

        window.addEventListener('resize', onResize);
        cleanupResize = () => window.removeEventListener('resize', onResize);

        const animate = () => {
          frameId = window.requestAnimationFrame(animate);

          if (modelMesh) {
            const nextRotationX =
              autoRotate && autoRotateAxis === 'x' ? modelMesh.rotation.x - 0.006 : correctedRotationX;
            const nextRotationY =
              autoRotate && autoRotateAxis === 'y' ? modelMesh.rotation.y - 0.006 : correctedRotationY;
            const nextRotationZ =
              autoRotate && autoRotateAxis === 'z' ? modelMesh.rotation.z - 0.006 : correctedRotationZ;

            modelMesh.rotation.set(nextRotationX, nextRotationY, nextRotationZ);
          }

          controls?.update();
          pedestal.rotation.y -= 0.004;
          renderFrame();
        };

        if (interactive || autoRotate) {
          animate();
        }
      } catch {
        if (!isDisposed) {
          setStatus('error');
        }
      }
    };

    initScene();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(frameId);
      cleanupResize?.();

      if (scene) {
        scene.traverse((obj: any) => {
          if (obj.geometry) {
            obj.geometry.dispose?.();
          }

          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((material: any) => material.dispose?.());
            } else {
              obj.material.dispose?.();
            }
          }
        });
      }

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
      controls?.dispose?.();
    };
  }, [
    autoRotate,
    autoRotateAxis,
    cameraDistanceMultiplier,
    cameraHeightMultiplier,
    interactive,
    modelPath,
    rotationOffsetX,
    rotationOffsetY,
    rotationOffsetZ,
    shouldLoad,
    targetSize,
    verticalOffset,
    enableZoom,
    yzPlaneRotation,
  ]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      {status === 'ready' && interactive ? (
        <div className="absolute bottom-3 left-3 rounded border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-gray-200 pointer-events-none">
          {copy.interactiveHint}
        </div>
      ) : null}
      {status !== 'ready' ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/45 border border-white/10 text-sm text-gray-300 backdrop-blur-sm">
          {!shouldLoad ? copy.idle : status === 'loading' ? copy.loading : copy.error}
        </div>
      ) : null}
    </div>
  );
};

export default RotatingModel;
