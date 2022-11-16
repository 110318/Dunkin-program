#include <ArduinoJson.h>
 
StaticJsonDocument<48> doc;
int posX = 0;
int bt;
int joysBt = 2;
int Xpin = A1;

int switchPin = 8;
int switchVal = 0;
int bzVal = 5;

 
void setup() {
  pinMode(switchPin,INPUT);
  pinMode(Xpin,INPUT);
  pinMode(2,INPUT);
  pinMode(5,OUTPUT);
 // digitalWrite(joysBt,HIGH);


  Serial.begin(9600);
  //Serial.println(F("DHTxx test!"));
}
 
void loop() {
  // Wait a few seconds between measurements (slow sensor).
  delay(100);
  posX = analogRead(Xpin);
  bt = digitalRead(2);
  switchVal = digitalRead(switchPin);

  if (switchVal == 1) {
    digitalWrite(5,HIGH);
    delay(6000);
    digitalWrite(switchPin,LOW);
    digitalWrite(5,LOW);
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