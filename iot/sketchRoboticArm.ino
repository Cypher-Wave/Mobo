// ======== BIBLIOTECAS ========
#include <SoftwareSerial.h>  // Para controle do Bluetooth
#include <Servo.h>            // Para controle dos servos motores

// ======== SERVOS ========
Servo mBase, mBaixo, mCotovelo, mPulso, mMao, mPinca;

// Posições iniciais dos servos
int mBasePos = 90;
int mBaixoPos = 75;
int mCotoveloPos = 170;
int mPulsoPos = 180;
int mMaoPos = 0;
int mPincaPos = 90;

// LEDs indicadores
int ledSquare = 7;
int ledCircle = 8;
int ledTriangule = 12;
int ledStar = 13;

// ======== BLUETOOTH ========
SoftwareSerial moduloBT(0, 1);  // RX, TX (usar desconectado durante upload)
char comando;

// Estados dos botões de modo
bool quadradoAtivo = false;
bool circuloAtivo = false;
bool trianguloAtivo = false;
bool estrelaAtiva = false;

// Flags para movimentos contínuos
bool frente = false;
bool tras = false;
bool esquerda = false;
bool direita = false;

// Definição de velocidade
int velocidadeMov = 15; // Delay entre passos (ms)
int incremento = 1;     // Passo de movimento por loop

// ======== FUNÇÃO DE SUAVIZAÇÃO ========
// Move o servo em pequenos passos para suavizar o movimento
void moverPasso(Servo &servo, int &posAtual, int direcao) {
	int novaPos = constrain(posAtual + direcao, 0, 180);
	if (novaPos != posAtual) {
		servo.write(novaPos);
		posAtual = novaPos;
	}
}

void setup() {
	Serial.begin(9600);
	Serial.println("Sistema Iniciado.");

	moduloBT.begin(9600); // Baud rate padrão do HM-10

	// Mapeamento dos pinos dos servos
	mBase.attach(3);
	mBaixo.attach(5);
	mCotovelo.attach(6);
	mPulso.attach(9);
	mMao.attach(10);
	mPinca.attach(11);

	delay(500); // Aguarda estabilização antes de iniciar

	// Define posições iniciais
	mBase.write(mBasePos);
	mBaixo.write(mBaixoPos);
	mCotovelo.write(mCotoveloPos);
	mPulso.write(mPulsoPos);
	mMao.write(mMaoPos);
	mPinca.write(mPincaPos);

	pinMode(ledSquare, OUTPUT);
	pinMode(ledCircle, OUTPUT);
	pinMode(ledTriangule, OUTPUT);
	pinMode(ledStar, OUTPUT);

	delay(1000);
	digitalWrite(ledSquare, HIGH);
	delay(1000);
	digitalWrite(ledCircle, HIGH);
	delay(1000);
	digitalWrite(ledTriangule, HIGH);
	delay(1000);
	digitalWrite(ledStar, HIGH);
	delay(1000);
	digitalWrite(ledSquare, LOW);
	delay(1000);
	digitalWrite(ledCircle, LOW);
	delay(1000);
	digitalWrite(ledTriangule, LOW);
	delay(1000);
	digitalWrite(ledStar, LOW);
}

void loop() {
	// Leitura dos comandos bluetooth
	if (moduloBT.available()) {
		comando = moduloBT.read();
		Serial.print("Recebido: ");
		Serial.println(comando);

		// QUADRADO
		if (comando == 'W') {
			quadradoAtivo = true;
			digitalWrite(ledSquare, HIGH);
			digitalWrite(ledCircle, LOW);
			digitalWrite(ledTriangule, LOW);
			digitalWrite(ledStar, LOW);
			Serial.println("QUADRADO ON - Pulso substitui Baixo");
		}

		if (comando == 'w') {
			quadradoAtivo = false;
			digitalWrite(ledSquare, LOW);
			Serial.println("QUADRADO OFF - Baixo substitui Pulso");
		}

		// CIRCULO
		if (comando == 'U') {
			circuloAtivo = true;
			digitalWrite(ledSquare, LOW);
			digitalWrite(ledCircle, HIGH);
			digitalWrite(ledTriangule, LOW);
			digitalWrite(ledStar, LOW);
			Serial.println("CIRCULO ON - Mão substitui Cotovelo");
		}

		if (comando == 'u') {
			circuloAtivo = false;
			digitalWrite(ledCircle, LOW);
			Serial.println("CIRCULO OFF - Cotovelo substitui Mão");
		}

		// TRIANGULO
		if (comando == 'V') {
			trianguloAtivo = true;
			digitalWrite(ledSquare, LOW);
			digitalWrite(ledCircle, LOW);
			digitalWrite(ledTriangule, HIGH);
			digitalWrite(ledStar, LOW);
			Serial.println("TRIANGULO ON - Base substitui Baixo");
		}

		if (comando == 'v') {
			trianguloAtivo = false;
			digitalWrite(ledTriangule, LOW);
			Serial.println("TRIANGULO OFF - Baixo substitui Base");
		}

		// ESTRELA
		if (comando == 'X') {
			estrelaAtiva = true;
			digitalWrite(ledSquare, LOW);
			digitalWrite(ledCircle, LOW);
			digitalWrite(ledTriangule, LOW);
			digitalWrite(ledStar, HIGH);
			Serial.println("ESTRELA ON - Fechando pinça");
		}

		if (comando == 'x') {
			estrelaAtiva = false;
			digitalWrite(ledStar, LOW);
			Serial.println("ESTRELA OFF - Abrindo pinça");
		}

		// DIREÇÕES
		if (comando == 'F' || comando == 'G' || comando == 'I') {
			frente = true;
			tras = false;
		}

		if (comando == 'B' || comando == 'H' || comando == 'J') {
			frente = false;
			tras = true;
		}

		if (comando == 'L' || comando == 'G' || comando == 'H') {
			esquerda = false;
			direita = true;
		}

		if (comando == 'R' || comando == 'I' || comando == 'J') {
			esquerda = true;
			direita = false;
		}

		// PARAR
		if (comando == 'S') {
			frente = tras = esquerda = direita = false;
			Serial.println("Parado.");
		}

		// VELOCIDADE (DELAY)
		if ((comando >= '0' && comando <= '9') || comando == 'q') {
			int pot = (comando == 'q') ? 10 : comando - '0';
			velocidadeMov = map(pot, 0, 10, 30, 5); // 0 = 30ms > Movimento mais lento, 10 = 5ms > Movimento mais rápido
			Serial.print("Potência ajustada: ");
			Serial.println(pot);
		}
	}

	// ======== DEFINIÇÃO DOS SERVOS ATIVOS ========
	Servo* servoFrenteTras;
	Servo* servoEsquerdaDireita;
	int* posFrenteTras;
	int* posEsquerdaDireita;

	// EIXO FRENTE/TRÁS
	if (trianguloAtivo && !quadradoAtivo) {
		// TRIÂNGULO ON e QUADRADO OFF → BASE substitui BAIXO
		servoFrenteTras = &mBase;
		posFrenteTras = &mBasePos;
	} 

	else if (quadradoAtivo) {
		// QUADRADO ON → PULSO substitui BAIXO
		servoFrenteTras = &mPulso;
		posFrenteTras = &mPulsoPos;
	} else {
		// Padrão → BAIXO
		servoFrenteTras = &mBaixo;
		posFrenteTras = &mBaixoPos;
	}

	// EIXO ESQUERDA/DIREITA
	if (circuloAtivo) {
		// CIRCULO ON → MÃO substitui COTOVELO
		servoEsquerdaDireita = &mMao;
		posEsquerdaDireita = &mMaoPos;
	} else {
		// Padrão → COTOVELO
		servoEsquerdaDireita = &mCotovelo;
		posEsquerdaDireita = &mCotoveloPos;
	}

	// MOVIMENTO CONTÍNUO
	if (frente) moverPasso(*servoFrenteTras, *posFrenteTras, +incremento);
	if (tras) moverPasso(*servoFrenteTras, *posFrenteTras, -incremento);
	if (esquerda) moverPasso(*servoEsquerdaDireita, *posEsquerdaDireita, +incremento);
	if (direita) moverPasso(*servoEsquerdaDireita, *posEsquerdaDireita, -incremento);

	// Controle contínuo da pinça
	if (estrelaAtiva)
		moverPasso(mPinca, mPincaPos, -incremento); // Fecha
	else
		moverPasso(mPinca, mPincaPos, +incremento); // Abre

	delay(velocidadeMov);

	// DEBUG CONTROLADO
	static unsigned long ultimoPrint = 0;
	if (millis() - ultimoPrint > 3000) { // Atualiza a cada 3 segundos
		ultimoPrint = millis();
		Serial.print("Base: "); Serial.print(mBasePos);
		Serial.print(" | Baixo: "); Serial.print(mBaixoPos);
		Serial.print(" | Cotovelo: "); Serial.print(mCotoveloPos);
		Serial.print(" | Pulso: "); Serial.print(mPulsoPos);
		Serial.print(" | Mão: "); Serial.print(mMaoPos);
		Serial.print(" | Pinça: "); Serial.println(mPincaPos);
	}
}