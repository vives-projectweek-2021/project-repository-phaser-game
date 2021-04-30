#include "KeyboardAzertyFr.h"
int inputs[] = {2, 3, 4, 5, 6, 7, 8, 9};
void setup() {
  KeyboardAzertyFr.begin();
  Serial.begin(9600);
  for(int i = 0; i<9; i++){
    pinMode(inputs[i], INPUT_PULLUP);
  }
}
bool previousState[9] = {false};
void loop() {
  for(int i = 0; i<9; i++){
    if(digitalRead(inputs[i]) == LOW){
      if(previousState[i] == false){
        Serial.println(inputs[i]);
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
  
  delay(50);
  }
void launchButton(int button, bool pressRelease){
  if(pressRelease){
    switch (button) {
      case 5:    // left JOYSTICK
        KeyboardAzertyFr.press(KEY_LEFT_ARROW);
        break;
      case 2:    // down JOYSTICK
        KeyboardAzertyFr.press(KEY_DOWN_ARROW);
        break;
      case 4:    // right JOYSTICK
        KeyboardAzertyFr.press(KEY_RIGHT_ARROW);
        break;
      case 3:    // up JOYSTICK
        KeyboardAzertyFr.press(KEY_UP_ARROW);
        KeyboardAzertyFr.press(' ');
        delay(50);
        KeyboardAzertyFr.release(' ');
        break;
      case 9:    // left BUTTONS
        KeyboardAzertyFr.press(KEY_LEFT_ARROW);
        break;
      case 6:    // up BUTTONS
        KeyboardAzertyFr.press(KEY_UP_ARROW);
        KeyboardAzertyFr.press(' ');
        delay(50);
        KeyboardAzertyFr.release(' ');
        break;
      case 8:    // right BUTTONS
        KeyboardAzertyFr.press(KEY_RIGHT_ARROW);
        break;
      case 7:    // down BUTTONS
        KeyboardAzertyFr.press(KEY_DOWN_ARROW);
      break;
    }
  }
  else{
    switch (button) {
      case 5:    // left JOYSTICK
        KeyboardAzertyFr.release(KEY_LEFT_ARROW);
        break;
      case 2:    // down JOYSTICK
        KeyboardAzertyFr.release(KEY_DOWN_ARROW);
        break;
      case 4:    // right JOYSTICK
        KeyboardAzertyFr.release(KEY_RIGHT_ARROW);
        break;
      case 3:    // up JOYSTICK
        KeyboardAzertyFr.release(KEY_UP_ARROW);
        break;
      case 9:    // left BUTTONS
        KeyboardAzertyFr.release(KEY_LEFT_ARROW);
        break;
      case 6:    // up BUTTONS
        KeyboardAzertyFr.release(KEY_UP_ARROW);
        break;
      case 8:    // right BUTTONS
        KeyboardAzertyFr.release(KEY_RIGHT_ARROW);
        break;
       case 7:    // down BUTTONS
        KeyboardAzertyFr.release(KEY_DOWN_ARROW);
        break;
    }
  }
}
    
