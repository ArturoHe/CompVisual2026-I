# Computación Visual Semana 1

## Info

- Taller Transformaciones
- Jose Arturo Herrera Rivera
- 21/02/2025

## Descripción:

Con el desarrollo del taller se esperaba afianzar conocimientos acerca de las transformaciones y poder explorarlas usando otras herramientas de software.
Para la implementación en Python se usó un Jupyter Notebook en el cual usando matplotlib se hicieron transformaciones estáticas a una figura y luego se animó produciendo como salida un gif.
En cuanto a la implementación de Three.js se creó una web interactiva que permia observar transformaciones entre un cubo y una esfera.
Por último, para la implementación de Processing se desarrolló una escena en la que un cubo principal tenía transformaciones mientras otros lo seguían.

## Implementaciones:

En esta implementación de Jupyter utilizando las librerías numpy y matplotlib y con ayuda de la IA el código crea una animación interactiva que permite observar la transición fluida de las transformaciones a una estrella primero de forma estática y luego animada. Finalmente, se incluyeron funciones específicas para exportar el resultado visual en formato GIF.

Para la implementacion de Three.js tambien se apoyó en IA. En la app se usa también React para crear una escena en 3D interactiva en el navegador. La aplicación implemneta una rejilla de referencia y dos objetos principales: un cubo azul y una esfera roja wireframe, los cuales realizan transformaciones geométricas continuas como traslación en órbitas, rotación sobre sus ejes y cambios de escala pulsantes.

En caunto a la implementacion de Processing se decidió animar un conjunto de figuras geométricas, específicamente un cubo principal, un cubo secundario y una serie de cubos pequeños que orbitan en formación circular, utilizando transformaciones matemáticas (senos y cosenos) para controlar su posición, rotación y escala en tiempo real.

_(Los prompts usados quedan en la sección respecctiva)_

## Resultados visuales:

En la carpeta [/media](https://github.com/ArturoHe/CompVisual2026-I/tree/main/semana_1_4_transformaciones/media) se anexan los siguientes resultados visuales:

- Imagen de las transformaciones estáticas hechas en Jupyter.
- Gif de la animación hecha en Jupyter.
- Captura de la animación en Processing.
- Video de la implementación en Processing.
- Captura de la animación en Three.js.
- Video de la implementación en Three.js.

## Código relevante: Snippets importantes o enlaces al código

La función create_simple_animation_gif en el jupyter es la que permite hacer la animacion en formato gif.

```
def create_simple_animation_gif(filename='hola_mundo_visual.gif',
                                 num_frames=50, fps=15):
    """
    Crea y guarda una animación simple como GIF
    """
    from matplotlib.animation import PillowWriter

    original_shape = create_star()

    fig, ax = plt.subplots(figsize=(8, 8))
    ax.set_xlim(-5, 5)
    ax.set_ylim(-5, 5)
    ax.set_aspect('equal')
    ax.grid(True, alpha=0.3)
    ax.axhline(y=0, color='k', linewidth=0.5)
    ax.axvline(x=0, color='k', linewidth=0.5)
    ax.set_title('Animacoin',
                 fontsize=12, fontweight='bold')

    polygon = Polygon(original_shape[:, :2], closed=True,
                      fill=True, facecolor='skyblue',
                      edgecolor='navy', linewidth=2)
    ax.add_patch(polygon)

    def animate(frame):
        t = frame / num_frames

        # Transformaciones combinadas
        tx = 2 * np.sin(2 * np.pi * t)
        ty = 1.5 * np.cos(2 * np.pi * t)
        rotation_angle = 360 * t
        scale_factor = 1 + 0.3 * np.sin(4 * np.pi * t)

        transformed = transform_shape(original_shape, [
            ('translate', (tx, ty)),
            ('rotate', rotation_angle),
            ('scale', (scale_factor, scale_factor))
        ])

        polygon.set_xy(transformed[:, :2])

        # Colores dinámicos
        hue = t
        polygon.set_facecolor(plt.cm.hsv(hue))

        return polygon,

    anim = FuncAnimation(fig, animate, frames=num_frames,
                        interval=1000/fps, blit=True)

    # Guardar como GIF
    writer = PillowWriter(fps=fps)
    anim.save(filename, writer=writer)
    plt.close(fig)

    print(f"✓ Animación guardada: {filename}")
    print(f"  - Frames: {num_frames}")
    print(f"  - FPS: {fps}")
    print(f"  - Duración: {num_frames/fps:.1f} segundos")

    return filename

```

## Prompts utilizados

Es importante mencionar que aunque estos son los prompts de los que se partió inicialmente, se tuvo que hacer depuración y seguir desarrollando a partir de estos.

- Para el projecto en Jupyter:
  - _Escribe un código en Python para un cuaderno de Jupyter que permita visualizar transformaciones geométricas tanto de forma estática como animada. El código debe usar numpy, matplotlib e imageio, y definir funciones para aplicar transformaciones a un conjunto de puntos. El script debe ser capaz de guardar la animación resultante en un archivo GIF llamado 'hola_mundo_visual.gif'_

- Para el projecto en Three.js:
  - _Crea una aplicación de React usando Three.js que muestre una escena 3D con 2 objetos animados. El cubo y la esfera deben poder diferenciarse; ambos deben moverse siguiendo trayectorias circulares o senoidales, rotar sobre sí mismos y cambiar su tamaño. Incluye un suelo en la escena para que funcione de referencia._

## Aprendizajes y dificultades

En este taller, he explorado la forma para implementar transformaciones geométricas fundamentales a través de tres entornos de programación distintos: Python (Jupyter), React (Three.js) y Processing. En cuanto a las dificultades, el reto principal fue usar processing ya que era la primera vez y en la sincronización de las animaciones basadas en el tiempo real.
