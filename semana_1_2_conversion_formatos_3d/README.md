# Computación Visual Semana 1

## Info

- Taller Conversion Formatos 3D
- Jose Arturo Herrera Rivera
- 21/02/2025

## Descripción:

Con el desarrollo del taller se buscaba comprender las diferencias entre los distintos formatos en los que se guardan los modelos 3d, para esto se hizo uso de un Jupyter Notebook para la visualización inicial de los modelos y posterior transformación de estos a un formato distinto, después de hacer la conversión se procedió a desarrollar un visualizador 3d con apoyo de las librerías Three.js y React.

## Implementaciones:

Para preparar el desarrollo del taller, se descargaron 3 modelos 3d en los formatos .obj, .stl y .gltf

A continuación, se procedió con el desarrollo en el entorno de Jupyter, con apoyo de la IA se procedió a usar Trimesh, Open3D y NumPy para gestionar y procesar modelos 3D en los formatos mencionados con anterioridad . El código permite cargar los modelos, analizar sus propiedades geométricas (conteo de vértices, caras, detección de duplicados y área superficial, visualizar los modelos de forma interactiva y realizar comparaciones entre los diferentes archivos y convertir modelos entre formatos, exportando los resultados procesados a un directorio de salida. Además, se incluyó funciones para automatizar el análisis de carpetas.

Por último, de nuevo con apoyo de la IA, se desarrolló una aplicación web interactiva en React utilizando Three.js para visualizar modelos tridimensionales en el navegador. La interfaz permite al usuario alternar dinámicamente entre tres formatos de archivo diferentes (GLTF, STL y OBJ) mediante un panel de control lateral. también se incluyó un control deslizante para ajustar la escala del modelo en tiempo real y la muestra datos como la cantidad de vértices. Se decidió añadir guías visuales como una rejilla y ejes de coordenadas.

_(Los prompts usados quedan en la sección respecctiva)_

## Resultados visuales:

En la carpeta [/media](https://github.com/ArturoHe/CompVisual2026-I/tree/main/semana_1_2_conversion_formatos_3d/media) se anexan los siguientes resultados visuales:

- Imágenes visualizadas con open3d en Jupyter de los modelos iniciales _ (open3d_X.png)_
- Imágenes de los modelos convertidos tomadas en el visualizador hecho con React y Three.js
- Video en el visualizador web hecho.

## Código relevante: Snippets importantes o enlaces al código

En el Jupyter la lógica de comparación en la función _compare_meshes_ que calcula la diferencia exacta en vértices, caras y área superficial entre distintos archivos.

```
def compare_meshes(mesh1, mesh2, name1="Mesh1", name2="Mesh2"):
    print("\n========== COMPARACIÓN ==========")

    print(f"\nComparando {name1} vs {name2}")

    print(f"Diferencia en vértices: {len(mesh1.vertices) - len(mesh2.vertices)}")
    print(f"Diferencia en caras: {len(mesh1.faces) - len(mesh2.faces)}")
    print(f"Diferencia en área: {mesh1.area - mesh2.area}")
```

En el visualizador web el método traverse se emplea para iterar sobre cada malla (Mesh) y sumar geometry.attributes.position.count, obteniendo así el total real de vértices del modelo.

```
scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const geometry = child.geometry;
        if (geometry && geometry.attributes.position) {
          totalVertices += geometry.attributes.position.count;
        }
      }
    }
```

## Prompts utilizados

Es importante mencionar que aunque estos son los prompts de los que se partió inicialmente, se tuvo que hacer depuración y seguir desarrollando a partir de estos.

- Para el Jupiter notebook se usó:
  - _Escribe un script en Python que utilice trimesh, open3d y numpy para cargar, analizar, visualizar y convertir modelos 3D (OBJ, STL, GLTF), incluyendo funciones específicas para calcular propiedades geométricas como el área superficial, volumen y conteo de vértices, tambien poder comparar las diferencias entre los múltiples modelos, procesar automáticamente todos los archivos de una carpeta, y exportar los resultados a nuevos formatos tras visualizarlos interactivamente con Open3D._

- Para el projecto con React y Three.js:
  - _Desarrolla una aplicación en React con TypeScript y Three.js que funcione como un visor multiformato para modelos 3D. El código debe incluir un componente que permita al usuario alternar entre la visualizacion de archivos GLTF, STL y OBJ._
  - _Implementa un control de escala dinámico mediante un slider para los modelos_

## Aprendizajes y dificultades

En este taller, aprendí la manipulación técnica en Jupyter con Trimesh para la manipulación y la conversión de los archivos.

También aprendí acerca de la visualización interactiva en React utilizando Three.js. La mayor dificultad radicó en la normalización de los modelos, ya que cada formato (GLTF, STL, OBJ) presenta estructuras de datos distintas, lo que me obligó a implementar una clonación de los modelos para evitar que las modificaciones de escala o posición pudieran afectar al original. En la parte web hubo un reto gigante a la hora de mostrar correctamente los modelos ya que aparecían rotados o a una escala diminuta o directamente ni aparecían, entonces implementar la “normalización” de la escala ayudó muchísimo.
