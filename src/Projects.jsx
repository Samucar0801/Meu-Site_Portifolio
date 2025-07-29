import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const projectData = [
  {
    id: "tcc",
    title: "TCC - Sistema de Agendamento Odontológico",
    description:
      "Plataforma completa para agendamento, desenvolvida em equipe. Integrei a autenticação social (Google, etc.) utilizando Firebase.",
    tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Firebase"],
  },
  {
    id: "djg",
    title: "Site Institucional - DJG Pinturas",
    description:
      "Desenvolvimento completo do site da empresa familiar, com design responsivo e otimizado.",
    tags: ["HTML", "CSS", "JS", "UI/UX", "Freelancer"],
  },
  {
    id: "fps",
    title: "Jogo FPS em Unreal Engine 5",
    description:
      "Desenvolvimento completo de um jogo de tiro em primeira pessoa, focando em mecânicas e IA.",
    tags: ["Unreal Engine 5", "Blueprints", "Game Design"],
  },
  {
    id: "roblox",
    title: "Projetos em Roblox Studio",
    description:
      "Meus primeiros passos no universo da programação, criando ambientes e jogos interativos.",
    tags: ["Roblox Studio", "Lua", "Primeiros Passos"],
  },
  {
    id: "sheriff",
    title: "Jogo 'Small Town Sheriff' (Projeto de Paixão)",
    description:
      "Meu projeto autoral. Um jogo de aventura e mistério onde o jogador, como xerife, resolve casos intrigantes.",
    tags: ["Unreal Engine 5", "Game Design", "Narrativa", "Solo Dev"],
  },
  {
    id: "gaia",
    title: "Projeto G.A.I.A. (Conceitual)",
    description:
      "Arquitetura de software para interação gamificada em lives, transformando espectadores em participantes. Basicamente um chat interativo com comandos e recompensas.",
    tags: ["Python", "Arquitetura", "Interatividade", "API"],
  },
];

export function Projects({ onNavigate, onCaseStudySelect }) {
  const groupRef = useRef();

  useFrame((state) => {
    const e = state.clock.getElapsedTime();
    if (groupRef.current) groupRef.current.position.y = Math.sin(e * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={[-4.5, 0, 0]}>
      <Html
        transform
        occlude={false}
        zIndexRange={[100, 0]}
        className="content-wrapper"
        position={[2.5, 2.2, 0]}
        rotation-y={0.15}
        distanceFactor={8}
      >
        <div className="content-card project-card-grid">
          <div className="card-header">
            <h2>As Constelações</h2>
            <p>
              Cada projeto é um universo. Uma história de um desafio, um
              processo e uma solução.
            </p>
          </div>
          <div className="project-grid-scrollable">
            <div className="project-grid">
              {projectData.map((p) => (
                <div
                  key={p.id}
                  className="project-item clickable-project"
                  onClick={() => onCaseStudySelect(p.id)}
                >
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="project-tags">
                    {p.tags.map((tag, j) => (
                      <span key={j} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="project-cta">
                    <span className="cta-text">Ver Estudo de Caso →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="navigation-buttons">
            <button
              onClick={() => onNavigate("sobre", "backToCodex")}
              className="back-button back-to-codex-btn"
            >
              &larr; Voltar para O Códice
            </button>
            <button
              onClick={() => onNavigate("habilidades", "viewSkills")}
              className="cta-button-inline view-skills-btn"
            >
              Ver Habilidades &rarr;
            </button>
          </div>
        </div>
      </Html>
    </group>
  );
}
