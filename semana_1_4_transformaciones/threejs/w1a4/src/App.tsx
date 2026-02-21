import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";

// Componente del cubo animado
function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const clockRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Incrementar el reloj interno
    clockRef.current += delta;

    // 1. TRASLACIÓN: Movimiento en trayectoria circular
    const radius = 3;
    meshRef.current.position.x = Math.cos(clockRef.current) * radius;
    meshRef.current.position.y = Math.sin(clockRef.current * 0.5) * 2;
    meshRef.current.position.z = Math.sin(clockRef.current) * radius;

    // 2. ROTACIÓN: Rotación sobre su propio eje
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 1.0;
    meshRef.current.rotation.z += delta * 0.3;

    // 3. ESCALA: Escalar suavemente con función temporal
    const scale = 1 + Math.sin(clockRef.current * 2) * 0.3;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4a9eff" />
    </mesh>
  );
}

// Componente de la esfera animada (opcional)
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const clockRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    clockRef.current += delta;

    // Trayectoria senoidal
    meshRef.current.position.x = Math.sin(clockRef.current * 1.5) * 3;
    meshRef.current.position.y = Math.cos(clockRef.current * 2) * 1.5;
    meshRef.current.position.z = 0;

    // Rotación
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.6;

    // Escala pulsante
    const scale = 0.8 + Math.sin(clockRef.current * 3) * 0.2;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#ff6b6b" wireframe />
    </mesh>
  );
}

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>
        {/* Iluminación */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Objetos 3D animados */}
        <AnimatedCube />
        <AnimatedSphere />

        {/* Grid helper para referencia */}
        <gridHelper args={[20, 20]} />

        {/* OrbitControls para navegar la escena */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={30}
        />
      </Canvas>

      {/* Información superpuesta */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          fontFamily: "monospace",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "15px",
          borderRadius: "8px",
          pointerEvents: "none",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0" }}>🌍 Hola Mundo Visual</h2>
        <p style={{ margin: "5px 0" }}>
          ✨ <strong>Transformaciones Geométricas</strong>
        </p>
        <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
          <li>Traslación: trayectoria circular/senoidal</li>
          <li>Rotación: sobre el propio eje</li>
          <li>Escala: función temporal (sin/cos)</li>
        </ul>
        <p style={{ margin: "10px 0 0 0", fontSize: "12px" }}>
          🖱️ Usa el mouse para navegar la escena
        </p>
      </div>
    </div>
  );
}

export default App;
