import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { useControls } from "leva";
import "./App.css";

// Componente de jerarquía padre-hijo
function HierarchyScene() {
  // Controles para el nodo padre (grupo principal)
  const parentControls = useControls("Padre (Grupo Principal)", {
    positionX: { value: 0, min: -5, max: 5, step: 0.1 },
    positionY: { value: 0, min: -5, max: 5, step: 0.1 },
    positionZ: { value: 0, min: -5, max: 5, step: 0.1 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  // Controles adicionales para observar el comportamiento
  const animationControls = useControls("Animación", {
    autoRotate: false,
  });

  return (
    <group
      position={[
        parentControls.positionX,
        parentControls.positionY,
        parentControls.positionZ,
      ]}
      rotation={[
        parentControls.rotationX,
        parentControls.rotationY,
        parentControls.rotationZ,
      ]}
    >
      {/* Mesh padre - Cubo central (rojo) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Hijo 1 - Esfera (azul) */}
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Hijo 2 - Cilindro (verde) */}
      <mesh position={[-2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Hijo 3 - Cono (amarillo) arriba */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.5, 1.5, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      {/* Hijo 4 - Toroide (magenta) abajo */}
      <mesh position={[0, -2, 0]}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial color="magenta" />
      </mesh>

      {/* Hijo 5 - Octaedro (cyan) adelante */}
      <mesh position={[0, 0, 2]}>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="cyan" />
      </mesh>

      {/* Hijo 6 - Tetraedro (naranja) atrás */}
      <mesh position={[0, 0, -2]}>
        <tetrahedronGeometry args={[0.6]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Grupo anidado - Demostración de jerarquía multinivel */}
      <group position={[1.5, 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        {/* Cubo pequeño (blanco) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Esfera mini (rosa) */}
        <mesh position={[0.6, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="pink" />
        </mesh>
      </group>
    </group>
  );
}

function App() {
  // Controles globales
  const sceneControls = useControls("Escena", {
    showGrid: true,
    gridSize: { value: 10, min: 5, max: 20, step: 1 },
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        {/* Iluminación */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Escena con jerarquía */}
        <HierarchyScene />

        {/* Controles de cámara */}
        <OrbitControls makeDefault />

        {/* Grid para referencia */}
        {sceneControls.showGrid && (
          <Grid
            args={[sceneControls.gridSize, sceneControls.gridSize]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6f6f6f"
            sectionSize={3}
            sectionThickness={1}
            sectionColor="#9d4b4b"
            fadeDistance={25}
            fadeStrength={1}
            followCamera={false}
          />
        )}
      </Canvas>

      {/* Instrucciones */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "15px",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "12px",
          maxWidth: "300px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>Jerarquía Padre-Hijo</h3>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>Cubo rojo (centro): Nodo padre</li>
          <li>Objetos de colores: Hijos directos</li>
          <li>Cubo blanco y esfera rosa: Grupo anidado</li>
        </ul>
        <p style={{ margin: "10px 0 0 0", fontSize: "11px" }}>
          ℹ️ Usa los controles de Leva (panel derecho) para modificar la
          posición y rotación del padre. Observa cómo todos los hijos heredan
          las transformaciones.
        </p>
      </div>
    </div>
  );
}

export default App;
