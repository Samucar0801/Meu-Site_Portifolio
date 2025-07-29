import { Html } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Content({ onNavigate }) {
  const groupRef = useRef();

  useFrame((state) => {
    const e = state.clock.getElapsedTime();
    if (groupRef.current) groupRef.current.position.y = Math.sin(e) * 0.1;
  });

  return (
    <group ref={groupRef} position={[4.5, 0, 0]}>
      <Html
        transform
        occlude={false}
        zIndexRange={[100, 0]}
        className="content-wrapper"
        position={[-2.5, 1.6, 0]}
        rotation-y={-0.15}
        distanceFactor={8}
      >
        <div className="content-card">
          <h2>O Códice</h2>
          <h3>
            Desenvolvedor com foco em tecnologias modernas e criação de jogos
            digitais.
          </h3>
          <p>
            Minha jornada na tecnologia é uma busca por dar forma aos mundos que
            habitam minha mente. Comecei na vastidão da{" "}
            <strong>Unreal Engine 5</strong>, onde a lógica era visual e
            intuitiva. Hoje, exploro o universo abstrato do código em{" "}
            <strong>Python, JavaScript, HTML/CSS</strong> e por ai vai!.
          </p>
          <div className="navigation-buttons">
            <button
              onClick={() => onNavigate("hero", "backToUniverse")}
              className="back-button back-to-universe-btn"
            >
              Voltar ao Universo
            </button>
            <button
              onClick={() => onNavigate("projetos", "viewProjects")}
              className="cta-button-inline view-projects-btn"
            >
              Ver Projetos &rarr;
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
