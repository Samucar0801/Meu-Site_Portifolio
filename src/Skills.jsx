import {
  Html,
  Sphere,
  Line,
  useTexture,
  Billboard,
  Plane,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo, Suspense } from "react";
import * as THREE from "three";

const skillsData = {
  "Linguagens & DB": [
    { name: "Python", logo: "/logos/python.png" },
    { name: "JavaScript", logo: "/logos/javascript.png" },
    { name: "MySQL", logo: "/logos/mysql.png" },
    { name: "HTML/CSS", logo: "/logos/html.png" },
    { name: "PHP", logo: "/logos/php.png" },
    { name: "Kotlin", logo: "/logos/kotlin.png" },
    { name: "Lua", logo: "/logos/lua.png" },
    { name: "MongoDB", logo: "/logos/mongodb.png" },
    { name: "Firebase", logo: "/logos/firebase.png" },
  ],
  "Engines & Frameworks": [
    { name: "Unreal Engine 5", logo: "/logos/unreal.png" },
    { name: "React", logo: "/logos/react.png" },
    { name: "Node.js", logo: "/logos/nodejs.png" },
    { name: "Pacote Microsoft Office", logo: "/logos/office.png" },
    { name: "Bootstrap", logo: "/logos/bootstrap.png" },
  ],
  "Ferramentas & Design": [
    { name: "vsCode", logo: "/logos/vscode.png" },
    { name: "Git/GitHub", logo: "/logos/github.png" },
    { name: "Autodesk Maya", logo: "/logos/maya.png" },
    { name: "ZBrush", logo: "/logos/zbrush.png" },
    { name: "Substance Painter", logo: "/logos/substance.png" },
    { name: "Figma", logo: "/logos/figma.png" },
    { name: "Android Studio", logo: "/logos/android.png" },
  ],
};

const orbitConfigs = {
  "Linguagens & DB": { radius: 3.5, color: "#00aaff", speed: 0.12 },
  "Engines & Frameworks": { radius: 5, color: "#00ffff", speed: -0.1 },
  "Ferramentas & Design": { radius: 6.5, color: "#a6adc8", speed: 0.07 },
};

function OrbitRing({ radius }) {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      p.push(
        new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
      );
    }
    return p;
  }, [radius]);

  return (
    <Line
      points={points}
      color="white"
      lineWidth={0.5}
      transparent
      opacity={0.15}
    />
  );
}

function SkillMoon({ skill, index, total }) {
  const moonRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const texture = useTexture(skill.logo || "/logos/default.png");

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    const angle = (index / total) * Math.PI * 2 + elapsedTime * 0.5;
    const radius = 1.2;
    if (moonRef.current) {
      moonRef.current.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 3) * 0.1,
        Math.sin(angle) * radius
      );
    }
  });

  return (
    <group ref={moonRef}>
      <Sphere
        args={[0.2, 32, 32]}
        onPointerOver={() => {
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setIsHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={"#00aaff"}
          emissive={"#00aaff"}
          emissiveIntensity={isHovered ? 0.8 : 0.2}
          transparent
          opacity={0.5}
        />
      </Sphere>
      {skill.logo && (
        <Billboard>
          <Plane args={[0.3, 0.3]}>
            <meshBasicMaterial
              map={texture}
              transparent
              opacity={isHovered ? 1 : 0.85}
              depthTest={false}
            />
          </Plane>
        </Billboard>
      )}
      {isHovered && (
        <Html center position={[0, 0.3, 0]}>
          <div className="skill-moon-label">{skill.name}</div>
        </Html>
      )}
    </group>
  );
}

function CategorySphere({ category, onSelect, isActive }) {
  const sphereRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const config = orbitConfigs[category];
  const lastSoundTime = useRef(0);

  const playRollingSound = () => {
    const now = Date.now();
    if (now - lastSoundTime.current < 200) return; // Cooldown de 200ms

    lastSoundTime.current = now;
    if (window.soundManager) {
      window.soundManager.play("sphereRolling");
    }
  };

  useFrame((state) => {
    if (sphereRef.current) {
      const elapsedTime = state.clock.getElapsedTime();
      const angle = elapsedTime * config.speed;
      const newX = Math.cos(angle) * config.radius;
      const newZ = Math.sin(angle) * config.radius;

      // Detectar movimento para tocar som de rolagem
      const prevX = sphereRef.current.position.x;
      const prevZ = sphereRef.current.position.z;
      const movement = Math.abs(newX - prevX) + Math.abs(newZ - prevZ);

      if (movement > 0.01) {
        playRollingSound();
      }

      sphereRef.current.position.x = newX;
      sphereRef.current.position.z = newZ;
    }
  });

  const handleClick = () => {
    // Tocar som específico baseado na categoria
    let soundName = "";
    switch (category) {
      case "Linguagens & DB":
        soundName = "languagesDB";
        break;
      case "Engines & Frameworks":
        soundName = "enginesFrameworks";
        break;
      case "Ferramentas & Design":
        soundName = "toolsDesign";
        break;
    }

    onSelect(category, sphereRef, soundName);
  };

  return (
    <group ref={sphereRef}>
      <Sphere
        args={[0.5, 32, 32]}
        onClick={handleClick}
        onPointerOver={() => {
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setIsHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={isHovered || isActive ? 1 : 0.3}
          toneMapped={false}
        />
      </Sphere>
      <Html position={[0, 0.8, 0]} center>
        <div className="category-label" style={{ color: config.color }}>
          {category}
        </div>
      </Html>
      {isActive && (
        <Suspense fallback={null}>
          {skillsData[category].map((skill, index) => (
            <SkillMoon
              key={skill.name}
              skill={skill}
              index={index}
              total={skillsData[category].length}
            />
          ))}
        </Suspense>
      )}
    </group>
  );
}

export function Skills({ onNavigate, setFocus }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelectCategory = (category, ref, soundName) => {
    // Tocar som específico da categoria
    if (window.soundManager && soundName) {
      window.soundManager.play(soundName);
    }

    if (activeCategory === category) {
      setActiveCategory(null);
      setFocus(null);
    } else {
      setActiveCategory(category);
      setFocus(ref);
    }
  };

  return (
    <group>
      <Html position={[0, 3.5, 0]} center>
        <div className="skills-title">
          <h2>CONSTELAÇÃO DE HABILIDADES</h2>
          <p>Clique em uma órbita para explorar</p>
        </div>
      </Html>

      {Object.keys(skillsData).map((category) => (
        <group key={category}>
          <OrbitRing radius={orbitConfigs[category].radius} />
          <CategorySphere
            category={category}
            onSelect={handleSelectCategory}
            isActive={activeCategory === category}
          />
        </group>
      ))}

      <Html position={[0, -3.5, 0]}>
        <button
          onClick={() =>
            activeCategory
              ? handleSelectCategory(activeCategory, null, "")
              : onNavigate("projetos", "backToProjects")
          }
          className="back-button back-to-projects-btn"
        >
          {activeCategory
            ? "← Voltar para Constelação"
            : "← Voltar para Projetos"}
        </button>
      </Html>
    </group>
  );
}
