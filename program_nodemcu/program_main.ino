// buat variable millis waktu sebelum diproses program
unsigned long waktuSebelum = 0;

// buat fungsi program relay
void program_relay(int pin, String path_relay, bool boolean_relay, int jedaWaktu) {
  unsigned long waktuSekarang = millis();                                                                                               
  if ((unsigned long)(waktuSekarang - waktuSebelum) >= jedaWaktu)
  {
    waktuSebelum = waktuSekarang;
    
    // ambil data boolean di database
    Firebase.getBool(firebaseData, path_relay, &boolean_relay);

    if (boolean_relay == true) {
      digitalWrite(pin, HIGH);
      Serial.print(F("RELAY : "));
      Serial.print(pin);
      Serial.println(F(" - HIDUP"));
    } else {
      digitalWrite(pin, LOW);
      Serial.print(F("RELAY : "));
      Serial.print(pin);
      Serial.println(F(" - MATI"));
    }

  }
}

void setpin_output(int pin) {
  pinMode(pin, OUTPUT);
}

void setpin_input(int pin) {
  pinMode(pin, INPUT);
}