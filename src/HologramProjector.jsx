import { useRef, useState, useEffect } from "react";

export function HologramProjector({ imageUrl, projectId, isVisible = true }) {
  const containerRef = useRef();
  const hologramRef = useRef();
  const [isTransforming, setIsTransforming] = useState(false);
  const [fragmentsActive, setFragmentsActive] = useState(false);
  const particlesRef = useRef();

  // Sons específicos para cada projeto
  const projectSounds = {
    tcc: () => playHologramSound("medical"),
    djg: () => playHologramSound("corporate"),
    fps: () => playHologramSound("gaming"),
    roblox: () => playHologramSound("creative"),
    sheriff: () => playHologramSound("mystery"),
    gaia: () => playHologramSound("ai"),
  };

  // Sistema de som para holograma
  const playHologramSound = (type) => {
    if (!window.soundManager) return;

    const audioContext = window.soundManager.audioContext;

    switch (type) {
      case "medical":
        createMedicalSound(audioContext);
        break;
      case "corporate":
        createCorporateSound(audioContext);
        break;
      case "gaming":
        createGamingSound(audioContext);
        break;
      case "creative":
        createCreativeSound(audioContext);
        break;
      case "mystery":
        createMysterySound(audioContext);
        break;
      case "ai":
        createAISound(audioContext);
        break;
      default:
        createDefaultHologramSound(audioContext);
    }
  };

  // Sons únicos para cada tipo de projeto
  const createMedicalSound = (ctx) => {
    [440, 550, 660].forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.type = "sine";
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1200, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }, i * 200);
    });
  };

  const createGamingSound = (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3);
    osc.type = "square";

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  };

  const createMysterySound = (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.2);
    osc.type = "triangle";

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.Q.setValueAtTime(8, ctx.currentTime);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  };

  const createAISound = (ctx) => {
    [220, 330, 440, 550, 660].forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.type = "sawtooth";

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }, i * 50);
    });
  };

  const createCorporateSound = (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(350, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.6);
    osc.type = "triangle";

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  };

  const createCreativeSound = (ctx) => {
    [330, 415, 495, 550].forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.type = "sine";

        filter.type = "highpass";
        filter.frequency.setValueAtTime(200, ctx.currentTime);

        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      }, i * 120);
    });
  };

  const createDefaultHologramSound = (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
    osc.type = "sine";

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  };

  // Animação contínua do holograma usando requestAnimationFrame
  useEffect(() => {
    if (!isVisible) return;

    let animationId;
    const animate = () => {
      const time = Date.now() * 0.001;

      if (hologramRef.current) {
        // Flutuação suave
        hologramRef.current.style.transform = `
          translateY(${Math.sin(time * 2) * 3}px) 
          rotateY(${Math.sin(time * 0.5) * 2}deg)
          scale(${1 + Math.sin(time * 3) * 0.02})
        `;

        // Efeito de distorção holográfica
        if (!isTransforming) {
          hologramRef.current.style.filter = `
            hue-rotate(${Math.sin(time) * 10}deg)
            brightness(${1 + Math.sin(time * 2) * 0.1})
            contrast(${1.1 + Math.sin(time * 1.5) * 0.1})
          `;
        }
      }

      // Animação das partículas orbitais
      if (particlesRef.current && !isTransforming) {
        particlesRef.current.style.transform = `rotate(${time * 30}deg)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible, isTransforming]);

  // Efeito de fragmentação
  const handleHologramClick = () => {
    if (isTransforming) return;

    setIsTransforming(true);
    setFragmentsActive(true);

    // Tocar som específico do projeto
    if (projectSounds[projectId]) {
      projectSounds[projectId]();
    }

    // Resetar após animação
    setTimeout(() => {
      setFragmentsActive(false);
      setTimeout(() => {
        setIsTransforming(false);
      }, 500);
    }, 1500);
  };

  if (!isVisible) return null;

  return (
    <div className="hologram-projector-container">
      {/* Base do projetor */}
      <div className="projector-base">
        <div className="projector-ring"></div>
        <div className="projector-core"></div>
      </div>

      {/* Partículas orbitais */}
      <div ref={particlesRef} className="orbital-particles">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              transform: `rotate(${i * 45}deg) translateX(120px)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Holograma da imagem */}
      <div
        ref={hologramRef}
        className={`hologram-image ${isTransforming ? "transforming" : ""} ${
          fragmentsActive ? "fragments-active" : ""
        }`}
        onClick={handleHologramClick}
      >
        <div className="hologram-content">
          <img src={imageUrl} alt="Project Preview" />

          {/* Efeitos de scan */}
          <div className="scan-lines"></div>
          <div className="hologram-overlay"></div>

          {/* Fragmentos para efeito de quebra */}
          {fragmentsActive && (
            <div className="image-fragments">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="fragment"
                  style={{
                    left: `${(i % 4) * 25}%`,
                    top: `${Math.floor(i / 4) * 25}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Texto de interação */}
        <div className="interaction-hint">
          <span>CLIQUE PARA ANALISAR</span>
        </div>
      </div>

      {/* Feixes de luz do projetor */}
      <div className="light-beams">
        <div className="beam beam-1"></div>
        <div className="beam beam-2"></div>
        <div className="beam beam-3"></div>
      </div>
    </div>
  );
}
