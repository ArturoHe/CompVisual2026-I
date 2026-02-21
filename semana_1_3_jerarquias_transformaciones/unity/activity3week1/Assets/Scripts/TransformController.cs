using UnityEngine;
using UnityEngine.UI; // Necesario para interactuar con los Sliders

public class ControlTransformaciones : MonoBehaviour
{
    [Header("Referencias de la UI")]
    public Slider sliderPosicion;
    public Slider sliderRotacion;
    public Slider sliderEscala;

    void Update()
    {
        // 1. Aplicamos los valores de los sliders al objeto Padre
        // Usamos sliderPosicion.value para moverlo en el eje X, por ejemplo.
        transform.position = new Vector3(sliderPosicion.value, 0, 0);

        // Rotación en el eje Y
        transform.rotation = Quaternion.Euler(0, sliderRotacion.value * 360f, 0);

        // Escala uniforme
        transform.localScale = Vector3.one * sliderEscala.value;

        // 2. Mostrar valores en consola (como pide el ejercicio)
        Debug.Log($"Pos: {transform.position} | Rot: {transform.rotation.eulerAngles} | Esc: {transform.localScale}");
    }
}