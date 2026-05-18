#include <Bluepad32.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

// ===== DRIVER PWM =====
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

// ===== CONFIG SERVOS =====
struct ServoConfig {
  int canal;
  int min;
  int max;
  int atual;
};

ServoConfig base   = {0, 280, 420, 350};
ServoConfig ombro  = {1, 280, 420, 350};
ServoConfig cotov  = {2, 280, 420, 350};
ServoConfig garra  = {3, 300, 420, 350};

// ===== MOTORES (L298N) =====
#define IN1 27
#define IN2 26
#define IN3 25
#define IN4 33

// ===== CONTROLE =====
ControllerPtr myControllers[BP32_MAX_GAMEPADS];

// ===== CONEXÃO =====
void onConnectedController(ControllerPtr ctl) {
  Serial.println("Controle conectado!");
  myControllers[0] = ctl;
}

void onDisconnectedController(ControllerPtr ctl) {
  Serial.println("Controle desconectado!");
  myControllers[0] = nullptr;
}

// ===== SERVO =====
void moverServoSeguro(ServoConfig &s, int alvo) {
  alvo = constrain(alvo, s.min, s.max);

  if (abs(alvo - s.atual) > 2) {
    if (alvo > s.atual) s.atual += 2;
    else s.atual -= 2;
  }

  pwm.setPWM(s.canal, 0, s.atual);
}

// ===== MOTORES =====
void pararMotores() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void frente() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);

  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void tras() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);

  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void direita() {
  // só motor esquerdo
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);

  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void esquerda() {
  // só motor direito
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);

  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

// ===== SETUP =====
void setup() {
  Serial.begin(115200);

  Wire.begin(21, 22);

  pwm.begin();
  pwm.setPWMFreq(60);

  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);

  pararMotores();

  BP32.setup(&onConnectedController, &onDisconnectedController);
  BP32.forgetBluetoothKeys();

  Serial.println("Sistema pronto!");
}

// ===== LOOP =====
void loop() {
  BP32.update();

  if (myControllers[0] && myControllers[0]->isConnected()) {

    // ===== ANALÓGICOS =====
    int rx = myControllers[0]->axisRX();
    int ry = myControllers[0]->axisRY();

    int lx = myControllers[0]->axisX();
    int ly = myControllers[0]->axisY();

    int deadzone = 80;

    if (abs(rx) < deadzone) rx = 0;
    if (abs(ry) < deadzone) ry = 0;
    if (abs(lx) < deadzone) lx = 0;
    if (abs(ly) < deadzone) ly = 0;

    // ===== SERVOS =====
    int velX = map(rx, -512, 512, -10, 10);
    int velY = map(ry, -512, 512, -10, 10);

    moverServoSeguro(base, base.atual + velX);
    moverServoSeguro(ombro, ombro.atual + velY);

    if (myControllers[0]->x()) {
      moverServoSeguro(cotov, cotov.atual + 3);
    }
    if (myControllers[0]->y()) {
      moverServoSeguro(cotov, cotov.atual - 3);
    }

    if (myControllers[0]->a()) {
      moverServoSeguro(garra, 300);
    }
    if (myControllers[0]->b()) {
      moverServoSeguro(garra, 420);
    }

    // ===== ESTEIRA =====
    if (ly > 200) {
      frente();
    }
    else if (ly < -200) {
      tras();
    }
    else if (lx > 200) {
      direita();
    }
    else if (lx < -200) {
      esquerda();
    }
    else {
      pararMotores();
    }
  }

  delay(20);
}
