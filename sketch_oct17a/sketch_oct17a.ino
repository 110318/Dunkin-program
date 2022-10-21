
#include <ArduinoJson.h>
 

 
StaticJsonDocument<48> doc;
int posX = 0;
int bt = ;  //BOTON ROJO PIN DIGITAL 4
int joysBt = 10;
int Xpin = A1;
int Bzpin = 9;

int switchPin = 2;
int switchVal = 0;
int bzVal = 0;



 
void setup() {
  pinMode(switchPin,INPUT);
  pinMode(Xpin,INPUT);
  pinMode(joysBt,INPUT);
  pinMode(Bzpin,OUTPUT);
  //digitalWrite(joysBt,HIGH);





  Serial.begin(9600);
  //Serial.println(F("DHTxx test!"));
}
 
void loop() {
  // Wait a few seconds between measurements (slow sensor).
  delay(100);
  posX = analogRead(Xpin);
  bt = digitalRead(joysBt);
  switchVal = digitalRead(switchPin);

  if(joysBt == HIGH){
    Serial.println("el boton esta siendo presionado");
    tone(Bzpin,1500);
    digitalWrite(Bzpin,HIGH);
  }else if(joysBt == LOW){
      digitalWrite(Bzpin,LOW);
    }
  

  float x = posX;
  float pulse = switchVal;
  float buzzer = bzVal;


  float btn = bt;
 
  doc["JoystickBtn"] = btn;
  doc["PosX"] = x;
  doc["Pulse"]= pulse;
  doc["Buzzer"]=buzzer;
 
  // Check if any reads failed and exit early (to try again).
  if (isnan(x) || isnan(btn)|| isnan(pulse)||isnan(buzzer)) {
    Serial.println(F("Failed"));
    return;
  }
 
  serializeJson(doc, Serial);
  Serial.println();
}