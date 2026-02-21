import { useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";

type ModelType = "gltf" | "stl" | "obj";

interface ModelInfo {
  vertices: number;
  format: string;
}

interface ModelProps {
  type: ModelType;
  setInfo: (info: ModelInfo) => void;
}

function GLTFModel({ setInfo }: { setInfo: (info: ModelInfo) => void }) {
  const gltf = useLoader(GLTFLoader, "/models/chair_obj.gltf");

  // Clonar la escena para evitar problemas al cambiar de modelo
  const scene = useMemo(() => {
    const clonedScene = gltf.scene.clone(true);

    // Configurar materiales en la escena clonada
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Clonar geometría y material
        if (child.geometry) {
          child.geometry = child.geometry.clone();
        }

        // Asegurar que tenga material visible
        if (
          !child.material ||
          (child.material as THREE.Material).opacity === 0
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
          });
        } else if (child.material) {
          // Clonar el material existente
          child.material = (child.material as THREE.Material).clone();
        }
      }
    });

    return clonedScene;
  }, [gltf]);

  useEffect(() => {
    console.log("GLTF cargado exitosamente");

    let totalVertices = 0;
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const geometry = child.geometry;
        if (geometry && geometry.attributes.position) {
          totalVertices += geometry.attributes.position.count;
        }
      }
    });

    if (totalVertices > 0) {
      setInfo({ vertices: totalVertices, format: "GLTF" });
      console.log("GLTF vértices:", totalVertices);
    }

    // Ver el bounding box del modelo completo
    const box = new THREE.Box3().setFromObject(scene);
    console.log("GLTF bounding box:", box);
    const size = {
      x: box.max.x - box.min.x,
      y: box.max.y - box.min.y,
      z: box.max.z - box.min.z,
    };
    console.log("GLTF size:", size);
  }, [scene, setInfo]);

  return <primitive object={scene} scale={0.01} />;
}

function STLModel({ setInfo }: { setInfo: (info: ModelInfo) => void }) {
  const geometry = useLoader(STLLoader, "/models/chair_gltf.stl");

  useEffect(() => {
    console.log("STL cargado exitosamente");
    console.log("STL geometry:", geometry);
    if (geometry && geometry.attributes.position) {
      if (!geometry.attributes.normal) {
        geometry.computeVertexNormals();
      }

      const vertices = geometry.attributes.position.count;
      setInfo({ vertices, format: "STL" });
      console.log("STL vértices:", vertices);

      // Ver el bounding box ANTES de centrar
      geometry.computeBoundingBox();
      console.log("STL bounding box:", geometry.boundingBox);

      const box = geometry.boundingBox;
      if (box) {
        const size = {
          x: box.max.x - box.min.x,
          y: box.max.y - box.min.y,
          z: box.max.z - box.min.z,
        };
        console.log("STL size:", size);
        console.log("STL center:", {
          x: (box.max.x + box.min.x) / 2,
          y: (box.max.y + box.min.y) / 2,
          z: (box.max.z + box.min.z) / 2,
        });
      }
    }
  }, [geometry, setInfo]);

  return (
    <>
      {/* Modelo STL - sin escala porque ya está en unidades correctas */}
      <mesh geometry={geometry} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="orange"
          side={THREE.DoubleSide}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </>
  );
}

function OBJModel({ setInfo }: { setInfo: (info: ModelInfo) => void }) {
  const obj = useLoader(OBJLoader, "/models/chair_stl.obj");

  useEffect(() => {
    console.log("OBJ cargado exitosamente");
    let totalVertices = 0;

    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const geometry = child.geometry;
        if (geometry && geometry.attributes.position) {
          totalVertices += geometry.attributes.position.count;
        }
        child.material = new THREE.MeshStandardMaterial({
          color: 0x00ff00,
          side: THREE.DoubleSide,
        });
      }
    });

    if (totalVertices > 0) {
      setInfo({ vertices: totalVertices, format: "OBJ" });
      console.log("OBJ vértices:", totalVertices);
    }
  }, [obj, setInfo]);

  return (
    <primitive object={obj} scale={0.01} rotation={[-Math.PI / 2, 0, 0]} />
  );
}

function Model({ type, setInfo }: ModelProps) {
  if (type === "gltf") return <GLTFModel setInfo={setInfo} />;
  if (type === "stl") return <STLModel setInfo={setInfo} />;
  if (type === "obj") return <OBJModel setInfo={setInfo} />;
  return null;
}

export default function ModelViewer() {
  const [modelType, setModelType] = useState<ModelType>("stl");
  const [info, setInfo] = useState<ModelInfo>({
    vertices: 0,
    format: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleModelChange = (type: ModelType) => {
    console.log(`Cambiando a modelo ${type.toUpperCase()}...`);
    setModelType(type);
    setError("");
    setLoading(true);
    setInfo({ vertices: 0, format: "" });
  };

  const handleSetInfo = (info: ModelInfo) => {
    console.log("Modelo cargado:", info);
    setInfo(info);
    setLoading(false);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* Panel de Control */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "rgba(58, 58, 58, 0.95)",
          padding: "15px",
          borderRadius: "10px",
          zIndex: 100,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          minWidth: "200px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>
          Visor de Modelos 3D
        </h3>

        <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
          <button
            onClick={() => handleModelChange("gltf")}
            style={{
              backgroundColor: modelType === "gltf" ? "#2196F3" : "#f0f0f0",
              color: modelType === "gltf" ? "white" : "black",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: "bold",
              flex: 1,
            }}
          >
            GLTF
          </button>
          <button
            onClick={() => handleModelChange("stl")}
            style={{
              backgroundColor: modelType === "stl" ? "#FF9800" : "#f0f0f0",
              color: modelType === "stl" ? "white" : "black",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: "bold",
              flex: 1,
            }}
          >
            STL
          </button>
          <button
            onClick={() => handleModelChange("obj")}
            style={{
              backgroundColor: modelType === "obj" ? "#4CAF50" : "#f0f0f0",
              color: modelType === "obj" ? "white" : "black",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "5px",
              fontWeight: "bold",
              flex: 1,
            }}
          >
            OBJ
          </button>
        </div>

        <hr style={{ margin: "10px 0" }} />

        {loading && (
          <p style={{ color: "#2196F3", fontWeight: "bold", margin: "10px 0" }}>
            ⏳ Cargando modelo...
          </p>
        )}

        <div style={{ fontSize: "14px" }}>
          <p style={{ margin: "5px 0" }}>
            <strong>Formato:</strong> {info.format || "---"}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Vértices:</strong>{" "}
            {info.vertices ? info.vertices.toLocaleString() : "---"}
          </p>
        </div>

        {error && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#ffebee",
              borderRadius: "5px",
              color: "#c62828",
              fontSize: "12px",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Escena 3D */}
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <color attach="background" args={["#1a1a1a"]} />

        {/* Iluminación */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 10, 0]} intensity={0.5} />

        {/* Helpers */}
        <gridHelper args={[10, 10, 0x444444, 0x222222]} />
        <axesHelper args={[3]} />

        {/* Modelo */}
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color="yellow" wireframe />
            </mesh>
          }
        >
          <Model key={modelType} type={modelType} setInfo={handleSetInfo} />
        </Suspense>

        {/* Controles */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}
