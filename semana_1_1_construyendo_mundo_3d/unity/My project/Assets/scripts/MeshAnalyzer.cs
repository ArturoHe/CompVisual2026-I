using UnityEngine;

public class MeshAnalyzer : MonoBehaviour
{
    private bool showWireframe = false;

    void Start()
    {
        MeshFilter mf = GetComponent<MeshFilter>();

        if (mf == null)
        {
            Debug.Log("No hay MeshFilter en este objeto.");
            return;
        }

        Mesh mesh = mf.mesh;

        Debug.Log("Nombre del Mesh: " + mesh.name);
        Debug.Log("Numero de vertices: " + mesh.vertexCount);
        Debug.Log("Numero de triangulos: " + (mesh.triangles.Length / 3));
        Debug.Log("Numero de sub-mallas: " + mesh.subMeshCount);
        Debug.Log("Es legible: " + mesh.isReadable);
    }

    public void ToggleWireframe()
    {
        showWireframe = !showWireframe;
    }

    void OnDrawGizmos()
    {
        if (!showWireframe) return;

        MeshFilter mf = GetComponent<MeshFilter>();
        if (mf == null) return;

        Mesh mesh = mf.sharedMesh;
        if (mesh == null) return;

        Gizmos.color = Color.red;

        Vector3[] vertices = mesh.vertices;
        int[] triangles = mesh.triangles;

        for (int i = 0; i < triangles.Length; i += 3)
        {
            Vector3 v0 = transform.TransformPoint(vertices[triangles[i]]);
            Vector3 v1 = transform.TransformPoint(vertices[triangles[i + 1]]);
            Vector3 v2 = transform.TransformPoint(vertices[triangles[i + 2]]);

            Gizmos.DrawLine(v0, v1);
            Gizmos.DrawLine(v1, v2);
            Gizmos.DrawLine(v2, v0);
        }
    }
}