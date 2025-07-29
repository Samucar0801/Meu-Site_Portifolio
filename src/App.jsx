import { Canvas } from "@react-three/fiber";
import { Nucleus } from "./Nucleus";
import { Content } from "./Content";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { CameraManager } from "./CameraManager";
import { useState, useEffect } from "react";
import { Cursor } from "./Cursor";
import { CaseStudy } from "./CaseStudy";

// Sistema de Sons Expandido
class SoundManager {
  constructor() {
    this.sounds = {};
    this.init();
  }

  init() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Sons originais
    this.createTypingSound();
    this.createGlitchSound();
    this.createOrbitSound();
    this.createZoomInSound();
    this.createZoomOutSound();

    // Novos sons para navegação
    this.createExploreUniverseSound();
    this.createBackToUniverseSound();
    this.createViewProjectsSound();
    this.createBackToCodexSound();
    this.createViewSkillsSound();
    this.createBackToProjectsSound();

    // Sons para as esferas de habilidades
    this.createLanguagesDBSound();
    this.createEnginesFrameworksSound();
    this.createToolsDesignSound();
    this.createSphereRollingSound();
  }

  // Sons originais (mantidos)
  createTypingSound() {
    this.sounds.typing = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(
        800 + Math.random() * 200,
        this.audioContext.currentTime
      );
      oscillator.type = "square";

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.1
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.1);
    };
  }

  createGlitchSound() {
    this.sounds.glitch = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        600,
        this.audioContext.currentTime + 0.2
      );
      oscillator.type = "sawtooth";

      filter.frequency.setValueAtTime(1000, this.audioContext.currentTime);
      filter.Q.setValueAtTime(10, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.3
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.3);
    };
  }

  createOrbitSound() {
    this.sounds.orbit = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime);
      oscillator.type = "sine";

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.5
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.5);
    };
  }

  createZoomInSound() {
    this.sounds.zoomIn = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        600,
        this.audioContext.currentTime + 0.4
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.4);
    };
  }

  createZoomOutSound() {
    this.sounds.zoomOut = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        300,
        this.audioContext.currentTime + 0.4
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.4);
    };
  }

  // NOVOS SONS PARA NAVEGAÇÃO

  createExploreUniverseSound() {
    // Som épico de "explorando o universo" - acordes ascendentes
    this.sounds.exploreUniverse = () => {
      const frequencies = [200, 300, 450, 600, 800]; // Acorde ascendente

      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          const filter = this.audioContext.createBiquadFilter();

          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(this.audioContext.destination);

          oscillator.frequency.setValueAtTime(
            freq,
            this.audioContext.currentTime
          );
          oscillator.type = "triangle";

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);

          gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            this.audioContext.currentTime + 0.8
          );

          oscillator.start();
          oscillator.stop(this.audioContext.currentTime + 0.8);
        }, index * 80);
      });
    };
  }

  createBackToUniverseSound() {
    // Som de retorno suave - descendente
    this.sounds.backToUniverse = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(500, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        250,
        this.audioContext.currentTime + 0.6
      );
      oscillator.type = "sine";

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.6
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.6);
    };
  }

  createViewProjectsSound() {
    // Som de transição criativa - modulação
    this.sounds.viewProjects = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(350, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(
        450,
        this.audioContext.currentTime + 0.2
      );
      oscillator.frequency.setValueAtTime(
        380,
        this.audioContext.currentTime + 0.4
      );
      oscillator.type = "square";

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1200, this.audioContext.currentTime);
      filter.Q.setValueAtTime(5, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.5
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.5);
    };
  }

  createBackToCodexSound() {
    // Som de retorno ao códice - misterioso
    this.sounds.backToCodex = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(180, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        320,
        this.audioContext.currentTime + 0.4
      );
      oscillator.type = "sawtooth";

      gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.4);
    };
  }

  createViewSkillsSound() {
    // Som cósmico para constelação de habilidades - múltiplas ondas
    this.sounds.viewSkills = () => {
      [400, 600, 800].forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          const filter = this.audioContext.createBiquadFilter();

          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(this.audioContext.destination);

          oscillator.frequency.setValueAtTime(
            freq,
            this.audioContext.currentTime
          );
          oscillator.type = "triangle";

          filter.type = "highpass";
          filter.frequency.setValueAtTime(200, this.audioContext.currentTime);

          gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            this.audioContext.currentTime + 1.2
          );

          oscillator.start();
          oscillator.stop(this.audioContext.currentTime + 1.2);
        }, index * 150);
      });
    };
  }

  createBackToProjectsSound() {
    // Som de retorno aos projetos
    this.sounds.backToProjects = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(420, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        280,
        this.audioContext.currentTime + 0.5
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.5
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.5);
    };
  }

  // SONS PARA AS ESFERAS DE HABILIDADES

  createLanguagesDBSound() {
    // Som técnico para linguagens e banco de dados
    this.sounds.languagesDB = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(260, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        440,
        this.audioContext.currentTime + 0.3
      );
      oscillator.type = "square";

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1500, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.4
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.4);
    };
  }

  createEnginesFrameworksSound() {
    // Som poderoso para engines e frameworks
    this.sounds.enginesFrameworks = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(180, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        360,
        this.audioContext.currentTime + 0.5
      );
      oscillator.type = "sawtooth";

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
      filter.Q.setValueAtTime(3, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.12, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.6
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.6);
    };
  }

  createToolsDesignSound() {
    // Som criativo para ferramentas e design
    this.sounds.toolsDesign = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(330, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(
        500,
        this.audioContext.currentTime + 0.15
      );
      oscillator.frequency.setValueAtTime(
        400,
        this.audioContext.currentTime + 0.3
      );
      oscillator.type = "triangle";

      filter.type = "highpass";
      filter.frequency.setValueAtTime(300, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.5
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.5);
    };
  }

  createSphereRollingSound() {
    // Som contínuo de rolagem da esfera grande
    this.sounds.sphereRolling = () => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(120, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(
        140,
        this.audioContext.currentTime + 0.2
      );
      oscillator.frequency.setValueAtTime(
        120,
        this.audioContext.currentTime + 0.4
      );
      oscillator.type = "sine";

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(300, this.audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.06, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.6
      );

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.6);
    };
  }

  play(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }
}

// Instância global do gerenciador de som
let soundManager = null;

function Typewriter() {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!soundManager) {
      soundManager = new SoundManager();
    }

    let i = 0;
    const fullText = "Criador de mundos. Intenso por natureza.";

    const id = setInterval(() => {
      if (i >= fullText.length) {
        return clearInterval(id);
      }

      setText(fullText.slice(0, i + 1));

      if (soundManager) {
        soundManager.play("typing");
      }

      i++;
    }, 80);

    return () => clearInterval(id);
  }, []);

  return <p id="typewriter">{text}</p>;
}

export default function App() {
  const [view, setView] = useState("hero");
  const [focusRef, setFocusRef] = useState(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  useEffect(() => {
    if (!soundManager) {
      soundManager = new SoundManager();
    }

    window.soundManager = soundManager;
  }, []);

  const handleNavigate = (targetView, soundName) => {
    // Tocar som específico baseado na navegação
    if (soundManager && soundName) {
      soundManager.play(soundName);
    }

    // Adicionar classe de animação ao body
    document.body.classList.add(`transitioning-to-${targetView}`);

    setTimeout(() => {
      document.body.classList.remove(`transitioning-to-${targetView}`);
    }, 1500);

    setView(targetView);
    if (targetView !== "habilidades") {
      setFocusRef(null);
    }
  };

  const handleNameHover = () => {
    if (soundManager) {
      soundManager.play("glitch");
    }
  };

  const handleCaseStudySelect = (projectId) => {
    if (soundManager) {
      soundManager.play("zoomIn");
    }
    document.body.classList.add("transitioning-to-case-study");
    setTimeout(() => {
      document.body.classList.remove("transitioning-to-case-study");
    }, 1500);
    setActiveCaseStudy(projectId);
    setView("case-study");
  };

  const handleCloseCaseStudy = () => {
    if (soundManager) {
      soundManager.play("backToProjects");
    }
    setActiveCaseStudy(null);
    setView("projetos");
  };

  return (
    <>
      <Cursor />
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[4, 5, 5]} intensity={1.5} color="#00aaff" />
        <Nucleus />
        {view === "sobre" && <Content onNavigate={handleNavigate} />}
        {view === "projetos" && (
          <Projects
            onNavigate={handleNavigate}
            onCaseStudySelect={handleCaseStudySelect}
          />
        )}
        {view === "habilidades" && (
          <Skills onNavigate={handleNavigate} setFocus={setFocusRef} />
        )}
        {view === "case-study" && activeCaseStudy && (
          <CaseStudy
            projectId={activeCaseStudy}
            onClose={handleCloseCaseStudy}
          />
        )}
        <CameraManager view={view} focusRef={focusRef} />
      </Canvas>
      <div className={`ui-container ${view !== "hero" ? "hidden" : ""}`}>
        <h1
          className="glitch"
          data-text="Samuel Rodrigues Silva"
          onMouseEnter={handleNameHover}
          style={{ cursor: "pointer" }}
        >
          Samuel Rodrigues Silva
        </h1>
        <Typewriter />
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate("sobre", "exploreUniverse");
          }}
          className="cta-button explore-universe-btn"
        >
          Explorar Universo
        </a>
      </div>
    </>
  );
}
