import React, { useEffect } from "react";

export function Cursor() {
  useEffect(() => {
    const cursorElement = document.createElement("div");
    cursorElement.className = "cosmic-cursor";

    const ringElement = document.createElement("div");
    ringElement.className = "cursor-ring";

    const particleCanvas = document.createElement("canvas");
    particleCanvas.id = "particleCanvas";

    const constellationCanvas = document.createElement("canvas");
    constellationCanvas.id = "constellationCanvas";

    document.body.appendChild(cursorElement);
    document.body.appendChild(ringElement);
    document.body.appendChild(particleCanvas);
    document.body.appendChild(constellationCanvas);

    class CosmicCursor {
      constructor() {
        this.cursor = cursorElement;
        this.ring = ringElement;
        this.particleCanvas = particleCanvas;
        this.constellationCanvas = constellationCanvas;

        this.mouse = { x: 0, y: 0 };
        this.particles = [];
        this.stars = [];
        this.lastConnectionTime = 0;
        this.connectionCooldown = 100; // ms entre sons

        this.init();
      }

      init() {
        this.setupCanvas();
        this.createStars();
        this.bindEvents();
        this.animate();
      }

      setupCanvas() {
        const resize = () => {
          this.particleCanvas.width = window.innerWidth;
          this.particleCanvas.height = window.innerHeight;
          this.constellationCanvas.width = window.innerWidth;
          this.constellationCanvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        this.particleCtx = this.particleCanvas.getContext("2d");
        this.constellationCtx = this.constellationCanvas.getContext("2d");
      }

      createStars() {
        const numStars = 150;
        for (let i = 0; i < numStars; i++) {
          this.stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            twinkle: Math.random() * 0.02 + 0.01,
          });
        }
      }

      // Som de conexão com estrelas (removido)
      playConnectionSound() {
        // Som removido conforme solicitado
      }

      bindEvents() {
        const handleMouseMove = (e) => {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;

          this.cursor.style.left = e.clientX + "px";
          this.cursor.style.top = e.clientY + "px";
          this.ring.style.left = e.clientX + "px";
          this.ring.style.top = e.clientY + "px";

          this.createTrailParticles();
        };

        document.addEventListener("mousemove", handleMouseMove);

        const addHover = () => {
          document.body.classList.add("cursor-hover");
          this.createBurstParticles();
        };
        const removeHover = () =>
          document.body.classList.remove("cursor-hover");

        const observer = new MutationObserver(() => {
          document
            .querySelectorAll('a, button, [role="button"], canvas')
            .forEach((el) => {
              el.removeEventListener("mouseenter", addHover);
              el.removeEventListener("mouseleave", removeHover);
              el.addEventListener("mouseenter", addHover);
              el.addEventListener("mouseleave", removeHover);
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });

        this.cleanup = () => {
          window.removeEventListener("resize", this.setupCanvas);
          document.removeEventListener("mousemove", handleMouseMove);
          observer.disconnect();
          document
            .querySelectorAll('a, button, [role="button"], canvas')
            .forEach((el) => {
              el.removeEventListener("mouseenter", addHover);
              el.removeEventListener("mouseleave", removeHover);
            });
        };
      }

      createTrailParticles() {
        const numParticles = 3;
        for (let i = 0; i < numParticles; i++) {
          this.particles.push({
            x: this.mouse.x + (Math.random() - 0.5) * 20,
            y: this.mouse.y + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            decay: 0.02 + Math.random() * 0.02,
            size: Math.random() * 4 + 2,
            color: `hsl(${180 + Math.random() * 60}, 100%, 70%)`,
          });
        }
      }

      createBurstParticles() {
        const numParticles = 15;
        for (let i = 0; i < numParticles; i++) {
          const angle = (Math.PI * 2 * i) / numParticles;
          const speed = 3 + Math.random() * 3;
          this.particles.push({
            x: this.mouse.x,
            y: this.mouse.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: 0.015,
            size: Math.random() * 3 + 1,
            color: `hsl(${300 + Math.random() * 60}, 100%, 70%)`,
          });
        }
      }

      updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= p.decay;
          p.vx *= 0.98;
          p.vy *= 0.98;
          if (p.life <= 0) this.particles.splice(i, 1);
        }
      }

      drawParticles() {
        this.particleCtx.clearRect(
          0,
          0,
          this.particleCanvas.width,
          this.particleCanvas.height
        );
        this.particles.forEach((p) => {
          this.particleCtx.save();
          this.particleCtx.globalAlpha = p.life;
          this.particleCtx.fillStyle = p.color;
          this.particleCtx.shadowBlur = 10;
          this.particleCtx.shadowColor = p.color;
          this.particleCtx.beginPath();
          this.particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.particleCtx.fill();
          this.particleCtx.restore();
        });
      }

      drawConstellations() {
        this.constellationCtx.clearRect(
          0,
          0,
          this.constellationCanvas.width,
          this.constellationCanvas.height
        );

        this.stars.forEach((star) => {
          star.opacity += (Math.random() - 0.5) * star.twinkle;
          star.opacity = Math.max(0.2, Math.min(1, star.opacity));
          this.constellationCtx.save();
          this.constellationCtx.globalAlpha = star.opacity;
          this.constellationCtx.fillStyle = "#ffffff";
          this.constellationCtx.shadowBlur = star.size * 2;
          this.constellationCtx.shadowColor = "#ffffff";
          this.constellationCtx.beginPath();
          this.constellationCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          this.constellationCtx.fill();
          this.constellationCtx.restore();
        });

        const connectionDistance = 100;
        this.constellationCtx.strokeStyle = "rgba(0, 255, 255, 0.3)";
        this.constellationCtx.lineWidth = 1;

        let hasConnections = false;

        this.stars.forEach((star) => {
          const distToCursor = Math.hypot(
            star.x - this.mouse.x,
            star.y - this.mouse.y
          );
          if (distToCursor < connectionDistance) {
            hasConnections = true;
            const opacity = 1 - distToCursor / connectionDistance;
            this.constellationCtx.save();
            this.constellationCtx.globalAlpha = opacity * 0.5;
            this.constellationCtx.beginPath();
            this.constellationCtx.moveTo(this.mouse.x, this.mouse.y);
            this.constellationCtx.lineTo(star.x, star.y);
            this.constellationCtx.stroke();
            this.constellationCtx.restore();
          }
        });

        // Som removido conforme solicitado
      }

      animate() {
        this.updateParticles();
        this.drawParticles();
        this.drawConstellations();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      }
    }

    const cursorInstance = new CosmicCursor();

    return () => {
      cursorInstance.cleanup();
      cancelAnimationFrame(cursorInstance.animationFrameId);
      document.body.removeChild(cursorElement);
      document.body.removeChild(ringElement);
      document.body.removeChild(particleCanvas);
      document.body.removeChild(constellationCanvas);
    };
  }, []);

  return null;
}
