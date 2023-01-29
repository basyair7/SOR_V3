#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// Setting find WiFi Hotspot
#ifndef STASSID
#define STASSID "@Wifi.com"
#define STAPSK "Hostpot_ahul7"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;

// root json firebase data
const String path_relay_1 = "switcher/switch-1";
const String path_relay_2 = "switcher/switch-2";

FirebaseData firebaseData; // buat object firebaseData

// reconnect wifi if hotspot disconnect
WiFiEventHandler wifiConnectHandler;
WiFiEventHandler wifiDisconnectHandler;

// void ICACHE_RAM_ATTR loop(); // jika nodemcu intrrupt

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // untuk kecepatan kirim dan terima serial data dalam 9600 bit per detik
  // Register Event Handler
  wifiConnectHandler = WiFi.onStationModeGotIP(onWifiConnect);
  wifiDisconnectHandler = WiFi.onStationModeDisconnected(onWifiDisconnect);

  initWiFi();
  Serial.print(F("RSSI : "));
  Serial.println(WiFi.RSSI());

  // Setup firebase auth & host link
  firebase_connect();
  
  // set pinMode nodemcu
  setpin_output(D1);
  setpin_output(D2);

  while(!Serial) continue;

}

void loop() {
  // put your main code here, to run repeatedly:

  // buat variabel boolean untuk relay 1 dan relay 2
  bool boolean_relay_1, boolean_relay_2;

  // jalankan program relay (sesuaikan dengan pin relay)
  program_relay(D1, path_relay_1, boolean_relay_1, 1000);  
  delay(15); // jeda program 0.015 detik
  program_relay(D2, path_relay_2, boolean_relay_2, 1000);
  delay(15); // jeda program 0.015 detik

}
