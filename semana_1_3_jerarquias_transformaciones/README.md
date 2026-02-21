# Computación Visual Semana 1

## Info

- Taller Jerarquias Transformaciones
- Jose Arturo Herrera Rivera
- 21/02/2025

## Descripción:

Con el desarrollo del taller se buscaba entender cómo se aplican las transformaciones en estructuras jerárquicas de objetos, aplicando rotaciones, escala y desplazamiento. Para el desarrollo del taller se implemento un visualizador web que mostrara la jerarquía entre objetos (9 objetos en la escena) y permitiera aplicar transformaciones al objeto padre par ver como se aplicaban. En unity también se creó una estructura jerárquica con tres objetos para observar lo anterior.

## Implementaciones:

Primero se realizó la implementación en unity, para esto se crearon 3 objetos (capsula, cubo, cilindro) estos objetos fueron anidados para que la capsula actuase como padre, el cubo como hijo y el cilindro como nieto, también se agregaron 3 deslizadores que aplicaban transformaciones de posición, rotación y escala al padre, de esta forma observando como eran afectados los objetos en la jerarquía.

La implementación de Three.js se hizo con ayuda de la IA y parte de un nodo principal (group) el cual le permite al usuario manipular la posición y rotación de un conjunto de figuras geométricas de forma simultánea. El código tambien incluye un panel de control dinámico con la librería Leva, que permite ajustar en tiempo real las propiedades del "padre" y observar cómo afectan automáticamente a todos los "hijos" y subgrupos anidados.

_(Los prompts usados quedan en la sección respecctiva)_

## Resultados visuales:

En la carpeta [/media](https://github.com/ArturoHe/CompVisual2026-I/tree/main/semana_1_3_jerarquias_transformaciones/media) se anexan los siguientes resultados visuales:

- Imagen de la consola de Unity mostrando la rotación, posición y escala del objeto padre.
- Imagen de la jerarquía implementada en Unity.
- Imágenes de resultados en Unity mostrando las transformaciones.
- Imágenes de los resultados con Three.js evidenciando las transformaciones.
- Videos demostrativos de las implementaciones en Unity y Three.js

## Código relevante: Snippets importantes o enlaces al código

Contenedor de Jerarquía: Al aplicar las coordenadas al group, todos los componentes <mesh> en su interior mantienen su distancia relativa pero heredan el movimiento global.

```
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
```

## Prompts utilizados

Es importante mencionar que aunque estos son los prompts de los que se partió inicialmente, se tuvo que hacer depuración y seguir desarrollando a partir de estos.

- Para el projecto con Three.js:
  - _Crea una aplicación de React Three.js que demuestre de forma didáctica la jerarquía padre-hijo en 3D. La escena debe contener un grupo principal controlado mediante la librería Leva o dat.GUI, permitiendo modificar su posición y rotación. Dentro de este grupo, añade un cubo rojo en el origen y varias figuras geométricas distintas distribuidas a su alrededor en diferentes ejes para que actúen como hijos directos, también incluye un subgrupo anidado (un grupo dentro del grupo padre) con un par de figuras pequeñas para mostrar una jerarquía multinivel._

## Aprendizajes y dificultades

En este taller, mi principal aprendizaje fue comprender cómo las estructuras jerárquicas permiten que un nodo padre (group) actúe como un sistema de coordenadas local para sus hijos, facilitando la creación de transformaciones. La mayor dificultad radicó en gestionar la composición de las rotaciones y escalas en el subgrupo anidado, ya que el comportamiento de los ejes locales puede volverse confuso cuando el nodo raíz tiene trasnforamciones.
