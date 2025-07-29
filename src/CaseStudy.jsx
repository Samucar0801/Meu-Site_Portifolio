import { Html } from "@react-three/drei";
import { useRef } from "react";
import { HologramProjector } from "./HologramProjector";

const caseStudyData = {
  tcc: {
    title: "Sistema de Agendamento Odontológico",
    subtitle: "Plataforma Completa para Clínicas",
    imageUrl: "/imgs/teste - Copia.png",
    role: "Desenvolvedor Full-Stack & Integração Firebase",
    duration: "6 meses",
    team: "4 desenvolvedores",
    challenge:
      "Desenvolver uma solução completa de agendamento para clínicas odontológicas, integrando múltiplas formas de autenticação e garantindo uma experiência fluida tanto para pacientes quanto para profissionais.",
    process: [
      "Análise de requisitos com clínicas parceiras",
      "Modelagem do banco de dados MySQL",
      "Desenvolvimento da interface em HTML/CSS/JavaScript",
      "Implementação do backend em PHP",
      "Integração Firebase para autenticação social",
      "Testes de usabilidade e refinamentos",
    ],
    solution:
      "Plataforma web responsiva que permite agendamentos online, gestão de horários, integração com Google Calendar e autenticação via redes sociais. O sistema reduziu o tempo de agendamento em 60% e eliminou conflitos de horários.",
    results: [
      "Redução de 60% no tempo de agendamento",
      "100% de eliminação de conflitos de horários",
      "Interface intuitiva aprovada por 95% dos usuários testados",
      "Integração bem-sucedida com 3 clínicas piloto",
    ],
    lessons:
      "Aprendi a importância da comunicação constante com stakeholders e como a integração de APIs externas (Firebase) pode elevar significativamente a experiência do usuário.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "Firebase",
      "Google APIs",
    ],
  },
  djg: {
    title: "Site Institucional - DJG Pinturas",
    subtitle: "Presença Digital para Empresa Familiar",
    imageUrl: "./imgs/teste - Copia (2).png",
    role: "Desenvolvedor Full-Stack & Designer",
    duration: "2 meses",
    team: "Solo (Freelancer)",
    challenge:
      "Criar uma presença digital profissional para a empresa familiar, transmitindo confiança e qualidade dos serviços, com orçamento limitado e prazos apertados.",
    process: [
      "Entrevistas com stakeholders familiares",
      "Pesquisa de concorrência no setor",
      "Criação de wireframes e protótipos",
      "Design visual focado em profissionalismo",
      "Desenvolvimento responsivo",
      "Otimização SEO e performance",
    ],
    solution:
      "Website responsivo e otimizado que destaca a experiência da empresa, galeria de projetos realizados, formulário de contato integrado e informações claras sobre serviços.",
    results: [
      "Aumento de 200% em consultas online",
      "Melhoria na percepção de profissionalismo",
      "100% responsivo em todos os dispositivos",
      "Carregamento em menos de 3 segundos",
    ],
    lessons:
      "Trabalhando com família, aprendi sobre gestão de expectativas e como traduzir necessidades emocionais em soluções técnicas objetivas.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Design Responsivo",
      "SEO",
      "UI/UX",
    ],
  },
  fps: {
    title: "Jogo FPS em Unreal Engine 5",
    subtitle: "Experiência Completa de Tiro em Primeira Pessoa",
    imageUrl: "/imgs/teste - Copia (3).png",
    role: "Game Developer & Designer",
    duration: "8 meses",
    team: "Solo",
    challenge:
      "Criar um jogo FPS completo e polido, implementando mecânicas avançadas de combate, IA inteligente e level design envolvente usando apenas Blueprints.",
    process: [
      "Conceptualização e game design document",
      "Prototipagem das mecânicas core",
      "Implementação do sistema de armas",
      "Desenvolvimento de IA inimiga",
      "Level design e ambiente 3D",
      "Balanceamento e polish final",
    ],
    solution:
      "Jogo FPS completo com múltiplas armas, diferentes tipos de inimigos com IA comportamental, sistema de progressão e 5 níveis únicos com ambientação cyberpunk.",
    results: [
      "Sistema de combate fluido e responsivo",
      "IA inimiga com 4 comportamentos distintos",
      "5 níveis completos e jogáveis",
      "Sistema de armas com 6 tipos diferentes",
      "Performance otimizada (60fps estáveis)",
    ],
    lessons:
      "Aprendi sobre a importância do playtesting constante e como pequenos ajustes em game feel podem transformar completamente a experiência do jogador.",
    technologies: [
      "Unreal Engine 5",
      "Blueprints",
      "Level Design",
      "Game Design",
      "3D Modeling",
    ],
  },
  roblox: {
    title: "Projetos em Roblox Studio",
    subtitle: "Primeiros Passos na Programação",
    imageUrl: "/imgs/teste - Copia (4).png",
    role: "Creator & Scripter Iniciante",
    duration: "1 ano",
    team: "Solo",
    challenge:
      "Aprender os fundamentos da programação e criação de jogos através da plataforma Roblox, desenvolvendo projetos que engajassem outros jogadores.",
    process: [
      "Aprendizado básico de Lua",
      "Experimentação com ferramentas do Studio",
      "Criação de mecânicas simples",
      "Testes com a comunidade",
      "Iteração baseada em feedback",
      "Exploração de diferentes gêneros de jogos",
    ],
    solution:
      "Diversos jogos e experiências interativas que serviram como campo de aprendizado, incluindo simuladores, obbys e jogos de aventura simples.",
    results: [
      "Domínio básico da linguagem Lua",
      "Compreensão de game loops e mecânicas",
      "Primeiros contatos com comunidade de desenvolvedores",
      "Base sólida para projetos futuros",
    ],
    lessons:
      "Descobri minha paixão por programação e game design. Aprendi que a simplicidade muitas vezes é mais eficaz que a complexidade.",
    technologies: [
      "Roblox Studio",
      "Lua",
      "Game Design Básico",
      "3D Modeling Básico",
    ],
  },
  sheriff: {
    title: "Jogo 'Small Town Sheriff'",
    subtitle: "Projeto de Paixão - Aventura e Mistério",
    imageUrl: "/imgs/teste - Copia (5).png",
    role: "Solo Developer & Narrative Designer",
    duration: "Em desenvolvimento",
    team: "Solo",
    challenge:
      "Criar uma experiência narrativa envolvente onde o jogador assume o papel de um xerife investigando mistérios em uma pequena cidade, balanceando elementos de investigação com action.",
    process: [
      "Desenvolvimento do conceito e lore",
      "Criação de sistema de investigação",
      "Design de personagens e diálogos",
      "Implementação de mecânicas de combate",
      "Level design da cidade",
      "Sistema de escolhas e consequências",
    ],
    solution:
      "Jogo de aventura em terceira pessoa com elementos de mistério, onde cada caso resolvido revela mais sobre uma conspiração maior na cidade.",
    results: [
      "Sistema de investigação funcional",
      "Narrativa ramificada implementada",
      "3 casos principais desenvolvidos",
      "Cidade aberta para exploração",
      "Sistema de reputação dinâmico",
    ],
    lessons:
      "Aprendi sobre a complexidade de criar narrativas interativas e como balancear liberdade do jogador com direcionamento da história.",
    technologies: [
      "Unreal Engine 5",
      "Blueprints",
      "Narrative Design",
      "Quest System",
      "AI Behavior",
    ],
  },
  gaia: {
    title: "Projeto G.A.I.A.",
    subtitle: "Arquitetura de Interação Gamificada",
    imageUrl: "/imgs/teste - Copia (6).png",
    role: "Arquiteto de Software & Concept Designer",
    duration: "3 meses (Conceitual)",
    team: "Solo",
    challenge:
      "Projetar uma arquitetura de software que transforme espectadores passivos de streams em participantes ativos através de comandos gamificados e sistema de recompensas.",
    process: [
      "Pesquisa de APIs de streaming",
      "Modelagem de sistema de comandos",
      "Design de economia virtual",
      "Prototipagem de interações",
      "Documentação técnica",
      "Planejamento de escalabilidade",
    ],
    solution:
      "Sistema modular que integra chat de streams com mecânicas de jogo, permitindo que viewers influenciem o conteúdo através de comandos, apostas e mini-games.",
    results: [
      "Arquitetura completa documentada",
      "Protótipo funcional de comandos básicos",
      "Sistema de economia balanceado",
      "API de integração projetada",
    ],
    lessons:
      "Compreendi a importância do planejamento arquitetural e como sistemas complexos requerem modularidade para serem sustentáveis.",
    technologies: [
      "Python",
      "API Design",
      "Database Architecture",
      "Real-time Systems",
      "Gamification",
    ],
  },
};

export function CaseStudy({ projectId, onClose }) {
  const groupRef = useRef();
  const project = caseStudyData[projectId];

  if (!project) {
    return null;
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Html
        transform
        occlude={false}
        zIndexRange={[100, 0]}
        className="content-wrapper"
        position={[0, 0, 0]}
        distanceFactor={6}
      >
        <div className="case-study-container">
          <div className="case-study-header">
            <button onClick={onClose} className="close-case-study">
              ← Voltar aos Projetos
            </button>
            <div className="project-meta">
              <h1>{project.title}</h1>
              <h2>{project.subtitle}</h2>
              <div className="project-details">
                <span>
                  <strong>Papel:</strong> {project.role}
                </span>
                <span>
                  <strong>Duração:</strong> {project.duration}
                </span>
                <span>
                  <strong>Equipe:</strong> {project.team}
                </span>
              </div>
            </div>
          </div>

          <div className="case-study-content">
            <section className="project-showcase">
              <HologramProjector
                imageUrl={project.imageUrl}
                projectId={projectId}
                isVisible={true}
              />
            </section>

            <section className="challenge-section">
              <h3>🎯 O Desafio</h3>
              <p>{project.challenge}</p>
            </section>
            <section className="process-section">
              <h3>⚙️ O Processo</h3>
              <ol>
                {project.process.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </section>
            <section className="solution-section">
              <h3>💡 A Solução</h3>
              <p>{project.solution}</p>
            </section>
            <section className="results-section">
              <h3>📊 Resultados</h3>
              <ul>
                {project.results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
            </section>
            <section className="lessons-section">
              <h3>🎓 Lições Aprendidas</h3>
              <p>{project.lessons}</p>
            </section>
            <section className="tech-section">
              <h3>🛠️ Tecnologias Utilizadas</h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Html>
    </group>
  );
}
