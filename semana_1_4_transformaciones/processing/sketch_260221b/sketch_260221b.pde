void setup() {
  size(800, 600, P3D);  
  noStroke();
}

void draw() {
  background(30);
  
  // 1. TRASLACIÓN GLOBAL AL CENTRO
  // Esto mueve el "origen" (0,0,0) al centro de tu ventana
  translate(width/2, height/2, 0); 
  
  lights();
  ambientLight(60, 60, 60);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  
  // Ajuste de perspectiva (opcional, el default suele bastar)
  float cameraZ = (height/2.0) / tan(PI*30.0 / 180.0);
  perspective(PI/3.0, width/height, cameraZ/10.0, cameraZ*10.0);
  
  camera(0, -400, 600, 0, 0, 0, 0, 1, 0);
  
  float tiempo = millis() / 1000.0;
  
  // === CUBO PRINCIPAL ===
  pushMatrix();
  float tx = 200 * sin(tiempo * 0.8);
  float ty = 100 * cos(tiempo * 0.5);
  float tz = 200 * cos(tiempo * 0.8);
  translate(tx, ty, tz);
  
  rotateX(tiempo * 0.7);
  rotateY(tiempo * 0.9);
  rotateZ(tiempo * 0.5);
  
  float escala = 1 + 0.3 * sin(tiempo * 2);
  scale(escala);
  fill(100, 200, 255);
  box(80);
  popMatrix();
  
  // === CUBO SECUNDARIO ===
  pushMatrix();
  float angulo = tiempo * 1.2;
  float radio = 250;
  float x = radio * cos(angulo);
  float z = radio * sin(angulo);
  float y = 100 * sin(tiempo * 3);
  translate(x, y, z);
  rotateY(-angulo);
  rotateX(tiempo * 1.5);
  
  float s = 0.6 + 0.3 * sin(tiempo * 2.5);
  scale(s, s * 1.2, s);
  fill(255, 150, 100);
  box(60);
  popMatrix();
  
  // === CUBOS PEQUEÑOS ===
  pushMatrix();
  translate(0, 0, -300);
  rotateY(tiempo * 0.6);
  for (int i = 0; i < 6; i++) {
    pushMatrix();
    rotateY(TWO_PI / 6 * i);
    translate(0, 0, 200);
    float escalaPeque = 0.3 + 0.2 * sin(tiempo * 4 + i);
    scale(escalaPeque);
    fill(150 + i * 20, 200, 150 + i * 15);
    box(40);
    popMatrix();
  }
  popMatrix();
  
  // === TEXTO INFORMATIVO ===
  // Usamos pushMatrix/popMatrix para que el texto no se vea afectado 
  // por la traslación central ni las rotaciones
  pushMatrix();
  resetMatrix(); // Limpia la traslación de width/2, height/2 para el texto
  fill(255);
  textAlign(LEFT, TOP); // Cambié textAlign(TOP) por LEFT, TOP para evitar errores
  textSize(14);
  text("Frame: " + frameCount, 10, 10);
  text("Tiempo: " + nf(tiempo, 0, 2) + " seg", 10, 30);
  text("fps: " + Math.floor(frameRate), 10, 50);
  popMatrix();
}
