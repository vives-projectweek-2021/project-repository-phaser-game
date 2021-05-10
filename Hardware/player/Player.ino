#include "KeyboardAzertyFr.h"
int inputs[] = {2, 3, 4, 5, 6, 7, 8, 9};
void setup() {
  KeyboardAzertyFr.begin();
  for(int i = 0; i<9; i++){
    pinMode(inputs[i], INPUT_PULLUP);
  }
}
bool previousState[9] = {false};
void loop() {
  int val = analogRead(A0);  // read the input pin
  Serial.println(val);          // debug value
  if(val < 50){
    KeyboardAzertyFr.press(KEY_LEFT_SHIFT);
      delay(150);
    KeyboardAzertyFr.releaseAll();
  }
  for(int i = 0; i<9; i++){
    if(digitalRead(inputs[i]) == LOW){
      if(previousState[i] == false){
        launchButton(inputs[i], true);
        previousState[i] = true;
      }
    } 
    else{
      if(previousState[i]){
        launchButton(inputs[i], false);
        previousState[i] = false;
      }
    }
  }
  
  }
void launchButton(int button, bool pressRelease){
  if(pressRelease){
    switch (button) {
      case 5:    // left JOYSTICK
        KeyboardAzertyFr.press('q');
        break;
      case 2:    // down JOYSTICK
        KeyboardAzertyFr.press('s');
        break;
      case 4:    // right JOYSTICK
        KeyboardAzertyFr.press('d');
        break;
      case 3:    // up JOYSTICK
        KeyboardAzertyFr.press('z');
        break;
      case 9:    // left BUTTONS
        KeyboardAzertyFr.press(KEY_F5);
        break;
      case 6:    // up BUTTONS
        KeyboardAzertyFr.press('z');
        break;
      case 8:    // right BUTTONS
        KeyboardAzertyFr.press(KEY_LEFT_SHIFT);
        break;
      case 7:    // down BUTTONS
        KeyboardAzertyFr.press('s');
      break;
    }
  }
  else{
    switch (button) {
      case 5:    // left JOYSTICK
        KeyboardAzertyFr.release('q');
        break;
      case 2:    // down JOYSTICK
        KeyboardAzertyFr.release('s');
        break;
      case 4:    // right JOYSTICK
        KeyboardAzertyFr.release('d');
        break;
      case 3:    // up JOYSTICK
        KeyboardAzertyFr.release('z');
        break;
      case 9:    // left BUTTONS
        KeyboardAzertyFr.release(KEY_F5);
        break;
      case 6:    // up BUTTONS
        KeyboardAzertyFr.release('z');
        break;
      case 8:    // right BUTTONS
        KeyboardAzertyFr.release(KEY_LEFT_SHIFT);
        break;
       case 7:    // down BUTTONS
        KeyboardAzertyFr.release('s');
        break;
    }
  }
}
    
