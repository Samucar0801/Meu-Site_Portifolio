import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

const TARGET_INFO = {
  hero: { pos: [0, 0, 6], target: [0, 0, 0] },
  sobre: { pos: [1.5, 0.5, 5.5], target: [2, 0, 0] },
  projetos: { pos: [-2, 1, 7.5], target: [-2, 1, 0] },
  habilidades: { pos: [0, 2, 9], target: [0, 0, 0] },
  "case-study": { pos: [0.5, 0, 3.5], target: [0, 0, 0] }, // Atualizado
};

export function CameraManager({ view, focusRef }) {
  const controlsRef = useRef();
  const { camera } = useThree();

  // Usamos useEffect para disparar a animação APENAS quando a view ou o foco mudam
  useEffect(() => {
    if (!controlsRef.current) return;

    let targetPosition = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3();

    if (view === "habilidades") {
      if (focusRef && focusRef.current) {
        const offset = new THREE.Vector3(0, 0.5, 4); // Aumentei a distância do foco
        targetPosition.copy(focusRef.current.position).add(offset);
        targetLookAt.copy(focusRef.current.position);
      } else {
        targetPosition.fromArray(TARGET_INFO.habilidades.pos);
        targetLookAt.fromArray(TARGET_INFO.habilidades.target);
      }
    } else {
      targetPosition.fromArray(TARGET_INFO[view].pos);
      targetLookAt.fromArray(TARGET_INFO[view].target);
    }

    // Usamos GSAP para uma animação "fire-and-forget"
    gsap.to(camera.position, {
      duration: 1.5,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      ease: "power3.inOut",
    });

    gsap.to(controlsRef.current.target, {
      duration: 1.5,
      x: targetLookAt.x,
      y: targetLookAt.y,
      z: targetLookAt.z,
      ease: "power3.inOut",
    });
  }, [view, focusRef, camera]); // A animação só roda quando estes valores mudam

  // O useFrame agora só precisa atualizar os controles, sem forçar a posição
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      minDistance={2}
      maxDistance={20}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.5}
      enablePan={false}
      enableZoom={true}
      enableDamping={true}
      dampingFactor={0.05}
    />
  );
}
