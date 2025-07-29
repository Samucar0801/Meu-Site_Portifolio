import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `uniform float uTime;varying float vNoise;vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}vec4 taylorInvSqrt(vec4 r){return 1.7928429-0.8537347*r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));float n_=1./7.;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}
void main(){vec4 modelPosition=modelMatrix*vec4(position,1.);float noise=snoise(position*2.+uTime*.5);vNoise=noise;modelPosition.xyz+=normal*noise*.05;gl_Position=projectionMatrix*viewMatrix*modelPosition;}`;

const fragmentShader = `uniform vec3 uColor;varying float vNoise;void main(){vec3 color=uColor*(.5+vNoise*.5);gl_FragColor=vec4(color,1.);}`;

export function Nucleus() {
  const groupRef = useRef();
  const innerCoreRef = useRef();
  const energyShellMaterialRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [lastRotation, setLastRotation] = useState({ x: 0, y: 0 });
  const lastSoundTime = useRef(0);

  const playOrbitSound = () => {
    const now = Date.now();
    if (now - lastSoundTime.current < 150) return; // Cooldown de 150ms

    lastSoundTime.current = now;

    if (window.soundManager) {
      window.soundManager.play("orbit");
    }
  };

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Rotação automática quando não está sendo arrastado
      if (!isDragging) {
        groupRef.current.rotation.y = elapsedTime * 0.05;
        groupRef.current.rotation.x = elapsedTime * 0.05;
      }

      // Detectar se está rotacionando (manual ou automático)
      const currentRotation = {
        x: groupRef.current.rotation.x,
        y: groupRef.current.rotation.y,
      };

      const rotationSpeed =
        Math.abs(currentRotation.x - lastRotation.x) +
        Math.abs(currentRotation.y - lastRotation.y);

      if (rotationSpeed > 0.01) {
        playOrbitSound();
      }

      setLastRotation(currentRotation);
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y = elapsedTime * -0.2;
      innerCoreRef.current.rotation.z = elapsedTime * 0.2;
      innerCoreRef.current.material.emissiveIntensity =
        ((Math.sin(elapsedTime * 1.5) + 1) / 2) * 0.8 + 0.2;
    }

    if (energyShellMaterialRef.current) {
      energyShellMaterialRef.current.uniforms.uTime.value = elapsedTime;
    }
  });

  const handlePointerDown = (event) => {
    setIsDragging(true);
    event.stopPropagation();
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event) => {
    // Detectar zoom in/out pelo scroll
    if (event.deltaY < 0) {
      // Zoom in
      if (window.soundManager) {
        window.soundManager.play("zoomIn");
      }
    } else {
      // Zoom out
      if (window.soundManager) {
        window.soundManager.play("zoomOut");
      }
    }
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    >
      <mesh>
        <icosahedronGeometry args={[2.2, 15]} />
        <shaderMaterial
          ref={energyShellMaterialRef}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color("#00aaff") },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      <mesh scale={1.05}>
        <icosahedronGeometry args={[2.2, 15]} />
        <meshBasicMaterial
          color="#00aaff"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh ref={innerCoreRef}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00aaff"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
