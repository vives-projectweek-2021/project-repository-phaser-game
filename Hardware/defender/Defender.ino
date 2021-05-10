#include "KeyboardAzertyFr.h"
int inputs[] = {2, 3, 4, 5, 6, 7, 8, 9, 10};
void setup() {
  KeyboardAzertyFr.begin();
  for(int i = 0; i<9; i++){
    pinMode(inputs[i], INPUT_PULLUP);
  }
}
bool previousState[9] = {false};
bool debugMode = false;
bool debugSequence = false;
void loop() {
  if(!(digitalRead(6)||digitalRead(8)||digitalRead(3)||debugMode)&&digitalRead(10))//semi debug without killswitch
  {
    debugSequence = true;
  }
  else if(debugSequence&&!digitalRead(10))//initialise debugmode
  {
    debugSequence = false;
    debugMode = true;
    KeyboardAzertyFr.releaseAll();        //enter tty1
    KeyboardAzertyFr.press(KEY_LEFT_CTRL);
    KeyboardAzertyFr.press(KEY_LEFT_ALT);
    KeyboardAzertyFr.press(KEY_F1);
    delay(50);
    KeyboardAzertyFr.releaseAll();
    delay(500);
    KeyboardAzertyFr.press(KEY_LEFT_CTRL);
    KeyboardAzertyFr.press('c');
    delay(50);
    KeyboardAzertyFr.releaseAll();
    KeyboardAzertyFr.println("\nclear\n/home/pi/Desktop/debugMenu.sh\n");
  }
  else if(debugMode && digitalRead(10))//debug mode not (or not annymore) active
  {
    debugSequence = false;
    KeyboardAzertyFr.releaseAll();        //Leave tty1
    KeyboardAzertyFr.press(KEY_LEFT_CTRL);
    KeyboardAzertyFr.press(KEY_LEFT_ALT);
    KeyboardAzertyFr.press(KEY_F7);
    delay(50);
    KeyboardAzertyFr.releaseAll();
    debugMode = false;
  }
  else if(!debugMode) 
  {
    debugSequence = false;
    for(int i = 0; i<9; i++){
      if(digitalRead(inputs[i]) == LOW){
        if(previousState[i] == false){
          launchButton(inputs[i], 1);
          previousState[i] = true;
        }
      } 
      else{
        if(previousState[i]){
          launchButton(inputs[i], 2);
          previousState[i] = false;
        }
      }
    }
  }
  else if(debugMode)
  {
    for(int i = 0; i<8; i++)
    {
      if(digitalRead(inputs[i]) == LOW)
      {
        launchButton(inputs[i], 3);
      }
    } 
  }
  
  delay(50);
  }
void launchButton(int button, int operation){
  if(operation == 1){//press
    switch (button) {
      case 2:    // left JOYSTICK
        KeyboardAzertyFr.press(KEY_LEFT_ARROW);
        break;
      case 3:    // down JOYSTICK
        //KeyboardAzertyFr.press('s');
        break;
      case 4:    // right JOYSTICK
        KeyboardAzertyFr.press(KEY_RIGHT_ARROW);
        break;
      case 5:    // up JOYSTICK
        KeyboardAzertyFr.press(KEY_UP_ARROW);
        break;
      case 6:    // left BUTTONS
        KeyboardAzertyFr.press('x');
        break;
      case 7:    // up BUTTONS
        KeyboardAzertyFr.press('v');
        break;
      case 8:    // right BUTTONS
        KeyboardAzertyFr.press('w');
        break;
       case 9:    // down BUTTONS
        KeyboardAzertyFr.press('s');
        break;
      case 10:    // kill switch
        KeyboardAzertyFr.press(KEY_F5);
        delay(50);
        KeyboardAzertyFr.release(KEY_F5);  
        break;
    }
  }
  else if (operation == 2){//release
    switch (button) {
      case 2:    // left JOYSTICK
        KeyboardAzertyFr.release(KEY_ARROW_LEFT);
        break;
      case 3:    // down JOYSTICK
        //KeyboardAzertyFr.release('s');
        break;
      case 4:    // right JOYSTICK
        KeyboardAzertyFr.release(KEY_RIGHT_ARROW);
        break;
      case 5:    // up JOYSTICK
        KeyboardAzertyFr.release(KEY_UP_ARROW);
        break;
      case 6:    // left BUTTONS
        KeyboardAzertyFr.release('x');
        break;
      case 7:    // up BUTTONS
        KeyboardAzertyFr.release('v');
        break;
      case 8:    // right BUTTONS
        KeyboardAzertyFr.release('w');
        break;
       case 9:    // down BUTTONS
        KeyboardAzertyFr.release('s');
        break;
    }
  }
  else if (operation == 3){//debug
    switch (button) {
      case 6:    // left BUTTONS
        KeyboardAzertyFr.print("3\n");
        break;
      case 7:    // up BUTTONS
        KeyboardAzertyFr.print("1\n");
        break;
      case 8:    // right BUTTONS
        KeyboardAzertyFr.print("4\n");
        break;
       case 9:    // down BUTTONS
        KeyboardAzertyFr.print("2\n");
        break;
    }
        delay(800);
  }
}
